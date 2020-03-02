package com.vivvo.onboarding.service;

import com.vivvo.onboarding.dto.UserDto;
import com.vivvo.onboarding.repository.UserRepository;
import org.junit.Before;
import org.junit.Test;

import java.util.Collections;
import java.util.Map;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.*;

public class UserValidatorTest {

	private UserValidator userValidator;

	@Before
	public void init() {
		UserRepository mockUserRepository = mock(UserRepository.class);
		PhoneValidator mockPhoneValidator = mock(PhoneValidator.class);

		when(mockUserRepository.existsByUsernameIgnoreCase(anyString())).thenReturn(false);
		when(mockPhoneValidator.validateAll(anyList(), anyBoolean())).thenReturn(Collections.emptyMap());

		userValidator = new UserValidator(mockUserRepository, mockPhoneValidator);
	}

	@Test
	public void testValidate_whenFirstNameNull_shouldProduceError() {
		Map<String, String> errors = userValidator.validate(newValidUserDto().setFirstName(null), false);

		assertEquals(1, errors.size());
		assertTrue(errors.containsValue(UserValidator.FIRST_NAME_REQUIRED));
	}

	@Test
	public void testValidate_whenFirstNameBlank_shouldProduceError() {
		Map<String, String> errors = userValidator.validate(newValidUserDto().setFirstName("    "), false);

		assertEquals(1, errors.size());
		assertTrue(errors.containsValue(UserValidator.FIRST_NAME_REQUIRED));
	}

	@Test
	public void testValidate_whenValid_shouldNotProduceErrors() {
		Map<String, String> errors = userValidator.validate(newValidUserDto(), false);

		assertEquals(0, errors.size());
	}

	private UserDto newValidUserDto() {
		return new UserDto()
				.setFirstName("Kim")
				.setLastName("Nguyen")
				.setUsername("nguyenk");
	}
}
