import { resolve } from 'path';

const projRoot = resolve(__dirname, "..", "..", "..");
const pkgRoot = resolve(projRoot, "packages");
const compRoot = resolve(pkgRoot, "components");
const testRoot = resolve(projRoot, "dist", "test-ui");

export { compRoot, pkgRoot, projRoot, testRoot };
