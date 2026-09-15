export interface WorkspaceConfig {
  workspaceName: string;
  environment: string;
}

export const defaultConfig: WorkspaceConfig = {
  workspaceName: process.env.WORKSPACE_NAME || "<workspace-name>",
  environment: process.env.NODE_ENV || "development",
};

