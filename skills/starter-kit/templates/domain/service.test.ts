import { DomainService } from "./service";

describe("DomainService", () => {
  it("should execute successfully", async () => {
    const service = new DomainService();
    const result = await service.execute("test");
    expect(result.name).toBe("test");
  });
});
