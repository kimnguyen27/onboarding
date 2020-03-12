package com.vivvo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.support.MessageSourceAccessor;

@SpringBootApplication
public class OnboardingApplication {

    public static void main(String[] args) {
        SpringApplication.run(OnboardingApplication.class, args);
    }

    //TODOS;
    //Add phones subresource to users
    //  liquibase create phone table
    //  dto, entity, user @OneToMany phones
    // phone validator.
    // phone validator tests
    // services, controller and client methods
    // phone controller tests
    //
    // add phone number verification using twilio

    @Bean
    public MessageSourceAccessor messageSourceAccessor(MessageSource messageSource) {
        return new MessageSourceAccessor(messageSource);
    }
}





