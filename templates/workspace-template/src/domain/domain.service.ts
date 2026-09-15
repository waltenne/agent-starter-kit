import { DomainEntity } from "./domain.types";
import { logger } from "../shared/logger";

export class DomainService {
  async processEntity(name: string): Promise<DomainEntity> {
    logger.info(`Processing domain entity: ${name}`);
    return {
      id: "entity-1",
      name,
      createdAt: new Date(),
    };
  }
}

