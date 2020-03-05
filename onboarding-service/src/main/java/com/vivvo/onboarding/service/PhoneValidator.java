package com.vivvo.onboarding.service;

import com.vivvo.onboarding.dto.PhoneDto;
import com.vivvo.onboarding.exception.ValidationException;
import com.vivvo.onboarding.repository.PhoneRepository;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class PhoneValidator {

    private static final String PHONE_NUMBER = "phoneNumber";

    static final String PHONE_NUMBER_REQUIRED = "PHONE_NUMBER_REQUIRED";
    static final String PHONE_NUMBER_GT_15 = "PHONE_NUMBER_GT_15";

    private final PhoneRepository phoneRepository;

    @Autowired
    public PhoneValidator(PhoneRepository phoneRepository) { this.phoneRepository = phoneRepository; }

    public void validateForCreateAndThrow(PhoneDto dto) { validateAndThrow(dto, true); }

    public void validateForUpdateAndThrow(PhoneDto dto) { validateAndThrow(dto, false); }

    private void validateAndThrow(PhoneDto dto, boolean isCreate) {
        Map<String, String> errors = validate(dto, isCreate);
        if (!errors.isEmpty()) {
            throw new ValidationException(errors);
        }
    }

    public Map<String, String> validateAll(List<PhoneDto> phones, boolean isCreate) {
        if (phones == null) {
            return Collections.emptyMap();
        }
        for (PhoneDto phone : phones) {
            return validate(phone, isCreate)
                    .entrySet()
                    .stream()
                    .collect(Collectors.toMap(entry -> "phones[{}]." + entry.getKey(),
                            Map.Entry::getValue));
        }
        return Collections.emptyMap();
    }


    public Map<String, String> validate(PhoneDto dto, boolean isCreate) {
        Map<String, String> validatorErrors = new LinkedHashMap<>();
        validatePhoneNumber(dto, validatorErrors, isCreate);
        return validatorErrors;
    }

    private void validatePhoneNumber(PhoneDto dto, Map<String, String> validatorErrors, boolean isCreate) {
        if (StringUtils.isBlank(dto.getPhoneNumber())) {
            validatorErrors.put(PHONE_NUMBER, PHONE_NUMBER_REQUIRED);
        } else if (isCreate && dto.getPhoneNumber().length() > 15) {
            validatorErrors.put(PHONE_NUMBER, PHONE_NUMBER_GT_15);
        }
    }
}
