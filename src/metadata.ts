/* eslint-disable */
export default async () => {
    const t = {};
    return { "@nestjs/swagger": { "models": [[import("./core/domain/entity/unique-id.entity"), { "UniqueEntityId": { value: { required: true, type: () => String } } }], [import("./domain/enterprise/entities/user.entity"), { "UserEntity": {} }]], "controllers": [[import("./app.controller"), { "AppController": { "getHello": { type: String } } }]] } };
};