package com.alhuck.invoice.graphql.query;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import com.alhuck.invoice.domain.User;
import com.alhuck.invoice.repository.UserRepository;
import com.alhuck.invoice.service.UserService;
import com.alhuck.invoice.service.dto.UserDTO;
import com.coxautodev.graphql.tools.GraphQLQueryResolver;

@Component
public class UserQuery implements GraphQLQueryResolver {

    @Autowired
    private UserRepository userService;

    public List<User> getUsers() {
        return (List<User>) this.userService.findAllByLoginNot(null, "anonymoususer")
            .getContent();
    }

    public Optional<User> getUser(String id) {
        return this.userService.findOneByLogin(id);
    }
}
