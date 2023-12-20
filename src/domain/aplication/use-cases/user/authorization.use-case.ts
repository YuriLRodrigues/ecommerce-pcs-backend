import { UserRepository } from '../../repositories/user.repository';
import { HashGenerator } from '../../cryptography/hash-generator';
import { Encrypter } from '../../cryptography/encrypter';
import { Either, left, right } from '@root/core/logic/Either';
import { Injectable } from '@nestjs/common';

type Output = Either<Error, string>;

type Input = {
  email: string;
  password: string;
};

@Injectable()
export class AuthorizationUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly encrypter: Encrypter,
    private readonly hashGenerator: HashGenerator,
  ) {}

  async execute({ email, password }: Input): Promise<Output> {
    const user = await this.userRepository.findByEmail({ email });

    if (!user) {
      return left(new Error(`User not found`));
    }

    const isEqualPassword = await this.hashGenerator.compare(password, user.password);

    if (!isEqualPassword) {
      return left(new Error(`Invalid credentials`));
    }

    const token = await this.encrypter.encrypt({
      sub: user.id.toValue(),
      roles: user.roles,
    });

    return right(token);
  }
}
