import { Prisma, User } from '@prisma/client';
import { UserEntity } from '@root/domain/enterprise/entities/user.entity';

export class UserMappers {
  static toDomain(user: User): UserEntity {
    return UserEntity.create({
      avatar: user.avatar,
      email: user.email,
      name: user.name,
      password: user.password,
      username: user.username,
    });
  }
  static toPersistence(user: UserEntity): Prisma.UserCreateInput {
    return {
      avatar: user.avatar,
      email: user.email,
      name: user.name,
      password: user.password,
      username: user.username,
    };
  }
}
