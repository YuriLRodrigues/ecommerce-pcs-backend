import { createSlug } from './create-slug';

describe('Create Slug - Utils', () => {
  it('should be able to create a slug', () => {
    const slug = createSlug('Fortemente 123$');
    expect(slug).toBe('fortemente-123');
  });
});
