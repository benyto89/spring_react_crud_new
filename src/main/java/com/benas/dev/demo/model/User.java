package com.benas.dev.demo.model;

import jakarta.persistence.GeneratedValue;
import lombok.*;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
@Entity
@Table(name = "\"user\"")
public class User {
    @Id
    @GeneratedValue
    private Long id;
    @NonNull
    private String name;
    private String lastname;
    private String occupation;
}
