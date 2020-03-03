package com.vivvo.onboarding.configuration;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "app")
@Data
public class ApplicationProperties {

    private TwilioProperties twilio = new TwilioProperties();

    @Data
    public static class TwilioProperties {
        private String accountSid = System.getenv("TWILIO_ACCOUNT_SID");
        private String authToken = System.getenv("TWILIO_AUTH_TOKEN");
    }
}
