package dev.xbase.services.organizations;

import dev.xbase.controller.api.organization.models.OrganizationResponse;
import dev.xbase.domain.common.RequestPagination;
import dev.xbase.domain.organizations.Organization;
import dev.xbase.domain.users.User;
import dev.xbase.domain.users.UserSearchCriteria;
import dev.xbase.repository.database.organizations.OrganizationEntity;
import dev.xbase.repository.database.organizations.OrganizationMapper;
//import dev.xbase.repository.database.organizations.OrganizationRepository;
import dev.xbase.repository.database.organizations.OrganizationRepository;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrganizationQueryService {

    @NonNull
    OrganizationRepository organizationRepository;
    @NonNull
    final OrganizationMapper organizationMapper;

    public List<OrganizationResponse> getOrganizations() {
        List<OrganizationEntity> organizations = organizationRepository.findAll();
        return organizationMapper.toListOrganizationResponse(organizations);
    }

    public OrganizationResponse getOrganization(Integer orgId) {
        OrganizationEntity organization = organizationRepository.findById(orgId).orElseThrow(() -> new RuntimeException("Organization not found"));
        return organizationMapper.toOrganizationResponse(organization);
    }
}
