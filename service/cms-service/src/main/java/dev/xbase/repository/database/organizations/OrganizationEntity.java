package dev.xbase.repository.database.organizations;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "organizations")

public class OrganizationEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String uid;
    private String code;
    private String name;
    private Integer parent_id;
    private String path;
    private String status;
    private LocalDateTime created_at;
    private LocalDateTime updated_at;


}
