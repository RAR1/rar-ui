import { resolve } from 'path';

export const projRoot = resolve(__dirname, '..', '..', '..');
export const pkgRoot = resolve(projRoot, 'packages');
export const compRoot = resolve(pkgRoot, 'components');
export const ttRoot = resolve(pkgRoot, 'test-ui');
export const testRoot = resolve(projRoot, 'dist', 'test-ui');