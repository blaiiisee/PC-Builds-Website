import { readFileSync, readdirSync } from "node:fs";
import { dirname, extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, normalizePath, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

const virtualModuleId = "virtual:build-recommendations";
const resolvedVirtualModuleId = `\0${virtualModuleId}`;
const projectRoot = dirname(fileURLToPath(import.meta.url));
const buildsDirectory = resolve(projectRoot, "public/builds");

function loadBuildFiles() {
  return readdirSync(buildsDirectory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && extname(entry.name) === ".json")
    .sort((left, right) => left.name.localeCompare(right.name))
    .map((entry) => {
      const filePath = resolve(buildsDirectory, entry.name);

      try {
        return {
          fileName: entry.name,
          data: JSON.parse(readFileSync(filePath, "utf8")) as unknown,
        };
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        throw new Error(`Could not parse ${entry.name}: ${message}`);
      }
    });
}

function buildRecommendationsPlugin(): Plugin {
  return {
    name: "build-recommendations",
    resolveId(id) {
      return id === virtualModuleId ? resolvedVirtualModuleId : undefined;
    },
    load(id) {
      if (id !== resolvedVirtualModuleId) return undefined;
      return `export default ${JSON.stringify(loadBuildFiles())};`;
    },
    configureServer(server) {
      const normalizedBuildsDirectory = `${normalizePath(buildsDirectory)}/`;
      server.watcher.add(buildsDirectory);
      server.watcher.on("all", (_event, filePath) => {
        const normalizedFilePath = normalizePath(filePath);
        if (
          !normalizedFilePath.startsWith(normalizedBuildsDirectory) ||
          extname(normalizedFilePath) !== ".json"
        ) {
          return;
        }

        const module = server.moduleGraph.getModuleById(resolvedVirtualModuleId);
        if (module) server.moduleGraph.invalidateModule(module);
        server.ws.send({ type: "full-reload" });
      });
    },
  };
}

export default defineConfig({
  plugins: [buildRecommendationsPlugin(), react()],
});
