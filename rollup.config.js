import typescript from 'rollup-plugin-typescript2';
import dts from 'rollup-plugin-dts';

// externals
const external = [
  "@fullstackcraftllc/codevideo-types",
  "@fullstackcraftllc/codevideo-virtual-ide",
];

export default [
  // standard package
  {
    input: "src/index.ts",
    output: {
      file: "dist/index.js",
      format: "es",
    },
    plugins: [typescript()],
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

