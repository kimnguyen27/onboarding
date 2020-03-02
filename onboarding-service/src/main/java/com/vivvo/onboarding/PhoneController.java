package com.vivvo.onboarding;

import com.vivvo.onboarding.dto.PhoneDto;
import com.vivvo.onboarding.service.PhoneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.ws.rs.Path;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/users/{userId}/phones")
public class PhoneController {

    @Autowired
    private PhoneService phoneService;

    @GetMapping
    public List<PhoneDto> getPhoneList(@PathVariable("userId") UUID userId) {
        return phoneService.findPhonesByUserId(userId); }

    @GetMapping("/{phoneId}")
    public PhoneDto get(@PathVariable("userId") UUID userId, @PathVariable("phoneId") UUID phoneId) {
        return phoneService.get(userId, phoneId); }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PhoneDto create(@PathVariable("userId") UUID userId, @RequestBody PhoneDto dto) {
        return phoneService.create(userId, dto); }

    @PutMapping("/{phoneId}")
    public PhoneDto update(@PathVariable("userId") UUID userId, @PathVariable("phoneId") UUID phoneId,
                           @RequestBody PhoneDto dto) {
        dto.setPhoneId(phoneId);
        return phoneService.update(userId, dto);
    }

    @DeleteMapping("/{phoneId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable("phoneId") UUID phoneId) { phoneService.delete(phoneId); }

    @PostMapping("/{phoneId}/sendVerificationCode")
    public void sendVerificationCode(@PathVariable("userId") UUID userId,
                                         @PathVariable("phoneId") UUID phoneId) {
        phoneService.verifyInit(userId, phoneId);
    }

    @PostMapping("/{phoneId}/submitVerificationCode/{verificationCode}")
    public PhoneDto submitVerificationCode(@PathVariable("userId") UUID userId,
                                           @PathVariable("phoneId") UUID phoneId,
                                           @PathVariable("verificationCode") String verificationCode) {
        return phoneService.verifyAttempt(userId, phoneId, verificationCode);
    }

}
