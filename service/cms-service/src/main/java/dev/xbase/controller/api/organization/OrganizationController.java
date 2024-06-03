package dev.xbase.controller.api.organization;

import dev.xbase.controller.api.organization.models.OrganizationRequest;
import dev.xbase.controller.api.organization.models.OrganizationResponse;
import dev.xbase.controller.api.organization.models.OrganizationUpdateRequest;
import dev.xbase.core.model.ValueResponse;
import dev.xbase.services.organizations.OrganizationUseCaseService;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class OrganizationController implements OrganizationAPI{

    @NonNull
    final OrganizationUseCaseService organizationUseCaseService;


    @Override
    public ValueResponse<List<OrganizationResponse>> organizations() {
       List<OrganizationResponse> organizations = organizationUseCaseService.organizations();
        return new ValueResponse<>(organizations);
    }

    @Override
    public ValueResponse<OrganizationResponse> findBy(Integer orgId) {
        OrganizationResponse organization = organizationUseCaseService.getOrganization(orgId);
        return new ValueResponse<>(organization);
    }

    @Override
    public void delete(Integer id) {
        organizationUseCaseService.deleteOrganization(id);
    }



    @Override
    public void update(OrganizationUpdateRequest request, Integer id) {
        organizationUseCaseService.updateOrganization(request, id);
    }

    @Override
    public void save(OrganizationRequest request) {
        organizationUseCaseService.createOrganization(request);
    }
}
