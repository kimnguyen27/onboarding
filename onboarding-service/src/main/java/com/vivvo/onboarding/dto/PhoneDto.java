package com.vivvo.onboarding.dto;

import com.vivvo.onboarding.entity.User;
import lombok.Data;
import lombok.experimental.Accessors;

import java.util.UUID;

@Data
@Accessors(chain = true)
public class PhoneDto {

    private UUID phoneId;
    private String phoneNumber;
    private User user;
}
