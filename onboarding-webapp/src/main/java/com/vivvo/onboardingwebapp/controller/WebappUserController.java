package com.vivvo.onboardingwebapp.controller;

import com.vivvo.onboarding.client.UserClient;
import com.vivvo.onboarding.dto.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/users")
public class WebappUserController {

    @Autowired
    private UserClient userClient;

    @GetMapping
    public List<UserDto> findAll() {
        return userClient.findAll();
    }

    @GetMapping(params = "username")
    public Boolean usernameExists(@RequestParam("username") String username) {
        return userClient.usernameExists(username);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UserDto create(@RequestBody UserDto dto) {
        return userClient.create(dto);
    }

    @GetMapping("/{userId}")
    public UserDto get(@PathVariable("userId") UUID userId) {
        return userClient.get(userId);
    }

    @PutMapping("/{userId}")
    public UserDto update(@PathVariable("userId") UUID userId, @RequestBody UserDto dto) {
        dto.setUserId(userId);
        return userClient.update(dto);
    }

    @DeleteMapping("/{userId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable("userId") UUID userId) {
        userClient.delete(userId);
    }

}
