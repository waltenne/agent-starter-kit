import { DomainEntity } from "./types";

export class DomainService {
  async execute(name: string): Promise<DomainEntity> {
    return {
      id: "1",
      name,
      createdAt: new Date(),
    };
  }
}

