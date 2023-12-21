import { Entity } from '@root/core/domain/entity/entity';
import { UniqueEntityId } from '@root/core/domain/entity/unique-id.entity';
import { Optional } from '@root/core/logic/Optional';
import { createSlug } from '@root/utils/create-slug';

export type CategoryEntityProps = {
  name: string;
  slug: string;
  createdAt: Date;
};

export class CategoryEntity extends Entity<CategoryEntityProps> {
  get name() {
    return this.props.name;
  }
  get slug() {
    return this.props.slug;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  public static create(props: Optional<CategoryEntityProps, 'createdAt' | 'slug'>, id?: UniqueEntityId) {
    const category = new CategoryEntity(
      {
        createdAt: props.createdAt ?? new Date(),
        name: props.name,
        slug: props.slug ?? createSlug(props.name),
      },
      id,
    );

    return category;
  }
}
