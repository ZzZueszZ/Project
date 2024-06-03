package dev.xbase.repository.database.organizations;

import dev.xbase.controller.api.organization.models.OrganizationRequest;
import dev.xbase.controller.api.organization.models.OrganizationResponse;
import dev.xbase.controller.api.organization.models.OrganizationUpdateRequest;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface OrganizationMapper {
    OrganizationResponse toOrganizationResponse (OrganizationEntity organizationEntity);
    List<OrganizationResponse> toListOrganizationResponse (List<OrganizationEntity> organizationEntityList);

    OrganizationEntity toOrganiztionEntity(OrganizationRequest organizationRequest);

    @Mapping(target = "id", ignore = true)
    void updateOrganization(@MappingTarget OrganizationEntity organizationEntity, OrganizationUpdateRequest organizationUpdateRequest);

}
