package com.sathish.contactmanagement.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.sathish.contactmanagement.entity.Contact;
import com.sathish.contactmanagement.repository.ContactRepository;

@Service
public class ContactService {

    private final ContactRepository contactRepository;

    public ContactService(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    public List<Contact> getAllContacts() {
        return contactRepository.findAll();
    }

    public Optional<Contact> getContactById(Long id) {
        return contactRepository.findById(id);
    }

    public Contact createContact(Contact contact) {
        return contactRepository.save(contact);
    }

    public Optional<Contact> updateContact(Long id, Contact updatedContact) {

        return contactRepository.findById(id)
                .map(existingContact -> {

                    existingContact.setFirstName(updatedContact.getFirstName());
                    existingContact.setLastName(updatedContact.getLastName());
                    existingContact.setEmail(updatedContact.getEmail());
                    existingContact.setPhone(updatedContact.getPhone());
                    existingContact.setCompany(updatedContact.getCompany());
                    existingContact.setJobTitle(updatedContact.getJobTitle());
                    existingContact.setAddress(updatedContact.getAddress());
                    existingContact.setCity(updatedContact.getCity());
                    existingContact.setState(updatedContact.getState());
                    existingContact.setCountry(updatedContact.getCountry());
                    existingContact.setNotes(updatedContact.getNotes());

                    return contactRepository.save(existingContact);
                });
    }

    public boolean deleteContact(Long id) {

        if (!contactRepository.existsById(id)) {
            return false;
        }

        contactRepository.deleteById(id);
        return true;
    }
}