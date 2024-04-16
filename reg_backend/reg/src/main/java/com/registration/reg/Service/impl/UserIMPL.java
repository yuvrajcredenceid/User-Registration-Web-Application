package com.registration.reg.Service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.registration.reg.Dto.UserDto;
import com.registration.reg.Entity.User;
import com.registration.reg.Repo.UserRepo;
import com.registration.reg.Service.UserService;


@Service
public class UserIMPL implements UserService{

    @Autowired
    private UserRepo userRepo;

    @Override
    public String addUser(UserDto userDto) {
        if (userRepo.existsByEmail(userDto.getemail())) {
            return "Email already exists";
        }
        if (userRepo.existsByPhone(userDto.getphone())) {
            return "Phone number already exists";
        }
        User user = new User(
            userDto.getid(),
            userDto.getfirstName(),
            userDto.getlastName(),
            userDto.getemail(),
            userDto.getphone(),
            userDto.getage(),
            userDto.getlocation()
            );
        userRepo.save(user);
    return user.getFirstName();
    }
}
