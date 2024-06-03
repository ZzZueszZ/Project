package dev.xbase.controller.api.organization.models;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class OrganizationUpdateRequest {
    String uid;
    String name;
    String code;
    Integer parent_id;
    String path;
    String status;
    LocalDateTime updated_at;

    public OrganizationUpdateRequest() {
        this.updated_at = LocalDateTime.now();
    }
}
