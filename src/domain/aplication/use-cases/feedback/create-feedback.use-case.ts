import { Injectable } from '@nestjs/common';
import { UniqueEntityId } from '@root/core/domain/entity/unique-id.entity';
import { Either, left, right } from '@root/core/logic/Either';
import { FeedbackEntity } from '@root/domain/enterprise/entities/feedback.entity';

import { FeedbackRepository } from '../../repositories/feedback.repository';
import { ProductRepository } from '../../repositories/product.repository';

type Input = {
  comment: string;
  stars: number;
  productId: UniqueEntityId;
};

type Output = Either<Error, FeedbackEntity>;

@Injectable()
export class CreateFeedbackUseCase {
  constructor(
    private readonly feedbackRepository: FeedbackRepository,
    private readonly productRepository: ProductRepository,
  ) {}

  async execute({ comment, stars, productId }: Input): Promise<Output> {
    const productExists = await this.productRepository.findProductById({
      id: productId,
    });

    if (!productExists) {
      return left(new Error('Product not found'));
    }

    const feedback = FeedbackEntity.create({
      comment,
      stars,
      productId: productId,
    });

    const newFeedback = await this.feedbackRepository.create({
      feedback,
    });

    return right(newFeedback);
  }
}
