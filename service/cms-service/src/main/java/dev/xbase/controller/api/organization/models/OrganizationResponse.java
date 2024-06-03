package dev.xbase.controller.api.organization.models;

import jakarta.persistence.Entity;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrganizationResponse {
   String uid;
   String code;
   String name;
   Integer parentId;
   String path;
   String status;
   LocalDateTime created_at;
   LocalDateTime updated_at;
}
