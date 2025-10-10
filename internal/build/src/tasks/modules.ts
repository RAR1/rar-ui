import { resolve } from 'path'
import { rollup } from 'rollup'
import { series } from 'gulp'
import Vue from '@vitejs/plugin-vue'
import VueMacros from 'vue-macros/vite'
import glob from 'fast-glob'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import esbuild from 'rollup-plugin-esbuild'
import { excludeFiles, pkgRoot, rarOutput, rarRoot } from '@rar-ui/build-utils'
import { generateExternal, withTaskName, writeBundles } from '../utils'
import type { OutputOptions } from 'rollup'
import type { TaskFunction } from 'gulp'

const outputOptions: OutputOptions[] = [
  {
    format: 'esm',
    dir: resolve(rarOutput, 'es'),
    entryFileNames: `[name].mjs`,
    exports: undefined,
    preserveModules: true,
    preserveModulesRoot: rarRoot,
    sourcemap: false,
  },
  {
    format: 'cjs',
    dir: resolve(rarOutput, 'lib'),
    entryFileNames: `[name].js`,
    exports: 'named',
    preserveModules: true,
    preserveModulesRoot: rarRoot,
    sourcemap: false,
  },
]

async function buildModulesComponents() {
  const input = excludeFiles(
    await glob('**/*.{js,ts,vue}', {
      cwd: pkgRoot,
      absolute: true,
      onlyFiles: true,
    }),
  )
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
                cacheHandlers: false,
              },
            },
          }),
        },
      }),
      nodeResolve({
        extensions: ['.mjs', '.js', '.json', '.ts'],
      }),
      commonjs(),
      esbuild({
        target: 'es2018',
        sourceMap: true,
        loaders: {
          '.vue': 'ts',
        },
      }),
    ],
    external: await generateExternal({ full: false }),
    treeshake: { moduleSideEffects: false },
  })

  await writeBundles(bundle, outputOptions)
}

export const buildModules: TaskFunction = series(
  withTaskName('buildModulesComponents', buildModulesComponents),
)
