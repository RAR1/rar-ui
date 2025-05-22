import { resolve } from 'path';

const projRoot = resolve(__dirname, "..", "..", "..");
const pkgRoot = resolve(projRoot, "packages");
const compRoot = resolve(pkgRoot, "components");
const ttRoot = resolve(pkgRoot, "test-ui");
const testRoot = resolve(projRoot, "dist", "test-ui");

export { compRoot, pkgRoot, projRoot, testRoot, ttRoot };
