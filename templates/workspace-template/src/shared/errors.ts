export class WorkspaceError extends Error {
  constructor(message: string, public readonly code: string = "INTERNAL_ERROR") {
    super(message);
    this.name = "WorkspaceError";
  }
}

