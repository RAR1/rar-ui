'use strict';

const path = require('path');

const projRoot = path.resolve(__dirname, "..", "..", "..");
const pkgRoot = path.resolve(projRoot, "packages");
const compRoot = path.resolve(pkgRoot, "components");
const ttRoot = path.resolve(pkgRoot, "test-ui");
const testRoot = path.resolve(projRoot, "dist", "test-ui");

exports.compRoot = compRoot;
exports.pkgRoot = pkgRoot;
exports.projRoot = projRoot;
exports.testRoot = testRoot;
exports.ttRoot = ttRoot;
