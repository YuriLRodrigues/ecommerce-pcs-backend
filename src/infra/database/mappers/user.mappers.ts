import { Prisma, User, UserRole } from '@prisma/client';
import { UniqueEntityId } from '@root/core/domain/entity/unique-id.entity';
import { UserEntity, UserRoles } from '@root/domain/enterprise/entities/user.entity';

export class UserMappers {
  static toDomain(user: User): UserEntity {
    return UserEntity.create(
      {
        avatar: user.avatar,
        email: user.email,
        name: user.name,
        password: user.password,
        username: user.username,
        roles: user.role.map((role) => UserRoles[role]) ?? [UserRoles.user],
      },
      new UniqueEntityId(user.id),
    );
  }
  static toPersistence(user: UserEntity): Prisma.UserCreateInput {
    return {
      id: user.id.toValue(),
      avatar: user.avatar,
      email: user.email,
      name: user.name,
      password: user.password,
      username: user.username,
      role: user.roles.map((role) => UserRole[role]) ?? [UserRole.user],
    };
  }
}
