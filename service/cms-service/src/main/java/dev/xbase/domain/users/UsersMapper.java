package dev.xbase.domain.users;

import dev.xbase.repository.database.users.UserEntity;
import org.mapstruct.Mapper;
import dev.xbase.core.model.mapper.EntityMapper;

@Mapper(componentModel = "spring")
public interface UsersMapper extends EntityMapper<User, UserEntity> {
}
