import { RegistryConfig } from "@/model/RegistryConfig";
import { Component } from "./Component";

export type Components = Record<string, Component>;

const SAVED_MODULES: Record<string, any> = {};

export async function importAndRegister({ name, modulePath }: RegistryConfig, components: Components) {
  try {
    const module = SAVED_MODULES[modulePath] ?? (SAVED_MODULES[modulePath] = await import(modulePath));
    const component = module[name] ?? module.default as Component;
    components[name] = component;
  } catch (error) {
    console.error(`Failed to import module ${modulePath}:`, error);
  }
}
