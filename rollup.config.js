import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import { terser } from "rollup-plugin-terser";
import typescript from "rollup-plugin-typescript2";

const packageJson = require("./package.json");

const inputFile = "src/index.tsx";

const external = ["react", "@lupa/lupa", "react-table"];

const globals = {
  react: "React",
  "@lupa/lupa": "Lupa",
  "react-table": "ReactTable",
};

const modules = [
  {
    input: inputFile,
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    external,
    plugins: [
      resolve(),
      commonjs(),
      typescript({ useTsconfigDeclarationDir: true }),
    ],
  },
];

const umds = [
  {
    input: inputFile,
    output: {
      file: packageJson.unpkg.replace("production.min", "development"),
      format: "umd",
      sourcemap: true,
      globals,
      name: "LupaTable",
    },
    external,
    plugins: [
      typescript({ useTsconfigDeclarationDir: true }),
      resolve(),
      commonjs(),
      replace({ "process.env.NODE_ENV": JSON.stringify("development") }),
    ],
  },
  {
    input: inputFile,
    output: {
      file: packageJson.unpkg,
      format: "umd",
      sourcemap: true,
      globals,
      name: "LupaTable",
    },
    external,
    plugins: [
      typescript({ useTsconfigDeclarationDir: true }),
      resolve(),
      commonjs(),
      replace({ "process.env.NODE_ENV": JSON.stringify("production") }),
      terser(),
    ],
  },
];

export default [...modules, ...umds];
