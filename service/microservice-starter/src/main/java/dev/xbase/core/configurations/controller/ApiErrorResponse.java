package dev.xbase.core.configurations.controller;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDateTime;

public record ApiErrorResponse(String guid,
                               String code,
                               String message,
                               String path,
                               String method,
                               @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss'Z'")
                               LocalDateTime timestamp) {}