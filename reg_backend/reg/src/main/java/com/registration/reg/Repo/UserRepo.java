package com.registration.reg.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import com.registration.reg.Entity.User;


@EnableJpaRepositories
@Repository
public interface UserRepo extends JpaRepository<User, Integer>{
    boolean existsByEmail(String email);
    boolean existsByPhone(String phone);
}

