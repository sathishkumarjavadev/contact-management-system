package com.sathish.contactmanagement.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sathish.contactmanagement.dto.AdminContactResponse;
import com.sathish.contactmanagement.dto.AdminUserResponse;
import com.sathish.contactmanagement.entity.Contact;
import com.sathish.contactmanagement.entity.User;
import com.sathish.contactmanagement.repository.ContactRepository;
import com.sathish.contactmanagement.repository.UserRepository;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final UserRepository userRepository;
    private final ContactRepository contactRepository;

    public AdminController(
            UserRepository userRepository,
            ContactRepository contactRepository) {

        this.userRepository = userRepository;
        this.contactRepository = contactRepository;
    }

    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<AdminUserResponse>> getAllUsers() {

        List<AdminUserResponse> users =
                userRepository.findAll()
                        .stream()
                        .map(this::convertToUserResponse)
                        .toList();

        return ResponseEntity.ok(users);
    }

    @GetMapping("/contacts")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<AdminContactResponse>> getAllContacts() {

        List<AdminContactResponse> contacts =
                contactRepository
                        .findAllWithUserOrderByIdAsc()
                        .stream()
                        .map(this::convertToContactResponse)
                        .toList();

        return ResponseEntity.ok(contacts);
    }

    private AdminUserResponse convertToUserResponse(User user) {

        return new AdminUserResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole(),
                user.isEnabled()
        );
    }

    private AdminContactResponse convertToContactResponse(
            Contact contact) {

        User user = contact.getUser();

        Long userId = null;
        String userName = null;
        String userEmail = null;

        if (user != null) {
            userId = user.getId();
            userName = user.getName();
            userEmail = user.getEmail();
        }

        return new AdminContactResponse(
                contact.getId(),
                contact.getFirstName(),
                contact.getLastName(),
                contact.getEmail(),
                contact.getPhone(),
                contact.getCompany(),
                contact.getJobTitle(),
                contact.getAddress(),
                contact.getCity(),
                contact.getState(),
                contact.getCountry(),
                contact.getNotes(),
                userId,
                userName,
                userEmail
        );
    }
}