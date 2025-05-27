import { rollup } from "rollup";
import { resolve } from "path";
import Vue from '@vitejs/plugin-vue'
import VueMacros from 'vue-macros/vite'
import glob from 'fast-glob'
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import esbuild from 'rollup-plugin-esbuild';
import { compRoot, testRoot } from "@test-ui/build-utils";
import type { OutputOptions } from "rollup";

const outputOptions: OutputOptions[] = [
  {
    dir: resolve(testRoot, "es"),
    entryFileNames: `[name].mjs`,
    exports: 'named',
    format: "esm",
    preserveModules: true,
    sourcemap: false,
  },
  {
    dir: resolve(testRoot, "lib"),
    entryFileNames: `[name].js`,
    exports: undefined,
    format: "cjs",
    preserveModules: true,
    sourcemap: false,
  },
];

const buildModules = async () => {
    const input = await glob('**/*.{js,ts,vue}', {
        cwd: compRoot,
        absolute: true,
        onlyFiles: true
    })
    console.log('input', input)
    const bundle = await rollup({
      input: input,
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
            }),
          },
        }),
        nodeResolve({
          extensions: [".mjs", ".js", ".json", ".ts"],
        }),
        commonjs(),
        esbuild({
          target: 'es2018',
          sourceMap: true,
          loaders: {
            '.vue': 'ts',
          }
        })
      ],
    });
    for(let option of outputOptions) {
        await bundle.write(option);
    }
    if(bundle) {
        await bundle.close();
    }
}

export {
    buildModules,
};