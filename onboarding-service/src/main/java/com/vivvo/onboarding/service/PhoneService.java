package com.vivvo.onboarding.service;

import com.vivvo.onboarding.assembler.PhoneAssembler;
import com.vivvo.onboarding.dto.PhoneDto;
import com.vivvo.onboarding.entity.Phone;
import com.vivvo.onboarding.exception.PhoneNotFoundException;
import com.vivvo.onboarding.repository.PhoneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
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
}
