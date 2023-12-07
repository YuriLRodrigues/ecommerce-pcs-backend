import {
  DeleteProps,
  FindByEmailProps,
  FindByIdProps,
  RegisterProps,
  SaveProps,
  UserRepository,
} from '@root/domain/aplication/repositories/user.repository';
import { UserEntity } from '@root/domain/enterprise/entities/user.entity';
import { PrismaService } from '../prisma.service';
import { UserMappers } from '../mappers/user.mappers';

export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findByEmail({ email }: FindByEmailProps): Promise<UserEntity> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return null;
    }

    return UserMappers.toDomain(user);
  }

  async findById({ id }: FindByIdProps): Promise<UserEntity> {
    const user = await this.prismaService.user.findFirst({
      where: {
        id,
      },
    });

    if (!user) {
      return null;
    }

    return UserMappers.toDomain(user);
  }

  async register(data: RegisterProps): Promise<UserEntity> {
    const user = await this.prismaService.user.create({
      data: UserMappers.toPersistence(data.user),
    });

    return UserMappers.toDomain(user);
  }

  async save({ user }: SaveProps): Promise<UserEntity> {
    const userUpdated = await this.prismaService.user.update({
      where: {
        id: user.id.toValue(),
      },
      data: UserMappers.toPersistence(user),
    });

    return UserMappers.toDomain(userUpdated);
  }

  async delete({ id }: DeleteProps): Promise<void> {
    await this.prismaService.user.delete({
      where: {
        id,
      },
    });
    return;
  }
}
