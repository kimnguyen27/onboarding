package com.vivvo.onboarding.client;

import com.vivvo.onboarding.dto.PhoneDto;
import lombok.Setter;

import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.Entity;
import javax.ws.rs.client.WebTarget;
import java.util.UUID;

public class PhoneClient {

    private Client client;
    @Setter
    private String baseUri;

    public PhoneClient() { this.client = ClientBuilder.newClient(); }

    public PhoneDto create(PhoneDto dto) {
        return phoneTarget(dto.getUserId())
                .request()
                .post(Entity.json(dto), PhoneDto.class);
    }

    public PhoneDto update(PhoneDto dto) {
        return phoneTarget(dto.getUserId(), dto.getPhoneId())
                .request()
                .put(Entity.json(dto), PhoneDto.class);
    }

    public void delete(UUID userId, UUID phoneId) {
        phoneTarget(userId, phoneId)
                .request()
                .delete(Void.class);
    }

    public PhoneDto get(UUID userId, UUID phoneId) {
        return phoneTarget(userId, phoneId)
                .request()
                .get(PhoneDto.class);
    }

    private WebTarget phoneTarget(UUID userId) {
        return client.target(baseUri)
                .path("api")
                .path("v1")
                .path("users")
                .path(userId.toString())
                .path("phones");
    }

    private WebTarget phoneTarget(UUID userId, UUID phoneId) {
        return phoneTarget(userId)
                .path(phoneId.toString());
    }


}
