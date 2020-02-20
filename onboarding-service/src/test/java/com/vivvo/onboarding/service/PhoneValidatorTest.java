package com.vivvo.onboarding.service;

import com.vivvo.onboarding.dto.PhoneDto;
import com.vivvo.onboarding.repository.PhoneRepository;
import org.junit.Before;
import org.junit.Test;

import java.util.Map;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.*;

public class PhoneValidatorTest {

    private PhoneValidator phoneValidator;

    @Before
    public void init() {
        PhoneRepository mockPhoneRepository = mock(PhoneRepository.class);
        when(mockPhoneRepository.existsByPhoneNumber(anyString())).thenReturn(false);
        phoneValidator = new PhoneValidator(mockPhoneRepository);
    }

    @Test
    public void testValidate_whenPhoneNumberGT15_shouldProduceError() {
        Map<String, String> errors = phoneValidator.validate(newValidPhoneDto()
                .setPhoneNumber("1234567890123456"), true);

        assertEquals(1, errors.size());
        assertTrue(errors.containsValue(PhoneValidator.PHONE_NUMBER_GT_15));
    }

    @Test
    public void testValidate_whenPhoneNumberIsTaken_shouldProduceError() {
        Map<String, String> errors = phoneValidator.validate(newValidPhoneDto()
                .setPhoneNumber("3065022827"), true);

        assertEquals(1, errors.size());
        assertTrue(errors.containsValue(PhoneValidator.PHONE_NUMBER_TAKEN));
    }

    @Test
    public void testValidate_whenValid_shouldNotProduceErrors() {
        Map<String, String> errors = phoneValidator.validate(newValidPhoneDto(), false);

        assertEquals(0, errors.size());
    }

    private PhoneDto newValidPhoneDto() {
        return new PhoneDto()
                .setPhoneNumber("3065022827");
    }
}
