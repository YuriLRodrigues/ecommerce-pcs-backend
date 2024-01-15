import { UniqueEntityId } from '@root/core/domain/entity/unique-id.entity';
import { ProductEntity } from '@root/domain/enterprise/entities/product.entity';
import { InMemoryFeedbackRepository } from 'test/repositories/in-memory-feedback.repository';
import { InMemoryProductRepository } from 'test/repositories/in-memory-product.repository';

import { CreateFeedbackUseCase } from './create-feedback.use-case';

describe('Create Feedback - Use Case', () => {
  let inMemoryFeedbackRepository: InMemoryFeedbackRepository;
  let inMemoryProductRepository: InMemoryProductRepository;
  let sut: CreateFeedbackUseCase;
  let product: ProductEntity;

  beforeEach(() => {
    inMemoryFeedbackRepository = new InMemoryFeedbackRepository();
    inMemoryProductRepository = new InMemoryProductRepository();
    sut = new CreateFeedbackUseCase(inMemoryFeedbackRepository, inMemoryProductRepository);
    product = ProductEntity.create({
      name: 'Product Test',
      description: 'Product test description',
      price: 100,
    });
    inMemoryProductRepository.register({
      product,
    });
  });

  it('should not be able to create an feedback with invalid productId', async () => {
    const output = await sut.execute({
      comment: 'feedback test comment',
      stars: 2,
      productId: new UniqueEntityId('invalid-id'),
    });

    const commentsByProductId = await inMemoryFeedbackRepository.findManyByProductId({
      productId: product.id,
    });

    expect(output.isLeft()).toBe(true);
    expect(output.value).toEqual(new Error(`Product not found`));
    expect(commentsByProductId).toHaveLength(0);
    expect(inMemoryFeedbackRepository.feedbacks).toHaveLength(0);
  });

  it('should be able to create an feedback', async () => {
    const output = await sut.execute({
      comment: 'feedback test comment',
      stars: 2,
      productId: product.id,
    });

    const commentsByProductId = await inMemoryFeedbackRepository.findManyByProductId({
      productId: product.id,
    });

    expect(output.isRight()).toBe(true);
    expect(commentsByProductId).toHaveLength(1);
    expect(inMemoryFeedbackRepository.feedbacks).toHaveLength(1);
  });
});
