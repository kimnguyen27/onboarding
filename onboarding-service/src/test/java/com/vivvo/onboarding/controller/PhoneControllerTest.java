package com.vivvo.onboarding.controller;

import com.vivvo.onboarding.client.PhoneClient;
import com.vivvo.onboarding.dto.PhoneDto;
import com.vivvo.onboarding.entity.Phone;
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

    private PhoneClient phoneClient;

    @LocalServerPort
    private int port;

    @Before
    public void init() {
        phoneClient = new PhoneClient();
        phoneClient.setBaseUri("http://localhost:" + port);
    }

    @Test
    public void testCreate_whenValid_shouldCreatePhone() {
        PhoneDto createdDto = phoneClient.create(newValidPhoneDto());
        assertNotNull(createdDto.getPhoneId());
    }

    @Test
    public void testCreateAndUpdate_whenValid_shouldUpdateSuccessfully() {
        PhoneDto createdDto = phoneClient.create(newValidPhoneDto());
        PhoneDto updatedDto = phoneClient.update(createdDto.setPhoneNumber("3060000000"));

        assertEquals("Updated Phone Number", updatedDto.getPhoneNumber());
    }

    @Test
    public void testCreateAndDelete_whenValid_shouldDeleteSuccessfully() {
        PhoneDto createdDto = phoneClient.create(newValidPhoneDto());
        PhoneDto getDto = phoneClient.get(createdDto.getPhoneId());

        assertNotNull(getDto);

        phoneClient.delete(getDto.getPhoneId());

        try {
            phoneClient.get(getDto.getPhoneId());
            fail("Phone number was not deleted successfully with id" + getDto.getPhoneId());
        } catch (NotFoundException e) {
            // success
        }
    }

    @Test
    public void testCreateAndDeleteTwice_secondDeleteShouldReturnNotFound() {
        PhoneDto createdDto = phoneClient.create(newValidPhoneDto());
        PhoneDto getDto = phoneClient.get(createdDto.getPhoneId());

        assertNotNull(getDto);

        phoneClient.delete(getDto.getPhoneId());

        try {
            phoneClient.delete(getDto.getPhoneId());
            fail("Second delete should have thrown NotFoundException");
        } catch (NotFoundException e) {
            // success
        }
    }

    private PhoneDto newValidPhoneDto() {
        return new PhoneDto()
                .setPhoneNumber("3065022827");
    }
}
