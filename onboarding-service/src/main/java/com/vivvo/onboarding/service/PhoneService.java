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

    /**public List<PhoneDto> findByLastName(String lastName) {
        return phoneRepository.findByLastName(lastName)
                .stream()
                .map(phoneAssembler::assemble)  // User is not convertible to Phone
                .collect(Collectors.toList());
    }**/

    public PhoneDto get(UUID phoneId) {
        return phoneRepository.findById(phoneId)
                .map(phoneAssembler::assemble)
                .orElseThrow(() -> new PhoneNotFoundException(phoneId));
    }

    public PhoneDto create(PhoneDto dto) {
        phoneValidator.validateForCreateAndThrow(dto);
        Phone entity = phoneAssembler.disassemble(dto);
        Phone savedEntity = phoneRepository.save(entity);
        return phoneAssembler.assemble(savedEntity);
    }

    public PhoneDto update(PhoneDto dto) {
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
