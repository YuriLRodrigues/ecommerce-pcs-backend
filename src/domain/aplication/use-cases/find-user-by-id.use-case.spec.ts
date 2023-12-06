import { UserEntity } from '@root/domain/enterprise/entities/user.entity';
import { InMemoryUsersRepository } from 'test/repositories/in-memory.repository';
import { FindUserByIdUseCase } from './find-user-by-id.use-case';
import { UniqueEntityId } from '@root/core/domain/entity/unique-id.entity';

describe('Find User By Id - Use Case', () => {
  let inMemoryUsersRepository: InMemoryUsersRepository;
  let user: UserEntity;
  let sut: FindUserByIdUseCase;

  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new FindUserByIdUseCase(inMemoryUsersRepository);
    user = user = UserEntity.create({
      avatar: '/avatar.png',
      name: 'Joe Doe',
      username: 'joeDoe',
      email: 'joedoe@hotmail.com',
      password: '123456789',
    });
    inMemoryUsersRepository.register({ user });
  });

  it('should be able to find a user by id', async () => {
    const output = await sut.execute({ id: user.id });

    expect(output.isRight()).toBe(true);
    expect(inMemoryUsersRepository.users).toHaveLength(1);
    expect(inMemoryUsersRepository.users[0]).toEqual(
      expect.objectContaining({
        avatar: '/avatar.png',
        name: 'Joe Doe',
        username: 'joeDoe',
        email: 'joedoe@hotmail.com',
        password: '123456789',
      }),
    );
  });

  it('not should be able to find a user by id with invalid id', async () => {
    const randomId = new UniqueEntityId();
    const output = await sut.execute({ id: randomId });

    expect(output.isLeft()).toBe(true);
    expect(inMemoryUsersRepository.users).toHaveLength(1);
    expect(inMemoryUsersRepository.users[0]).toEqual(
      expect.objectContaining({
        avatar: '/avatar.png',
        name: 'Joe Doe',
        username: 'joeDoe',
        email: 'joedoe@hotmail.com',
        password: '123456789',
      }),
    );
  });
});
