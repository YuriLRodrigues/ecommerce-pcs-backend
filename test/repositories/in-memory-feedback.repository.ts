import {
  CreateProps,
  DeleteProps,
  FeedbackRepository,
  FindByIdProps,
  FindManyByProductIdProps,
  SaveProps,
} from '@root/domain/aplication/repositories/feedback.repository';
import { FeedbackEntity } from '@root/domain/enterprise/entities/feedback.entity';

export class InMemoryFeedbackRepository implements FeedbackRepository {
  public feedbacks: FeedbackEntity[] = [];

  async create({ feedback }: CreateProps): Promise<FeedbackEntity> {
    this.feedbacks.push(feedback);

    return feedback;
  }

  async findById({ feedbackId }: FindByIdProps): Promise<FeedbackEntity> {
    const feedback = await this.feedbacks.find((fb) => feedbackId === fb.id);

    return feedback ?? null;
  }

  async findManyByProductId({ productId }: FindManyByProductIdProps): Promise<FeedbackEntity[]> {
    const feedbacksByProductId = await this.feedbacks.filter((fb) => fb.productId === productId);

    return feedbacksByProductId;
  }

  async save({ feedback }: SaveProps): Promise<void> {
    const index = this.feedbacks.findIndex((fb) => fb.id === feedback.id);
    this.feedbacks[index] = feedback;

    return;
  }

  async delete({ feedbackId }: DeleteProps): Promise<void> {
    this.feedbacks = this.feedbacks.filter((fb) => fb.id !== feedbackId);
  }
}
