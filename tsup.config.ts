import { defineConfig } from "tsup";
// import copy from "esbuild-copy-files-plugin";
// import { umdWrapper } from "esbuild-plugin-umd-wrapper";

export default defineConfig([
	{
		entry: ["src/index.tsx"],
		format: ["esm", "cjs"],
		dts: true,
		splitting: false,
		sourcemap: true,
		clean: true,
		treeshake: true,
		minify: true
	},
]);
