import { Data } from "@/napl";
import { Component } from "../app/components/Component";
import { Hook, workspace } from "./Workspace";

//  WorkspaceConfig
export type WorkspaceConfig =
  | {
      name: string;
      config?: Record<string, Data>;
      children?: WorkspaceConfig[];
    }
  | [string, Record<string, Data>, WorkspaceConfig[]]
  | [string, Record<string, Data>]
  | [string];

export class Registry {
  private context: Record<string, any> = {};
  constructor(private componentMap: Record<string, Component<any, any>>) {}

  private injectDependencies(
    config: Record<string, Data>,
    context: Record<string, any>,
  ) {
    const dependencies: Record<string, any> = {};
    Object.entries(config).forEach(([key, value]) => {
      if (typeof value === "string" && value.startsWith("~")) {
        const id = value.slice(1);
        dependencies[key] = context[id.length ? id : key];
      } else {
        dependencies[key] = value;
      }
    });
    return dependencies;
  }

  private configureHook(
    config: WorkspaceConfig,
    hook: Hook,
    parentContext: Record<string, any>,
  ): ReturnType<Hook> {
    if (Array.isArray(config)) {
      if (!config[0]) {
        console.error("Invalid config", config);
      }
      return this.configureHook(
        {
          name: config[0],
          config: config[1] ?? undefined,
          children: config[2] ?? undefined,
        },
        hook,
        parentContext,
      );
    }
    if (!this.componentMap[config.name]) {
      console.error("Component does not exist:", config.name, config);
    }

    const hookChildren = config.children?.length
      ? (params: Record<string, any>) => {
          const context: Record<string, any> = { ...parentContext, ...params };
          config.children?.forEach((childConfig) => {
            const result = this.configureHook(childConfig, hook, context);
            Object.entries(result).forEach(([key, value]) => {
              context[key] = value;
            });
          });
        }
      : undefined;
    return hook(
      this.componentMap[config.name],
      this.injectDependencies(config.config ?? {}, parentContext),
      hookChildren,
    );
  }

  configureWorkspace(config: { workspaces: { configs: WorkspaceConfig[] }[] }) {
    console.log(
      "Configure workspace",
      JSON.parse(JSON.stringify(config, null, " ")),
    );
    const workspaceHook = ({ hook }: { hook: Hook }) => {
      const context = { ...this.context };
      config.workspaces?.forEach(({ configs }) =>
        configs?.forEach((config) => {
          const result = this.configureHook(config, hook, context);
          Object.entries(result).forEach(([key, value]) => {
            context[key] = value;
          });
        }),
      );
    };
    workspace(workspaceHook);
  }

  withContext(context: Record<string, any>) {
    Object.entries(context).forEach(([name, value]) => {
      this.context[name] = value;
    });
    return this;
  }
}
