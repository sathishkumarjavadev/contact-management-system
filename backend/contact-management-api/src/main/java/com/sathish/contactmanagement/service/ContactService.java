package com.sathish.contactmanagement.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.sathish.contactmanagement.entity.Contact;
import com.sathish.contactmanagement.entity.User;
import com.sathish.contactmanagement.repository.ContactRepository;
import com.sathish.contactmanagement.repository.UserRepository;

@Service
public class ContactService {

    private final ContactRepository contactRepository;
    private final UserRepository userRepository;

    public ContactService(
            ContactRepository contactRepository,
            UserRepository userRepository) {

        this.contactRepository = contactRepository;
        this.userRepository = userRepository;
    }

    public List<Contact> getAllContacts(String email) {

        User user = getUserByEmail(email);

        return contactRepository.findByUserId(user.getId());
    }

    public Optional<Contact> getContactById(
            Long id,
            String email) {

        User user = getUserByEmail(email);

        return contactRepository.findByIdAndUserId(
                id,
                user.getId()
        );
    }

    public Contact createContact(
            Contact contact,
            String email) {

        User user = getUserByEmail(email);

        contact.setUser(user);

        return contactRepository.save(contact);
    }

    public Optional<Contact> updateContact(
            Long id,
            Contact updatedContact,
            String email) {

        User user = getUserByEmail(email);

        return contactRepository
                .findByIdAndUserId(id, user.getId())
                .map(existingContact -> {

                    existingContact.setFirstName(
                            updatedContact.getFirstName()
                    );

                    existingContact.setLastName(
                            updatedContact.getLastName()
                    );

                    existingContact.setEmail(
                            updatedContact.getEmail()
                    );

                    existingContact.setPhone(
                            updatedContact.getPhone()
                    );

                    existingContact.setCompany(
                            updatedContact.getCompany()
                    );

                    existingContact.setJobTitle(
                            updatedContact.getJobTitle()
                    );

                    existingContact.setAddress(
                            updatedContact.getAddress()
                    );

                    existingContact.setCity(
                            updatedContact.getCity()
                    );

                    existingContact.setState(
                            updatedContact.getState()
                    );

                    existingContact.setCountry(
                            updatedContact.getCountry()
                    );

                    existingContact.setNotes(
                            updatedContact.getNotes()
                    );

                    return contactRepository.save(
                            existingContact
                    );
                });
    }

    public boolean deleteContact(
            Long id,
            String email) {

        User user = getUserByEmail(email);

        Optional<Contact> contact =
                contactRepository.findByIdAndUserId(
                        id,
                        user.getId()
                );

        if (contact.isEmpty()) {
            return false;
        }

        contactRepository.delete(contact.get());

        return true;
    }

    private User getUserByEmail(String email) {

        return userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new IllegalStateException(
                                "Authenticated user not found"
                        )
                );
    }
}