package com.vivvo.onboarding.assembler;

import com.vivvo.onboarding.dto.PhoneDto;
import com.vivvo.onboarding.entity.Phone;
import com.vivvo.onboarding.entity.User;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class PhoneAssembler {

    public PhoneDto assemble(Phone entity) {
        return new PhoneDto()
                .setPhoneId(entity.getPhoneId())
                .setPhoneNumber(entity.getPhoneNumber())
                .setUserId(entity.getUserId());
    }

    public Phone disassemble(PhoneDto dto) {
        return new Phone()
                .setPhoneId(UUID.randomUUID())
                .setPhoneNumber(dto.getPhoneNumber())
                .setUserId(dto.getUserId());
    }

    public Phone disassembleInto(PhoneDto dto, Phone entity) {
        return entity
                .setPhoneNumber(dto.getPhoneNumber());
                // Assuming we can not change owner of a phone number without deleting first
    }
}
