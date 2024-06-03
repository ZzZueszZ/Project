package dev.xbase.controller.api.organization;

import dev.xbase.controller.api.organization.models.OrganizationRequest;
import dev.xbase.controller.api.organization.models.OrganizationResponse;
import dev.xbase.controller.api.organization.models.OrganizationUpdateRequest;
import dev.xbase.controller.api.users.models.UserResponse;
import dev.xbase.core.model.ValueResponse;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/v1/api/organizations")

public interface OrganizationAPI {

        @GetMapping
        ValueResponse<List<OrganizationResponse>> organizations(
//                @RequestParam(required = false, value = "name") String name,
//                @RequestParam(required = false, value = "uid", defaultValue = "") String uid,
//                @RequestParam(required = false, value = "code", defaultValue = "") String code,
//                @RequestParam(required = false, value = "parentId", defaultValue = "0") Integer parentId,
//                @RequestParam(required = false, value = "path", defaultValue = "") String path,
//                @RequestParam(required = false, value = "status", defaultValue = "") String status,
//                @RequestParam(required = false, value = "current", defaultValue = "1") Integer currentPage,
//                @RequestParam(required = false, value = "pageSize", defaultValue = "20") Integer pageSize
              );

//        @GetMapping("findBy")
//        ValueResponse<UserResponse> findBy(@RequestParam("userId") Integer userId);
//
//        @DeleteMapping
//        void delete(@RequestParam("id") Integer id);
//
        @PostMapping
        void save(@Valid @RequestBody OrganizationRequest organizationRequest);

        @DeleteMapping
        void delete(@RequestParam("id") Integer id);

        @PutMapping("/{id}")
        void update(@RequestBody OrganizationUpdateRequest request, @RequestParam("id") Integer id);

        @GetMapping("findBy")
        ValueResponse<OrganizationResponse> findBy(@RequestParam("orgId") Integer orgId);
}


