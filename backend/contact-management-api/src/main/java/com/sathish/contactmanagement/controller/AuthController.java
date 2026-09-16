package com.sathish.contactmanagement.controller;

import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sathish.contactmanagement.dto.LoginRequest;
import com.sathish.contactmanagement.dto.SignupRequest;
import com.sathish.contactmanagement.entity.User;
import com.sathish.contactmanagement.security.JwtService;
import com.sathish.contactmanagement.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthController(
            UserService userService,
            PasswordEncoder passwordEncoder,
            JwtService jwtService) {

        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @PostMapping("/signup")
    public ResponseEntity<Map<String, Object>> signup(
            @Valid @RequestBody SignupRequest request) {

        Map<String, Object> response = new LinkedHashMap<>();

        if (userService.emailExists(request.getEmail())) {

            response.put("status", 409);
            response.put("message", "Email is already registered");

            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(response);
        }

        String encodedPassword =
                passwordEncoder.encode(request.getPassword());

        User user = new User(
                request.getName(),
                request.getEmail(),
                encodedPassword,
                "USER",
                true
        );

        User savedUser = userService.createUser(user);

        response.put("status", 201);
        response.put("message", "User registered successfully");
        response.put("userId", savedUser.getId());
        response.put("name", savedUser.getName());
        response.put("email", savedUser.getEmail());
        response.put("role", savedUser.getRole());

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(
            @Valid @RequestBody LoginRequest request) {

        Map<String, Object> response = new LinkedHashMap<>();

        User user = userService
                .getUserByEmail(request.getEmail())
                .orElse(null);

        if (user == null) {

            response.put("status", 401);
            response.put("message", "Invalid email or password");

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(response);
        }

        if (!user.isEnabled()) {

            response.put("status", 403);
            response.put("message", "Your account has been disabled");

            return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .body(response);
        }

        boolean passwordMatches =
                passwordEncoder.matches(
                        request.getPassword(),
                        user.getPassword()
                );

        if (!passwordMatches) {

            response.put("status", 401);
            response.put("message", "Invalid email or password");

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(response);
        }

        String token = jwtService.generateToken(user);

        response.put("status", 200);
        response.put("message", "Login successful");
        response.put("token", token);
        response.put("userId", user.getId());
        response.put("name", user.getName());
        response.put("email", user.getEmail());
        response.put("role", user.getRole());

        return ResponseEntity.ok(response);
    }
}