package com.registration.reg.RegController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.registration.reg.Dto.UserDto;
import com.registration.reg.Service.UserService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;


@RestController
@CrossOrigin
@RequestMapping("/api/v1/user")
public class RegController {

    @Autowired
    private UserService userService;
  
    @PostMapping(path = "/save")
    public ResponseEntity<String> saveUser(@RequestBody UserDto userDto) {
        String id = userService.addUser(userDto);
        return ResponseEntity.ok(id);
    }   

    @GetMapping(path="/get")
    public ResponseEntity<UserDto> getUserByEmail(@RequestParam String email) {
        UserDto userDto = userService.getUserByEmail(email);
        if (userDto == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(userDto);
    }
}
