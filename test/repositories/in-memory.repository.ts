import {
  DeleteProps,
  FindByEmailProps,
  FindByIdProps,
  RegisterProps,
  SaveProps,
  UserRepository,
} from '@root/domain/aplication/repositories/user.repository';
import { UserEntity } from '@root/domain/enterprise/entities/user.entity';

export class InMemoryUsersRepository implements UserRepository {
  public users: UserEntity[] = [];

  async register({ user }: RegisterProps): Promise<UserEntity> {
    this.users.push(user);
    return user;
  }

  async findById({ id }: FindByIdProps): Promise<UserEntity> {
    const user = this.users.find((user) => user.id.toValue() === id);

    return user ?? null;
  }

  async findByEmail({ email }: FindByEmailProps): Promise<UserEntity | null> {
    const user = this.users.find((user) => user.email === email);

    return user ?? null;
  }

  async save({ user }: SaveProps): Promise<UserEntity> {
    const userIndex = this.users.findIndex((u) => u.id.toValue() === user.id.toValue());
    this.users[userIndex] = user;
    return user;
  }

  async delete({ id }: DeleteProps): Promise<void> {
    this.users = this.users.filter((u) => u.id.toValue() !== id);
    return;
  }
}
