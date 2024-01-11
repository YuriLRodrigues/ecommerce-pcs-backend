import { Entity } from '@root/core/domain/entity/entity';
import { UniqueEntityId } from '@root/core/domain/entity/unique-id.entity';
import { Optional } from '@root/core/logic/Optional';
import { createSlug } from '@root/utils/create-slug';

type CategoryDetailsProps = {
  image: {
    url: string;
    id: UniqueEntityId;
  };
  name: string;
  slug: string;
};

export class CategoryDetailsEntity extends Entity<CategoryDetailsProps> {
  get image() {
    return this.props.image;
  }

  get name() {
    return this.props.name;
  }

  get slug() {
    return this.props.slug;
  }

  public static create(props: Optional<CategoryDetailsProps, 'slug'>, id?: UniqueEntityId) {
    const image = new CategoryDetailsEntity(
      {
        name: props.name,
        slug: props.slug ?? createSlug(props.name),
        image: props.image,
      },
      id,
    );

    return image;
  }
}
