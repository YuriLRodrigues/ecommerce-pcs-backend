import { UniqueEntityId } from '@root/core/domain/entity/unique-id.entity';
import { Either, left, right } from '@root/core/logic/Either';
import { FeedbackEntity } from '@root/domain/enterprise/entities/feedback.entity';

import { FeedbackRepository } from '../../repositories/feedback.repository';
import { ProductRepository } from '../../repositories/product.repository';

type Input = {
  productId: UniqueEntityId;
};

type Output = Either<Error, FeedbackEntity[]>;

export class FindManyByProductIdUseCase {
  constructor(
    private readonly feedbackRepository: FeedbackRepository,
    private readonly productRepository: ProductRepository,
  ) {}

  async execute({ productId }: Input): Promise<Output> {
    const productExists = await this.productRepository.findProductById({
      id: productId,
    });

    if (!productExists) {
      return left(new Error('Product not found'));
    }

    const feedbacks = await this.feedbackRepository.findManyByProductId({
      productId,
    });

    if (feedbacks.length === 0) {
      return left(new Error('This product has no reviews'));
    }

    return right(feedbacks);
  }
}
