package dev.xbase.domain.organizations;

import lombok.Builder;

@Builder
public record Organization (
    Integer id,
    String ui,
    String code,
    String name,
    String parentId,
    String path,
    String status
)  {}
