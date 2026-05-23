package com.example.Aula7.dto;

public record TaskResponseDTO(
    Long id,
    String title,
    String description,
    String status,
    String priority
) {}