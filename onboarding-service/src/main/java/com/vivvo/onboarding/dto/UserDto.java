package com.vivvo.onboarding.dto;

import lombok.Data;
import lombok.experimental.Accessors;

import java.util.UUID;

@Data
@Accessors(chain = true)
public class UserDto {

	private UUID userId;
	private String username;
	private String firstName;
	private String lastName;
}
