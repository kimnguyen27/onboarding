package com.vivvo.onboarding.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.UUID;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class PhoneNotFoundException extends RuntimeException {

    public PhoneNotFoundException(UUID phoneId) { super("Phone not found by id " + phoneId); }
}
