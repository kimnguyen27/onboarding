package com.vivvo.onboarding.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Table(name="phone")
@Getter
@Setter
@Accessors(chain = true)
public class Phone {

    @Id
    @Column(name = "phone_id")
    @Type(type = "uuid-char")
    private UUID phoneId;

    @ManyToOne
    @JoinColumn(name = "usr_id", insertable = false, updatable = false)
    private User user;

    @Column(name = "usr_id")
    @Type(type = "uuid-char")
    private UUID userId;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "verified")
    private Boolean verified;

    @Column(name = "verification_Sid")
    private String verificationSid;
}
