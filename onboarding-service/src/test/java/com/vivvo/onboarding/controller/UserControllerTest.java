package com.vivvo.onboarding.controller;

import com.vivvo.onboarding.client.UserClient;
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
public class UserControllerTest {


	private UserClient userClient;

	@LocalServerPort
	private int port;

	@Before
	public void init() {
		userClient = new UserClient();
		userClient.setBaseUri("http://localhost:" + port);
	}

	@Test
	public void testCreate_whenValid_shouldCreateUser() {
		UserDto createdDto = userClient.create(newValidUserDto());
		assertNotNull(createdDto.getUserId());
	}

	@Test
	public void testCreateAndUpdate_whenValid_shouldUpdateSuccessfully() {
		UserDto createdDto = userClient.create(newValidUserDto());
		UserDto updatedDto = userClient.update(createdDto.setFirstName("Updated First Name"));

		assertEquals("Updated First Name", updatedDto.getFirstName());
	}

	@Test
	public void testCreateAndDelete_whenValid_shouldDeleteSuccessfully() {
		UserDto createdDto = userClient.create(newValidUserDto());
		UserDto getDto = userClient.get(createdDto.getUserId());
		assertNotNull(getDto);

		userClient.delete(getDto.getUserId());

		try {
			userClient.get(getDto.getUserId());
			fail("User was not deleted successfully with id " + getDto.getUserId());
		} catch (NotFoundException e) {
			//success
		}
	}

	@Test
	public void testCreateAndDeleteTwice_secondDeleteShouldReturnNotFound() {
		UserDto createdDto = userClient.create(newValidUserDto());
		UserDto getDto = userClient.get(createdDto.getUserId());
		assertNotNull(getDto);

		userClient.delete(getDto.getUserId());

		try {
			userClient.delete(getDto.getUserId());
			fail("Second delete should have thrown NotFoundException");
		} catch (NotFoundException e) {
			//success
		}
	}

	private UserDto newValidUserDto() {
		return new UserDto()
				.setFirstName("Tim")
				.setLastName("Dodd")
				.setUsername("doddt2");
	}

}
