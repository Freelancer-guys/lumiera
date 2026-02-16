import { build as esbuild } from "esbuild";
import { build as viteBuild, UserConfig } from "vite";
import { rm, readFile } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = resolve(__dirname, "..");

// server deps to bundle to reduce openat(2) syscalls
// which helps cold start times
const allowlist = [
  "@google/generative-ai",
  "axios",
  "connect-pg-simple",
  "cors",
  "date-fns",
  "drizzle-orm",
  "drizzle-zod",
  "express",
  "express-rate-limit",
  "express-session",
  "jsonwebtoken",
  "memorystore",
  "multer",
  "nanoid",
  "nodemailer",
  "openai",
  "passport",
  "passport-local",
  "pg",
  "stripe",
  "uuid",
  "ws",
  "xlsx",
  "zod",
  "zod-validation-error",
];

async function buildAll() {
  // Remove old dist
  await rm(resolve(projectRoot, "dist"), { recursive: true, force: true });

  console.log("building client...");
  
  // Build Vite config inline to avoid path resolution issues
  const viteConfig: UserConfig = {
    configFile: false, // Don't auto-load config file
    root: resolve(projectRoot, "client"),
    plugins: [
      (await import("@vitejs/plugin-react")).default(),
      (await import("@tailwindcss/vite")).default(),
    ],
    resolve: {
      alias: {
        "@": resolve(projectRoot, "client", "src"),
        "@shared": resolve(projectRoot, "shared"),
        "@assets": resolve(projectRoot, "attached_assets"),
      },
    },
    css: {
      postcss: {
        plugins: [],
      },
    },
    build: {
      outDir: resolve(projectRoot, "dist/public"),
      emptyOutDir: true,
    },
  };

  await viteBuild(viteConfig);

  console.log("building server...");
  const pkg = JSON.parse(
    await readFile(resolve(projectRoot, "package.json"), "utf-8"),
  );
  const allDeps = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
  ];
  const externals = allDeps.filter((dep) => !allowlist.includes(dep));

  await esbuild({
    entryPoints: [resolve(projectRoot, "server/index.ts")],
    platform: "node",
    bundle: true,
    format: "cjs",
    outfile: resolve(projectRoot, "dist/index.cjs"),
    define: {
      "process.env.NODE_ENV": '"production"',
    },
    minify: true,
    external: externals,
    logLevel: "info",
  });
}

buildAll().catch((err) => {
  console.error(err);
  process.exit(1);
});
