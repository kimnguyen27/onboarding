package com.vivvo.onboarding;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;

public class TwilioSmsTester {

    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Message message = Message.creator(
                new com.twilio.type.PhoneNumber("+13065022827"), // to
                new com.twilio.type.PhoneNumber("+13069880988"), // from
                "Test").create();

        System.out.println(message.getSid());
    }
}
