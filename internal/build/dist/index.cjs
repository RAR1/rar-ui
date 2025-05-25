'use strict';

const rollup = require('rollup');
const path = require('path');
const Vue = require('@vitejs/plugin-vue');
const VueMacros = require('vue-macros/vite');
const glob = require('fast-glob');
const pluginNodeResolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const esbuild = require('rollup-plugin-esbuild');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e.default : e; }

const Vue__default = /*#__PURE__*/_interopDefaultCompat(Vue);
const VueMacros__default = /*#__PURE__*/_interopDefaultCompat(VueMacros);
const glob__default = /*#__PURE__*/_interopDefaultCompat(glob);
const commonjs__default = /*#__PURE__*/_interopDefaultCompat(commonjs);
const esbuild__default = /*#__PURE__*/_interopDefaultCompat(esbuild);

const projRoot = path.resolve(__dirname, "..", "..", "..");
const pkgRoot = path.resolve(projRoot, "packages");
const compRoot = path.resolve(pkgRoot, "components");
path.resolve(pkgRoot, "test-ui");
const testRoot = path.resolve(projRoot, "dist", "test-ui");

const outputOptions = [
  {
    dir: path.resolve(testRoot, "es"),
    entryFileNames: `[name].mjs`,
    exports: void 0,
    format: "esm",
    preserveModules: true,
    sourcemap: false
  },
  {
    dir: path.resolve(testRoot, "lib"),
    entryFileNames: `[name].js`,
    exports: void 0,
    format: "cjs",
    preserveModules: true,
    sourcemap: false
  }
];
const build = async () => {
  const input = await glob__default("**/*.{js,ts,vue}", {
    cwd: compRoot,
    absolute: true,
    onlyFiles: true
  });
  console.log("input", input);
  const bundle = await rollup.rollup({
    input,
    plugins: [
      VueMacros__default({
        setupComponent: false,
        setupSFC: false,
        plugins: {
          vue: Vue__default({
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
      pluginNodeResolve.nodeResolve({
        extensions: [".mjs", ".js", ".json", ".ts"]
      }),
      commonjs__default(),
      esbuild__default({
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

exports.build = build;
exports.test = test;
