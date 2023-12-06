import { UserEntity } from '@root/domain/enterprise/entities/user.entity';

export type FindByEmailProps = {
  email: string;
};

export type FindByIdProps = {
  id: string;
};

export type RegisterProps = {
  user: UserEntity;
};

export type DeleteProps = {
  id: string;
};

export type SaveProps = {
  user: UserEntity;
};

export abstract class UserRepository {
  abstract findByEmail(data: FindByEmailProps): Promise<UserEntity | null>;
  abstract findById(data: FindByIdProps): Promise<UserEntity | null>;
  abstract register(data: RegisterProps): Promise<UserEntity>;
  abstract save(data: SaveProps): Promise<UserEntity>;
  abstract delete(data: DeleteProps): Promise<void>;
}
