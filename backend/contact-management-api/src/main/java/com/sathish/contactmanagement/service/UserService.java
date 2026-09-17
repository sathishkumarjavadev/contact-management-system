package com.sathish.contactmanagement.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.sathish.contactmanagement.entity.User;
import com.sathish.contactmanagement.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public boolean emailExists(String email) {
        return userRepository.existsByEmail(email);
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public User updateUserStatus(Long userId, boolean enabled) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setEnabled(enabled);

        return userRepository.save(user);
    }
}
