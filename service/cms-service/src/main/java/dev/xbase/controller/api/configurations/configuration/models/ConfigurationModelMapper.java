package dev.xbase.controller.api.configurations.configuration.models;

import dev.xbase.controller.api.configurations.configuration.ConfigurationResponse;
import dev.xbase.controller.api.configurations.group.ConfigurationGroupResponse;
import dev.xbase.domain.configuration.Configuration;
import dev.xbase.domain.configuration.ConfigurationGroup;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ConfigurationModelMapper {

    ConfigurationResponse toModel(Configuration entity);

    List<ConfigurationResponse> toModel(List<Configuration> entityList);
}
