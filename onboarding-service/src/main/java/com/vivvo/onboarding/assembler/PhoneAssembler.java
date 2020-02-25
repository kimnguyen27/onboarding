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
                .setUserId(entity.getUserId())
                .setPhoneNumber(entity.getPhoneNumber())
                .setVerified(entity.getVerified())
                .setVerificationSid(entity.getVerificationSid());
    }

    public Phone disassemble(PhoneDto dto) {
        return new Phone()
                .setPhoneId(UUID.randomUUID())
                .setUserId(dto.getUserId())
                .setPhoneNumber(dto.getPhoneNumber())
                .setVerified(dto.getVerified()) // Default Boolean value is null until changed
                .setVerificationSid(dto.getVerificationSid());
    }

    public Phone disassembleInto(PhoneDto dto, Phone entity) {
        return entity
                .setPhoneNumber(dto.getPhoneNumber());
    }
}
