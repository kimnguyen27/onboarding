package com.vivvo.onboarding.assembler;

import com.vivvo.onboarding.dto.PhoneDto;
import com.vivvo.onboarding.dto.UserDto;
import com.vivvo.onboarding.entity.Phone;
import com.vivvo.onboarding.entity.User;
import com.vivvo.onboarding.util.CollectionComparator;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class UserAssembler {

	@Autowired
	private PhoneAssembler phoneAssembler;

	public UserDto assemble(User entity) {
		return new UserDto()
				.setUserId(entity.getUserId())
				.setFirstName(entity.getFirstName())
				.setLastName(entity.getLastName())
				.setUsername(entity.getUsername())
				.setPhones(entity.getPhones()
						.stream()
						.map(phoneAssembler::assemble)
						.collect(Collectors.toList()));
	}

	public User disassemble(UserDto dto) {
		UUID userId = UUID.randomUUID();
		return new User()
				.setUserId(userId)
				.setFirstName(dto.getFirstName())
				.setLastName(dto.getLastName())
				.setUsername(StringUtils.lowerCase(dto.getUsername()))
				.setPhones(dto.getPhones() == null ? Collections.emptyList() : dto.getPhones()
						.stream()
						.peek(p -> p.setUserId(userId))
						.map(phoneAssembler::disassemble)
						.collect(Collectors.toList()));
	}

	public User disassembleInto(UserDto dto, User entity) {
		entity
				.setFirstName(dto.getFirstName())
				.setLastName(dto.getLastName());

		CollectionComparator.<Phone, PhoneDto, UUID>builder()
				.left(entity.getPhones())
				.right(dto.getPhones())
				.leftKeySelector(Phone::getPhoneId)
				.rightKeySelector(PhoneDto::getPhoneId)
				.whenRemoved(phoneEntity -> entity.getPhones().remove(phoneEntity))
				.whenAdded(phoneDto -> entity
						.getPhones()
						.add(phoneAssembler.disassemble(phoneDto)))
				.whenUpdated((phone, phoneDto) -> phoneAssembler.disassembleInto(phoneDto, phone))
				.build()
				.compare();

		return entity;
	}
}
