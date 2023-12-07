import { HashGenerator } from '@root/domain/aplication/cryptography/hash-generator';

export class FakeHashGenerator implements HashGenerator {
  async hash(plain: string): Promise<string> {
    return plain.concat('-hashed');
  }

  async compare(plain: string, hashed: string): Promise<boolean> {
    return plain.concat('-hashed') === hashed;
  }
}
