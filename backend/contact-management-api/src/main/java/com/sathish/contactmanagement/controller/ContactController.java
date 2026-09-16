package com.sathish.contactmanagement.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sathish.contactmanagement.entity.Contact;
import com.sathish.contactmanagement.service.ContactService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/contacts")
public class ContactController {

    private final ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @GetMapping
    public ResponseEntity<List<Contact>> getAllContacts(
            Authentication authentication) {

        String email = authentication.getName();

        return ResponseEntity.ok(
                contactService.getAllContacts(email)
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Contact> getContactById(
            @PathVariable Long id,
            Authentication authentication) {

        String email = authentication.getName();

        return contactService
                .getContactById(id, email)
                .map(ResponseEntity::ok)
                .orElseGet(() ->
                        ResponseEntity.notFound().build()
                );
    }

    @PostMapping
    public ResponseEntity<Contact> createContact(
            @Valid @RequestBody Contact contact,
            Authentication authentication) {

        String email = authentication.getName();

        Contact savedContact =
                contactService.createContact(
                        contact,
                        email
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedContact);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Contact> updateContact(
            @PathVariable Long id,
            @Valid @RequestBody Contact contact,
            Authentication authentication) {

        String email = authentication.getName();

        return contactService
                .updateContact(id, contact, email)
                .map(ResponseEntity::ok)
                .orElseGet(() ->
                        ResponseEntity.notFound().build()
                );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContact(
            @PathVariable Long id,
            Authentication authentication) {

        String email = authentication.getName();

        boolean deleted =
                contactService.deleteContact(
                        id,
                        email
                );

        if (!deleted) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.noContent().build();
    }
}