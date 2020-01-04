package com.alhuck.invoice.graphql.query;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;

import com.alhuck.invoice.domain.User;
import com.alhuck.invoice.service.UserService;
import com.alhuck.invoice.service.dto.UserDTO;
import com.coxautodev.graphql.tools.GraphQLQueryResolver;

public class UserQuery implements GraphQLQueryResolver { 

	@Autowired
	private UserService userService;
	
	public Page<UserDTO> getUsers() {
		return this.userService.getAllManagedUsers(null);
	}
	public Optional<User> getUser(String id) {
		return this.userService.getUserWithAuthorities(id);
	}
}
