import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import commonjs from "@rollup/plugin-commonjs";

export default [
  {
    input: "src/index.ts",
    output: { file: "lib/index.js" },
    plugins: [typescript(), nodeResolve(), commonjs()],
    external: ["react", "react/jsx-runtime"],
    onwarn(warning, warn) {
      if (
        warning.code === "MODULE_LEVEL_DIRECTIVE" &&
        warning.message.includes(`"use client"`)
      ) {
        return;
      }
      warn(warning);
    },
  },
  {
    input: "lib/types/index.d.ts",
    output: [{ file: "lib/index.d.ts" }],
    plugins: [dts()],
  },
];
