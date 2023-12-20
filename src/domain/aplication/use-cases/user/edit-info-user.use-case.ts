import { Either, left, right } from '@root/core/logic/Either';
import { UserRepository } from '../../repositories/user.repository';
import { UserEntity } from '@root/domain/enterprise/entities/user.entity';
import { UniqueEntityId } from '@root/core/domain/entity/unique-id.entity';

type Output = Either<Error, UserEntity>;

type Input = {
  id: UniqueEntityId;
  name: string;
  username: string;
};

export class EditInfoUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ id, name, username }: Input): Promise<Output> {
    const userExists = await this.userRepository.findById({ id: id.toValue() });

    if (!userExists) {
      return left(new Error(`User with id ${id} does not exist`));
    }

    userExists.editInfoUser({
      username,
      name,
    });

    const userUpdated = await this.userRepository.save({ user: userExists });

    return right(userUpdated);
  }
}
