import { Entity } from 'src/core/domain/entity/entity';
import { UniqueEntityId } from 'src/core/domain/entity/unique-id.entity';
import { Optional } from 'src/core/logic/Optional';

export enum UserRoles {
  admin = 'admin',
  user = 'user',
}

export type UserEntityProps = {
  avatar: string;
  name: string;
  username: string;
  email: string;
  password: string;
  roles: UserRoles[];
  createdAt: Date;
  updatedAt?: Date;
};

export type EditInfoUserEntityProps = {
  avatar?: string;
  username?: string;
  name?: string;
};

export class UserEntity extends Entity<UserEntityProps> {
  get avatar() {
    return this.props.avatar;
  }

  get name() {
    return this.props.name;
  }

  get username() {
    return this.props.username;
  }

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  get roles() {
    return this.props.roles;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  public static create(props: Optional<UserEntityProps, 'createdAt' | 'roles'>, id?: UniqueEntityId) {
    const user = new UserEntity(
      {
        avatar: props.avatar,
        name: props.name,
        username: props.username,
        email: props.email,
        password: props.password,
        roles: props.roles ?? [UserRoles.user],
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );
    return user;
  }

  public editInfoUser(data: EditInfoUserEntityProps): UserEntity {
    const { avatar, name, username } = data;

    this.props.avatar = avatar ?? this.props.avatar;
    this.props.username = username ?? this.props.username;
    this.props.name = name ?? this.props.name;

    this.props.updatedAt = new Date();

    return this;
  }
}
