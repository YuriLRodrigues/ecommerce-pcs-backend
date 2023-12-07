import { HashGenerator } from '@root/domain/aplication/cryptography/hash-generator';
import { compare, hash } from 'bcryptjs';

export class Bcrypt implements HashGenerator {
  private SALT_HASHED = 8;

  hash(plain: string): Promise<string> {
    return hash(plain, this.SALT_HASHED);
  }

  async compare(plain: string, hashed: string): Promise<boolean> {
    return await compare(plain, hashed);
  }
}
