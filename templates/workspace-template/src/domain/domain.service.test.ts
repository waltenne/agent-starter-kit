import { DomainService } from "./domain.service";

describe("DomainService", () => {
  it("should process entity correctly", async () => {
    const service = new DomainService();
    const result = await service.processEntity("Test Entity");
    expect(result.name).toBe("Test Entity");
    expect(result.id).toBeDefined();
  });
});

