package com.vivvo.onboarding.service;

import com.vivvo.onboarding.assembler.PhoneAssembler;
import com.vivvo.onboarding.dto.PhoneDto;
import com.vivvo.onboarding.entity.Phone;
import com.vivvo.onboarding.exception.PhoneNotFoundException;
import com.vivvo.onboarding.exception.PhoneVerificationException;
import com.vivvo.onboarding.exception.ValidationException;
import com.vivvo.onboarding.repository.PhoneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.twilio.Twilio;
import com.twilio.exception.AuthenticationException;
import com.twilio.exception.TwilioException;
import com.twilio.rest.api.v2010.account.Message;

import javax.transaction.Transactional;
import java.security.SecureRandom;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
public class PhoneService {

    @Autowired
    private PhoneRepository phoneRepository;
    @Autowired
    private PhoneAssembler phoneAssembler;
    @Autowired
    private PhoneValidator phoneValidator;

    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    static final String WRONG_VERIFICATION_CODE = "WRONG_VERIFICATION_CODE";

    public List<PhoneDto> getPhoneList(UUID userId) {
        return phoneRepository.findByUserId(userId)
                .stream()
                .map(phoneAssembler::assemble)
                .collect(Collectors.toList());
    }

    public PhoneDto get(UUID userId, UUID phoneId) {
        PhoneDto tempDto = phoneRepository.findById(phoneId)
                .map(phoneAssembler::assemble)
                .orElseThrow(() -> new PhoneNotFoundException(phoneId));

        if (!tempDto.getUserId().equals(userId)) {
            throw(new PhoneNotFoundException(phoneId));
        }

        return tempDto;
    }

    public PhoneDto create(UUID userId, PhoneDto dto) {
        dto.setUserId(userId);
        dto.setVerified(false);
        phoneValidator.validateForCreateAndThrow(dto);
        Phone entity = phoneAssembler.disassemble(dto);
        Phone savedEntity = phoneRepository.save(entity);
        return phoneAssembler.assemble(savedEntity);
    }

    public PhoneDto update(UUID userId, PhoneDto dto) {
        dto.setUserId(userId);
        phoneValidator.validateForUpdateAndThrow(dto);
        return phoneRepository.findById(dto.getPhoneId())
                .map(entity -> phoneAssembler.disassembleInto(dto, entity))
                .map(phoneRepository::save)
                .map(phoneAssembler::assemble)
                .orElseThrow(() -> new PhoneNotFoundException(dto.getPhoneId()));
    }

    public void delete(UUID phoneId) {
        Phone entity = phoneRepository.findById(phoneId)
                .orElseThrow(() -> new PhoneNotFoundException(phoneId));

        phoneRepository.delete(entity);
    }

    public void verifyInit(UUID userId, UUID phoneId) throws AuthenticationException {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        PhoneDto phoneDto = get(userId, phoneId);

        SecureRandom secureRandom = new SecureRandom();
        int randomNumber = secureRandom.nextInt(899999) + 100000;
        String verificationCode = String.valueOf(randomNumber);

        try
        {
            /* Using custom codes with Twilio's Verify API must be enabled by contacting
             *  their sales dept. Boo.
             *
             * Verification verification = Verification.creator(
                    "VA7d8bb863fb7ba37e0f9ed3fc67fd2643",
                    phoneDto.getPhoneNumber(),
                    "sms")
                    .setCustomCode(verificationCode).create();*/

            Message.creator(new com.twilio.type.PhoneNumber(phoneDto.getPhoneNumber()), // to
                    new com.twilio.type.PhoneNumber("+13069880988"), // from
                    "Your verification code: " + verificationCode).create();

            phoneDto.setVerificationCode(verificationCode);
            update(userId, phoneDto);
        }
        catch (TwilioException e)
        {
            throw new PhoneVerificationException(e.getMessage(), e.getCause());
        }
    }

    public PhoneDto verifyAttempt(UUID userId, UUID phoneId, String attemptCode) throws AuthenticationException {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        PhoneDto phoneDto = get(userId, phoneId);

        if (phoneDto.getVerified()) {
            return phoneDto;
        }

        /* Using custom codes with Twilio's Verify API must be enabled by contacting
         *  their sales dept. Boo.
         *
         * VerificationCheck verificationCheck = VerificationCheck.creator(
                "VA7d8bb863fb7ba37e0f9ed3fc67fd2643", verificationCode)
                .setVerificationSid(phoneDto.getVerificationSid()).create();

        if(verificationCheck.getStatus().equals("approved")) {
            return update(userId, phoneDto
                    .setVerified(true)
                    .setVerificationSid(null));
        }
        else {
            Map<String, String> verificationErrors = new LinkedHashMap<>();
            verificationErrors.put(phoneDto.getVerificationSid(), WRONG_VERIFICATION_CODE);
            throw new ValidationException(verificationErrors);
        }*/

        if (phoneDto.getVerificationCode() != null && phoneDto.getVerificationCode().equals(attemptCode)) {
            return update(userId, phoneDto
                    .setVerified(true)
                    .setVerificationCode(null));
        }
        else {
            Map<String, String> verificationErrors = new LinkedHashMap<>();
            verificationErrors.put(phoneDto.getPhoneNumber(), WRONG_VERIFICATION_CODE);
            throw new ValidationException(verificationErrors);
        }
    }
}
