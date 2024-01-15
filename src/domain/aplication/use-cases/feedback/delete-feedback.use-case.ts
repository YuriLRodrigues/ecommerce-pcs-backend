import { UniqueEntityId } from '@root/core/domain/entity/unique-id.entity';
import { Either, left, right } from '@root/core/logic/Either';

import { FeedbackRepository } from '../../repositories/feedback.repository';

type Input = {
  feedbackId: UniqueEntityId;
};

type Output = Either<Error, void>;

export class DeleteFeedbackUseCase {
  constructor(private readonly feedbackRepository: FeedbackRepository) {}

  async execute({ feedbackId }: Input): Promise<Output> {
    const feedbackExists = await this.feedbackRepository.findById({
      feedbackId,
    });

    if (!feedbackExists) {
      return left(new Error(`This feedback doesn't exist`));
    }

    await this.feedbackRepository.delete({
      feedbackId,
    });

    return right(null);
  }
}
