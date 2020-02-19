package com.vivvo.onboarding.assembler;

import com.vivvo.onboarding.dto.UserDto;
import com.vivvo.onboarding.entity.User;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class UserAssembler {

	public UserDto assemble(User entity) {
		return new UserDto()
				.setUserId(entity.getUserId())
				.setFirstName(entity.getFirstName())
				.setLastName(entity.getLastName())
				.setUsername(entity.getUsername());
	}

	public User disassemble(UserDto dto) {
		return new User()
				.setUserId(UUID.randomUUID())
				.setFirstName(dto.getFirstName())
				.setLastName(dto.getLastName())
				.setUsername(StringUtils.lowerCase(dto.getUsername()));
	}

	public User disassembleInto(UserDto dto, User entity) {
		return entity
				.setFirstName(dto.getFirstName())
				.setLastName(dto.getLastName());
	}
}
