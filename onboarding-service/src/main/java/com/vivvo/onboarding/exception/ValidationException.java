package com.vivvo.onboarding.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.UUID;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ValidationException extends RuntimeException {

	public ValidationException(UUID userId) {
		super("User not found by id " + userId);
	}
}
