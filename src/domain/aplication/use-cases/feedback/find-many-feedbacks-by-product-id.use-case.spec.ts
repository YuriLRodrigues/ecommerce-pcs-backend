import { UniqueEntityId } from '@root/core/domain/entity/unique-id.entity';
import { FeedbackEntity } from '@root/domain/enterprise/entities/feedback.entity';
import { ProductEntity } from '@root/domain/enterprise/entities/product.entity';
import { InMemoryFeedbackRepository } from 'test/repositories/in-memory-feedback.repository';
import { InMemoryProductRepository } from 'test/repositories/in-memory-product.repository';

import { FindManyByProductIdUseCase } from './find-many-feedbacks-by-product-id.use-case';

describe('Find Many Feedbacks By ProductId - Use Case', () => {
  let inMemoryFeedbackRepository: InMemoryFeedbackRepository;
  let inMemoryProductRepository: InMemoryProductRepository;
  let sut: FindManyByProductIdUseCase;
  let product: ProductEntity;
  let feedback: FeedbackEntity;

  beforeEach(() => {
    inMemoryFeedbackRepository = new InMemoryFeedbackRepository();
    inMemoryProductRepository = new InMemoryProductRepository();
    sut = new FindManyByProductIdUseCase(inMemoryFeedbackRepository, inMemoryProductRepository);

    product = ProductEntity.create({
      name: 'Product Test',
      description: 'Product test description',
      price: 100,
    });
    inMemoryProductRepository.register({
      product,
    });

    feedback = FeedbackEntity.create({
      comment: 'feedback test comment',
      stars: 2,
      productId: product.id,
    });
    inMemoryFeedbackRepository.create({
      feedback,
    });
  });

  it('should not be able to delete an feedback with invalid feedbackId', async () => {
    const output = await sut.execute({
      productId: new UniqueEntityId('invalid-product-id'),
    });

    expect(output.isLeft()).toBe(true);
    expect(output.value).toEqual(new Error(`Product not found`));
  });

  it('should be able to create an feedback', async () => {
    const output = await sut.execute({
      productId: product.id,
    });

    expect(output.isRight()).toBe(true);
    expect(output.value).toHaveLength(0);
  });
});
