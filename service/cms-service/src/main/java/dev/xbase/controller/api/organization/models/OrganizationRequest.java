package dev.xbase.controller.api.organization.models;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class OrganizationRequest {
    @NotBlank(message = "error.uid.notNull")
    String uid;
    @NotBlank(message = "error.name.notNull")
    String name;
    @NotBlank(message = "error.code.notNull")
    String code;
    Integer parent_id;
    String path;
    String status;
    LocalDateTime created_at;

    public OrganizationRequest() {
        this.created_at = LocalDateTime.now(); // Gán giá trị created_at là thời gian hiện tại
    }
}
