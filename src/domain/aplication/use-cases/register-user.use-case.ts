import { Either, left, right } from '@root/core/logic/Either';
import { UserRepository } from '../repositories/user.repository';
import { UserEntity } from '@root/domain/enterprise/entities/user.entity';
import { Injectable } from '@nestjs/common';

type Output = Either<Error, UserEntity>;

type InputProps = {
  avatar: string;
  name: string;
  username: string;
  email: string;
  password: string;
};

@Injectable()
export class RegisterUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(data: InputProps): Promise<Output> {
    const { avatar, email, name, password, username } = data;

    const userAlreadyExists = await this.userRepository.findByEmail({
      email,
    });

    if (userAlreadyExists) {
      return left(new Error(`User with this e-mail already exists`));
    }

    const user = UserEntity.create({
      avatar,
      email,
      name,
      password,
      username,
    });

    const newUser = await this.userRepository.register({
      user,
    });

    return right(newUser);
  }
}
