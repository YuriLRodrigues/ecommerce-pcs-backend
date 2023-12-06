import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { UniqueEntityId } from '@root/core/domain/entity/unique-id.entity';
import { Either, left, right } from '@root/core/logic/Either';

type Output = Either<Error, null>;

type Input = {
  id: UniqueEntityId;
};

@Injectable()
export class DeleteUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ id }: Input): Promise<Output> {
    const user = await this.userRepository.findById({
      id: id.toValue(),
    });

    if (!user) {
      return left(new Error(`User with id ${id} not found`));
    }

    await this.userRepository.delete({
      id: id.toValue(),
    });

    return right(null);
  }
}
