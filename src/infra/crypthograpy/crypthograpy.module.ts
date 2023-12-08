import { Module } from '@nestjs/common';
import { HashGenerator } from '@root/domain/aplication/cryptography/hash-generator';
import { Bcrypt } from './bcrypt';
import { Encrypter } from '@root/domain/aplication/cryptography/encrypter';
import { JwtEncrypter } from './jwt-encrypter';

@Module({
  providers: [
    {
      provide: Encrypter,
      useClass: JwtEncrypter,
    },
    {
      provide: HashGenerator,
      useClass: Bcrypt,
    },
  ],
  exports: [HashGenerator, Encrypter],
})
export class CrypthograpyModule {}
