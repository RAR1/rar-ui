import { rollup } from "rollup";
import { series } from "gulp";
import { resolve } from "path";
import Vue from '@vitejs/plugin-vue'
import VueMacros from 'vue-macros/vite'
import glob from 'fast-glob'
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import esbuild from 'rollup-plugin-esbuild';
import { compRoot, testRoot } from "@test-ui/build-utils";
import { withTaskName, writeBundles } from '../utils'
import type { OutputOptions } from "rollup";
import type { TaskFunction } from 'gulp'

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
    exports: 'named',
    format: "cjs",
    preserveModules: true,
    sourcemap: false,
  },
];

async function buildModulesComponents() {
    const input = await glob('**/*.{js,ts,vue}', {
        cwd: compRoot,
        absolute: true,
        onlyFiles: true
    })
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

    await writeBundles(bundle, outputOptions);
}

export const buildModules: TaskFunction = series(
  withTaskName('buildModulesComponents', buildModulesComponents)
) 