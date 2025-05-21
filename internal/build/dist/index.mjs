import { rollup } from 'rollup';
import { resolve } from 'path';
import Vue from '@vitejs/plugin-vue';
import VueMacros from 'vue-macros/vite';
import glob from 'fast-glob';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import esbuild from 'rollup-plugin-esbuild';
import { testRoot, compRoot } from '@ui-test/build-utils';

const outputOptions = [
  {
    dir: resolve(testRoot, "es"),
    entryFileNames: `[name].mjs`,
    exports: void 0,
    format: "esm",
    preserveModules: true,
    sourcemap: false
  },
  {
    dir: resolve(testRoot, "lib"),
    entryFileNames: `[name].js`,
    exports: void 0,
    format: "cjs",
    preserveModules: true,
    sourcemap: false
  }
];
const build = async () => {
  const input = await glob("**/*.{js,ts,vue}", {
    cwd: compRoot,
    absolute: true,
    onlyFiles: true
  });
  console.log("input", input);
  const bundle = await rollup({
    input,
    plugins: [
      VueMacros({
        setupComponent: false,
        setupSFC: false,
        plugins: {
          vue: Vue({
            isProduction: true,
            template: {
              compilerOptions: {
                hoistStatic: false,
                cacheHandlers: false
              }
            }
          })
        }
      }),
      nodeResolve({
        extensions: [".mjs", ".js", ".json", ".ts"]
      }),
      commonjs(),
      esbuild({
        target: "es2018",
        sourceMap: true,
        loaders: {
          ".vue": "ts"
        }
      })
    ]
  });
  for (let option of outputOptions) {
    await bundle.write(option);
  }
  if (bundle) {
    await bundle.close();
  }
};
const test = async () => {
  console.log("test");
};

export { build, test };
