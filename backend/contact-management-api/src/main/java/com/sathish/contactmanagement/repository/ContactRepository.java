package com.sathish.contactmanagement.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.sathish.contactmanagement.entity.Contact;

public interface ContactRepository extends JpaRepository<Contact, Long> {

    List<Contact> findByUserId(Long userId);

    Optional<Contact> findByIdAndUserId(Long id, Long userId);

    @Query("""
            SELECT c
            FROM Contact c
            LEFT JOIN FETCH c.user
            ORDER BY c.id
            """)
    List<Contact> findAllWithUserOrderByIdAsc();
}
