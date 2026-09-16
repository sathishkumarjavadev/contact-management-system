package com.sathish.contactmanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sathish.contactmanagement.entity.Contact;

public interface ContactRepository extends JpaRepository<Contact, Long> {

}