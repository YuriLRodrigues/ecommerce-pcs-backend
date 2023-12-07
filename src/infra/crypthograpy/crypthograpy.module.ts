import { Module } from '@nestjs/common';
import { HashGenerator } from '@root/domain/aplication/cryptography/hash-generator';
import { Bcrypt } from './bcrypt';

@Module({
  providers: [
    {
      provide: HashGenerator,
      useClass: Bcrypt,
    },
  ],
  exports: [HashGenerator],
})
export class CrypthograpyModule {}
