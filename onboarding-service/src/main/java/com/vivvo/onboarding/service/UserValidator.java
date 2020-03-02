package com.vivvo.onboarding.service;

import com.vivvo.onboarding.dto.UserDto;
import com.vivvo.onboarding.exception.ValidationException;
import com.vivvo.onboarding.repository.UserRepository;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.LinkedHashMap;
import java.util.Map;

@Component
public class UserValidator {

	private static final String FIRST_NAME = "firstName";
	private static final String LAST_NAME = "lastName";
	private static final String USERNAME = "username";

	static final String FIRST_NAME_REQUIRED = "FIRST_NAME_REQUIRED";
	static final String LAST_NAME_REQUIRED = "LAST_NAME_REQUIRED";
	static final String USERNAME_REQUIRED = "USERNAME_REQUIRED";
	static final String FIRST_NAME_GT_50 = "FIRST_NAME_GT_50";
	static final String LAST_NAME_GT_50 = "LAST_NAME_GT_50";
	static final String USERNAME_TAKEN = "USERNAME_TAKEN";

	private final UserRepository userRepository;
	private final PhoneValidator phoneValidator;


	@Autowired
	public UserValidator(UserRepository userRepository,
						 PhoneValidator phoneValidator) {
		this.userRepository = userRepository;
		this.phoneValidator = phoneValidator;
	}

	public void validateForCreateAndThrow(UserDto dto) {
		validateAndThrow(dto, true);
	}

	public void validateForUpdateAndThrow(UserDto dto) {
		validateAndThrow(dto, false);
	}

	private void validateAndThrow(UserDto dto, boolean isCreate) {
		Map<String, String> errors = validate(dto, isCreate);
		errors.putAll(phoneValidator.validateAll(dto.getPhones(), isCreate));

		if (!errors.isEmpty()) {
			throw new ValidationException(errors);
		}
	}

	public Map<String, String> validate(UserDto dto, boolean isCreate) {
		Map<String, String> validatorErrors = new LinkedHashMap<>();
		validateFirstName(dto, validatorErrors);
		validateLastName(dto, validatorErrors);
		validateUsername(dto, validatorErrors, isCreate);
		return validatorErrors;
	}

	private void validateFirstName(UserDto dto, Map<String, String> validatorErrors) {
		if (StringUtils.isBlank(dto.getFirstName())) {
			validatorErrors.put(FIRST_NAME, FIRST_NAME_REQUIRED);
		} else if (dto.getFirstName().length() > 50) {
			validatorErrors.put(FIRST_NAME, FIRST_NAME_GT_50);
		}
	}

	private void validateLastName(UserDto dto, Map<String, String> validatorErrors) {
		if (StringUtils.isBlank(dto.getLastName())) {
			validatorErrors.put(LAST_NAME, LAST_NAME_REQUIRED);
		} else if (dto.getLastName().length() > 50) {
			validatorErrors.put(LAST_NAME, LAST_NAME_GT_50);
		}
	}

	private void validateUsername(UserDto dto, Map<String, String> validatorErrors, boolean isCreate) {
		if (StringUtils.isBlank(dto.getUsername())) {
			validatorErrors.put(USERNAME, USERNAME_REQUIRED);
		} else if(isCreate && userRepository.existsByUsernameIgnoreCase(dto.getUsername())) {
			validatorErrors.put(USERNAME, USERNAME_TAKEN);
		}
	}
}
