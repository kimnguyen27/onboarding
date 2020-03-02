package com.vivvo.onboarding.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.*;

@Entity
@Table(name="usr")
@Getter
@Setter
@Accessors(chain = true)
public class User {

	@Id
	@Column(name = "usr_id")
	@Type(type = "uuid-char")
	private UUID userId;

	@Column(name = "first_name")
	private String firstName;

	@Column(name = "last_name")
	private String lastName;

	@Column(name = "username")
	private String username;

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "userId", orphanRemoval = true)
	private List<Phone> phones;
}
