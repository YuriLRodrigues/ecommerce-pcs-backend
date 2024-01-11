import { UniqueEntityId } from '@root/core/domain/entity/unique-id.entity';

import { UserEntity, UserRoles } from './user.entity';

describe('User - Entity', () => {
  let output: UserEntity;

  beforeEach(() => {
    output = UserEntity.create({
      avatar: '/avatar.png',
      name: 'Joe Doe',
      username: 'joeDoe',
      email: 'joedoe@hotmail.com',
      password: '123456789',
    });
  });

  it('should be able create a User ', () => {
    expect(output).toBeInstanceOf(UserEntity);
    expect(output.id).toBeInstanceOf(UniqueEntityId);
    expect(output.avatar).toBe('/avatar.png');
    expect(output.name).toBe('Joe Doe');
    expect(output.username).toBe('joeDoe');
    expect(output.password).toBe('123456789');
    expect(output.email).toBe('joedoe@hotmail.com');
    expect(output.roles).toContain(UserRoles.user);
    expect(output.createdAt).toBeInstanceOf(Date);
    expect(output.updatedAt).toBe(undefined);
  });

  it('should be able create a User with ID', () => {
    const id = new UniqueEntityId();

    const outputWithId = UserEntity.create(
      {
        avatar: '/avatar.png',
        name: 'Joe Doe',
        username: 'joeDoe',
        email: 'joedoe@hotmail.com',
        password: '123456789',
      },
      id,
    );

    expect(outputWithId).toBeInstanceOf(UserEntity);
    expect(outputWithId.id).toBeInstanceOf(UniqueEntityId);
    expect(outputWithId.id).toBe(id);
    expect(outputWithId.avatar).toBe('/avatar.png');
    expect(outputWithId.name).toBe('Joe Doe');
    expect(outputWithId.username).toBe('joeDoe');
    expect(outputWithId.password).toBe('123456789');
    expect(outputWithId.email).toBe('joedoe@hotmail.com');
    expect(outputWithId.roles).toContain(UserRoles.user);
  });

  it('should be able to edit user info', () => {
    expect(output.avatar).toBe('/avatar.png');
    expect(output.name).toBe('Joe Doe');
    expect(output.username).toBe('joeDoe');

    output.editInfoUser({
      avatar: '/new-avatar.png',
      name: 'New Joe Doe',
      username: 'newJoeDoe',
    });

    expect(output).toBeInstanceOf(UserEntity);
    expect(output.id).toBeInstanceOf(UniqueEntityId);
    expect(output.avatar).toBe('/new-avatar.png');
    expect(output.name).toBe('New Joe Doe');
    expect(output.username).toBe('newJoeDoe');
    expect(output.password).toBe('123456789');
    expect(output.email).toBe('joedoe@hotmail.com');
    expect(output.roles).toContain(UserRoles.user);
  });
});
