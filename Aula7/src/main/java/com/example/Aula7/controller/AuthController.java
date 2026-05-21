package com.example.Aula7.controller;
import com.example.Aula7.dto.LoginDTO;
import com.example.Aula7.dto.RegisterDTO;
import com.example.Aula7.entity.Role;
import com.example.Aula7.entity.User;
import com.example.Aula7.repository.UserRepository;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
 
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<String> register(
            @RequestBody @Valid RegisterDTO dto) {

        if (userRepository.findByEmail(dto.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email já cadastrado");
        }

        User user = new User();

        user.setEmail(dto.getEmail());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setRole(Role.USER);

        userRepository.save(user);

        return ResponseEntity.ok("Usuário cadastrado");
    }

    @PostMapping("/login")
        public ResponseEntity<String> login(@RequestBody @Valid LoginDTO dto) {

            var userOpt = userRepository.findByEmail(dto.getEmail());

            if (userOpt.isEmpty()) {
                return ResponseEntity.badRequest()
                  .body("Usuário não encontrado");
            }

            User user = userOpt.get();

            boolean senhaCorreta = passwordEncoder.matches(
              dto.getPassword(),
              user.getPassword()
            );

            if (!senhaCorreta) {
                return ResponseEntity.badRequest()
                 .body("Senha inválida");
            }

            return ResponseEntity.ok("Login realizado");
        }
}