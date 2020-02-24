package com.vivvo.onboarding.controller;

import com.vivvo.onboarding.client.PhoneClient;
import com.vivvo.onboarding.client.UserClient;
import com.vivvo.onboarding.dto.PhoneDto;
import com.vivvo.onboarding.dto.UserDto;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit4.SpringRunner;

import javax.ws.rs.NotFoundException;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Sql(scripts = "classpath:teardown.sql", executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
public class PhoneControllerTest {

    private UserClient userClient;
    private PhoneClient phoneClient;

    @LocalServerPort
    private int port;

    @Before
    public void init() {
        userClient = new UserClient();
        userClient.setBaseUri("http://localhost:" + port);

        phoneClient = new PhoneClient();
        phoneClient.setBaseUri("http://localhost:" + port);
    }

    @Test
    public void testCreate_whenValid_shouldCreatePhone() {
        UserDto createdUserDto = userClient.create(newValidUserDto());
        PhoneDto createdPhoneDto = phoneClient.create(newValidPhoneDto(createdUserDto));
        assertNotNull(createdPhoneDto.getPhoneId());
    }

    @Test
    public void testCreateAndUpdate_whenValid_shouldUpdateSuccessfully() {
        UserDto createdUserDto = userClient.create(newValidUserDto());
        PhoneDto createdPhoneDto = phoneClient.create(newValidPhoneDto(createdUserDto));
        String phoneNumber = "3060000000";
        PhoneDto updatedPhoneDto = phoneClient.update(createdPhoneDto.setPhoneNumber(phoneNumber));

        assertEquals(phoneNumber, updatedPhoneDto.getPhoneNumber());
    }

    @Test
    public void testCreateAndDelete_whenValid_shouldDeleteSuccessfully() {
        UserDto createdUserDto = userClient.create(newValidUserDto());
        PhoneDto createdPhoneDto = phoneClient.create(newValidPhoneDto(createdUserDto));
        PhoneDto getDto = phoneClient.get(createdPhoneDto.getUserId(), createdPhoneDto.getPhoneId());

        assertNotNull(getDto);
        assertEquals(createdUserDto.getUserId(), createdPhoneDto.getUserId());

        phoneClient.delete(getDto.getUserId(), getDto.getPhoneId());

        try {
            phoneClient.get(getDto.getUserId(), getDto.getPhoneId());
            fail("Phone number was not deleted successfully with id" + getDto.getPhoneId());
        } catch (NotFoundException e) {
            // success
        }
    }

    @Test
    public void testCreateAndDeleteTwice_secondDeleteShouldReturnNotFound() {
        UserDto createdUserDto = userClient.create(newValidUserDto());
        PhoneDto createdPhoneDto = phoneClient.create(newValidPhoneDto(createdUserDto));
        PhoneDto getDto = phoneClient.get(createdPhoneDto.getUserId(), createdPhoneDto.getPhoneId());

        assertNotNull(getDto);

        phoneClient.delete(getDto.getUserId(), getDto.getPhoneId());

        try {
            phoneClient.delete(getDto.getUserId(), getDto.getPhoneId());
            fail("Second delete should have thrown NotFoundException");
        } catch (NotFoundException e) {
            // success
        }
    }

    private UserDto newValidUserDto() {
        return new UserDto()
                .setFirstName("Kim")
                .setLastName("Nguyen")
                .setUsername("nguyenk");
    }

    private PhoneDto newValidPhoneDto(UserDto createdUserDto) {
        return new PhoneDto()
                .setUserId(createdUserDto.getUserId())
                .setPhoneNumber("3065022827");
    }
}
