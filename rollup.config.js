import typescript from 'rollup-plugin-typescript2';
import dts from 'rollup-plugin-dts';
import postcss from 'rollup-plugin-postcss';

// externals
const external = [
  "@fullstackcraftllc/codevideo-types",
  "@fullstackcraftllc/codevideo-virtual-ide",
  "marked",
  "marked-highlight",
  "highlight.js"
];

export default [
  // standard package
  {
    input: "src/index.ts",
    output: {
      file: "dist/index.js",
      format: "es",
    },
    plugins: [
      postcss({
        extract: false,
        modules: false,
        inject: false,
        minimize: true
      }),
      typescript(),
    ],
    external,
  },
  // type declarations
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/index.d.ts",
        format: "es",
      },
    ],
    plugins: [
      dts(),
    ],
    external,
  },
];

