import { UserEntity } from '@root/domain/enterprise/entities/user.entity';
import { AuthorizationUserUseCase } from './authorization.use-case';
import { FakeHashGenerator } from 'test/fake-hash-generator';
import { InMemoryUsersRepository } from 'test/repositories/in-memory-user.repository';
import { Encrypter } from '../../cryptography/encrypter';
import { FakeEncrypter } from 'test/fake-encrypter';

describe('Authorization - Use Case', () => {
  let sut: AuthorizationUserUseCase;
  let user: UserEntity;
  let hashGenerator: FakeHashGenerator;
  let encrypter: Encrypter;
  let inMemoryUsersRepository: InMemoryUsersRepository;

  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    encrypter = new FakeEncrypter();
    hashGenerator = new FakeHashGenerator();
    sut = new AuthorizationUserUseCase(inMemoryUsersRepository, encrypter, hashGenerator);
    user = UserEntity.create({
      avatar: '/avatar.png',
      name: 'Joe Doe',
      username: 'joeDoe',
      email: 'joedoe@hotmail.com',
      password: '123456789-hashed',
    });
    inMemoryUsersRepository.register({ user });
  });

  it('should be able of valid the user and return your token', async () => {
    const output = await sut.execute({
      email: user.email,
      password: '123456789',
    });

    expect(output.isRight()).toBe(true);
    expect(output.value).toBe(
      JSON.stringify({
        sub: user.id.toValue(),
        roles: user.roles,
      }),
    );
  });

  it('not should be able of valid the user and return your token with incorrectly password', async () => {
    const output = await sut.execute({
      email: user.email,
      password: '12345678',
    });

    expect(output.isLeft()).toBe(true);
    expect(output.value).toEqual(new Error('Invalid credentials'));
  });

  it('not should be able of valid the user and return your token with incorrectly email', async () => {
    const output = await sut.execute({
      email: 'email@gmail.com',
      password: user.email,
    });

    expect(output.isLeft()).toBe(true);
    expect(output.value).toEqual(new Error('User not found'));
  });
});
