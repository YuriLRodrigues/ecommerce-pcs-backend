import { UniqueEntityId } from '@root/core/domain/entity/unique-id.entity';

import { FeedbackEntity } from './feedback.entity';

describe('Feedback - Entity', () => {
  it('should be able to create an feedback with comment and stars rating', () => {
    const feedback = FeedbackEntity.create({
      comment: 'test comment',
      stars: 4,
    });

    expect(feedback.id).toBeInstanceOf(UniqueEntityId);
    expect(feedback.comment).toEqual('test comment');
    expect(feedback.stars).toEqual(4);
    expect(feedback.createdAt).toBeInstanceOf(Date);
  });
  it('should be able to edit an exists feedback', () => {
    const feedback = FeedbackEntity.create({
      comment: 'test comment',
      stars: 4,
    });

    feedback.editInfo({
      comment: 'new comment',
      stars: 3,
    });

    expect(feedback.comment).toEqual('new comment');
    expect(feedback.stars).toEqual(3);
    expect(feedback.updatedAt).toBeInstanceOf(Date);
  });
});
