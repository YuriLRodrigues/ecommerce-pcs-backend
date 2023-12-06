import { InMemoryUsersRepository } from 'test/repositories/in-memory.repository';
import { DeleteUserUseCase } from './delete-user.use-case';
import { UserEntity } from '@root/domain/enterprise/entities/user.entity';
import { UniqueEntityId } from '@root/core/domain/entity/unique-id.entity';

describe('Delete User - Use Case', () => {
  let sut: DeleteUserUseCase;
  let inMemoryUsersRepository: InMemoryUsersRepository;
  let user: UserEntity;

  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new DeleteUserUseCase(inMemoryUsersRepository);
    user = UserEntity.create({
      avatar: '/avatar.png',
      name: 'Joe Doe',
      username: 'joeDoe',
      email: 'joedoe@hotmail.com',
      password: '123456789',
    });
    inMemoryUsersRepository.register({ user });
  });

  it('should delete a user with your correctly id', async () => {
    const output = await sut.execute({ id: user.id });

    expect(output.isRight()).toBe(true);
    expect(inMemoryUsersRepository.users).toHaveLength(0);
  });

  it('not should be delete a user with invalid id', async () => {
    const randomId = new UniqueEntityId();

    const output = await sut.execute({ id: randomId });

    expect(output.isLeft()).toBe(true);
    expect(inMemoryUsersRepository.users).toHaveLength(1);
    expect(output.value).toEqual(new Error(`User with id ${randomId} not found`));
  });
});
