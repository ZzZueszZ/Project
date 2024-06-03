package dev.xbase.services.organizations;

import dev.xbase.controller.api.organization.models.OrganizationRequest;
import dev.xbase.controller.api.organization.models.OrganizationUpdateRequest;
import dev.xbase.repository.database.organizations.OrganizationEntity;
import dev.xbase.repository.database.organizations.OrganizationMapper;
import dev.xbase.repository.database.organizations.OrganizationRepository;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OrganizationCommandService {
    @NonNull
    final OrganizationRepository organizationRepository;

    @NonNull
    final OrganizationMapper organizationMapper;

    public void createOrganization(OrganizationRequest request) {
        organizationRepository.save(organizationMapper.toOrganiztionEntity(request));
    }

    public void deleteOrganization(Integer id) {
        organizationRepository.deleteById(id);
    }

    public void updateOrganization(OrganizationUpdateRequest request, Integer id) {
        OrganizationEntity organization = organizationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Organization not found"));

        organizationMapper.updateOrganization(organization, request);
        organizationRepository.save(organization);
    }
}
