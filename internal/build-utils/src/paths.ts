import { resolve } from 'path';

export const projRoot = resolve(__dirname, '..', '..', '..');
export const pkgRoot = resolve(projRoot, 'packages');
export const compRoot = resolve(pkgRoot, 'components');
export const rarRoot = resolve(pkgRoot, 'rar-ui');
export const buildRoot = resolve(projRoot, 'internal', 'build');

export const buildOutput = resolve(projRoot, 'dist');
export const rarOutput = resolve(buildOutput, 'rar-ui')

export const epPackage = resolve(rarRoot, 'package.json');