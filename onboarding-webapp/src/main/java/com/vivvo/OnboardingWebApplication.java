package com.vivvo;

import com.vivvo.onboarding.client.UserClient;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.support.MessageSourceAccessor;

@SpringBootApplication
public class OnboardingWebApplication {

    public static void main(String[] args) {
        SpringApplication.run(OnboardingWebApplication.class, args);
    }

    @Bean
    public UserClient userClient() {
        UserClient userClient = new UserClient();
        userClient.setBaseUri("http://localhost:4444");
        return userClient;
    }
}





