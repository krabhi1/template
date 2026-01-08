// tsup.config.ts
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/**/*.ts", "!src/**/*.test.ts", "!src/**/*.spec.ts"],
  outDir: "dist",
  format: ["esm"],
  dts: false,
  target: "node22",
  sourcemap: false,
  clean: true,
  bundle: true,
  skipNodeModulesBundle: true,
});
