package com.benas.dev.demo;

import com.benas.dev.demo.model.User;
import com.benas.dev.demo.model.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.stream.Stream;

@Component
class Initializer implements CommandLineRunner {

    private final UserRepository repository;

    public Initializer(UserRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... strings) {
        Stream.of("Jurgis", "Antanas", "Aloyzas",
                "Martynas").forEach(name ->
                repository.save(new User(name))
        );

        repository.findAll().forEach(System.out::println);
    }
}
