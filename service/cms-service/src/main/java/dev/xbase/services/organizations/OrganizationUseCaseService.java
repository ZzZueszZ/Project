package dev.xbase.services.organizations;

import dev.xbase.controller.api.organization.models.OrganizationRequest;
import dev.xbase.controller.api.organization.models.OrganizationResponse;
import dev.xbase.controller.api.organization.models.OrganizationUpdateRequest;
import dev.xbase.core.model.ValueResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrganizationUseCaseService {

    @NonNull
    final OrganizationQueryService organizationQueryService;
    private final OrganizationCommandService organizationCommandService;

    public List<OrganizationResponse> organizations () {
        return organizationQueryService.getOrganizations();
    }

    public OrganizationResponse getOrganization (Integer orgId) {
        return organizationQueryService.getOrganization(orgId);
    }
    @Transactional
    public void createOrganization(OrganizationRequest request) {
        organizationCommandService.createOrganization(request);
    }

    @Transactional
    public void deleteOrganization(Integer id) {
        organizationCommandService.deleteOrganization(id);
    }

    @Transactional
    public void updateOrganization(OrganizationUpdateRequest request, Integer id) {
        organizationCommandService.updateOrganization(request, id);
    }
}
