import { InMemoryUsersRepository } from 'test/repositories/in-memory.repository';
import { RegisterUserUseCase } from './register-user.use-case';
import { UserEntity } from '@root/domain/enterprise/entities/user.entity';

describe('Register User - Use Case', () => {
  let inMemoryUsersRepository: InMemoryUsersRepository;
  let sut: RegisterUserUseCase;
  let userDefault: UserEntity;

  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new RegisterUserUseCase(inMemoryUsersRepository);
    userDefault = UserEntity.create({
      avatar: '/avatar.png',
      name: 'Joe Doe',
      username: 'joeDoe',
      email: 'joedoe@hotmail.com',
      password: '123456789',
    });
  });

  it('should be able to register user in the database (inMemory)', async () => {
    const user = await sut.execute(userDefault);

    expect(user.isRight()).toBe(true);
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

  it('not should be able to register user in the database with existing email', async () => {
    await inMemoryUsersRepository.register({ user: userDefault });

    const userExists = UserEntity.create({
      avatar: '/avatar.png',
      name: 'Joe Doe',
      username: 'joeDoe',
      email: 'joedoe@hotmail.com',
      password: '123456789',
    });

    const newUser = await sut.execute(userExists);

    expect(newUser.isLeft()).toBe(true);
    expect(inMemoryUsersRepository.users).toHaveLength(1);
  });
});