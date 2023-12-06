import { UserEntity } from '@root/domain/enterprise/entities/user.entity';
import { InMemoryUsersRepository } from 'test/repositories/in-memory.repository';
import { EditInfoUserUseCase } from './edit-info-user.use-case';
import { UniqueEntityId } from '@root/core/domain/entity/unique-id.entity';

describe('Edit Info User - Use Case', () => {
  let inMemoryUsersRepository: InMemoryUsersRepository;
  let user: UserEntity;
  let sut: EditInfoUserUseCase;

  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new EditInfoUserUseCase(inMemoryUsersRepository);
    user = UserEntity.create({
      avatar: '/avatar.png',
      name: 'Joe Doe',
      username: 'joeDoe',
      email: 'joedoe@hotmail.com',
      password: '123456789',
    });
    inMemoryUsersRepository.register({ user });
  });

  it('should be able to edit user info', async () => {
    const output = await sut.execute({
      id: user.id,
      username: 'edited-username',
      name: 'edited-name',
    });

    expect(output.isRight()).toBe(true);
    expect(inMemoryUsersRepository.users).toHaveLength(1);
    expect(inMemoryUsersRepository.users[0]).toEqual(
      expect.objectContaining({
        username: 'edited-username',
        name: 'edited-name',
      }),
    );
  });

  it('not should be able to edit user info with invalid id', async () => {
    const randomId = new UniqueEntityId();

    const output = await sut.execute({
      id: randomId,
      username: 'edited-username',
      name: 'edited-name',
    });

    expect(output.isLeft()).toBe(true);
    expect(inMemoryUsersRepository.users).toHaveLength(1);
    expect(output.value).toEqual(new Error(`User with id ${randomId} does not exist`));
  });
});
