import { UniqueEntityId } from '@root/core/domain/entity/unique-id.entity';
import { UserRepository } from '../../repositories/user.repository';
import { Either, left, right } from '@root/core/logic/Either';
import { UserEntity } from '@root/domain/enterprise/entities/user.entity';
import { Injectable } from '@nestjs/common';

type Input = {
  id: UniqueEntityId;
};

type Output = Either<Error, UserEntity>;

@Injectable()
export class FindUserByIdUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ id }: Input): Promise<Output> {
    const user = await this.userRepository.findById({ id: id.toValue() });

    if (!user) {
      return left(new Error(`User with id ${id} does not exist`));
    }

    return right(user);
  }
}
