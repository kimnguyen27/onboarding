package com.vivvo.onboarding.dto;

import com.vivvo.onboarding.entity.User;
import lombok.Data;
import lombok.experimental.Accessors;

import java.util.UUID;

@Data
@Accessors(chain = true)
public class PhoneDto {

    private UUID phoneId;
    private UUID userId;
    private String phoneNumber;
    //FIXME, the User object is an entity. public API needs to be data transfer objects only.
    private User user;
}
