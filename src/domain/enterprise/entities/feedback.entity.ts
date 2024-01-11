import { Entity } from '@root/core/domain/entity/entity';
import { UniqueEntityId } from '@root/core/domain/entity/unique-id.entity';
import { Optional } from '@root/core/logic/Optional';

type FedbackEntityProps = {
  comment: string;
  stars: number;
  productId: UniqueEntityId;
  createdAt: Date;
  updatedAt?: Date;
};

type EditInfoFeedback = {
  comment?: string;
  stars?: number;
  productId?: UniqueEntityId;
};

export class FeedbackEntity extends Entity<FedbackEntityProps> {
  get comment() {
    return this.props.comment;
  }

  get stars() {
    return this.props.stars;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  public static create(props: Optional<FedbackEntityProps, 'createdAt'>, id?: UniqueEntityId) {
    return new FeedbackEntity(
      {
        comment: props.comment,
        stars: props.stars,
        productId: props.productId,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );
  }

  public editInfo(props: EditInfoFeedback) {
    this.props.comment = props.comment ?? this.props.comment;
    this.props.stars = props.stars ?? this.props.stars;
    this.props.productId = props.productId ?? this.props.productId;
    this.props.updatedAt = new Date();
  }
}
