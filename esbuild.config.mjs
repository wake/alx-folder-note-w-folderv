import obPlugin from "@aidenlx/esbuild-plugin-obsidian";
import { build } from "esbuild";
import { lessLoader } from "esbuild-plugin-less";

const banner = `/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source visit the plugins github repository
*/
`;

const isProd = process.env.BUILD === "production";

try {
  await build({
    entryPoints: ["src/fv-main.ts"],
    bundle: true,
    watch: !isProd,
    platform: "browser",
    external: ["obsidian"],
    format: "cjs",
    mainFields: ["browser", "module", "main"],
    banner: { js: banner },
    sourcemap: isProd ? false : "inline",
    minify: isProd,
    define: {
      "process.env.NODE_ENV": JSON.stringify(process.env.BUILD),
    },
    outfile: "build/main.js",
    plugins: [
      lessLoader({
        javascriptEnabled: true,
      }),
      obPlugin(),
    ],
  });
} catch (err) {
  console.error(err);
  process.exit(1);
}
