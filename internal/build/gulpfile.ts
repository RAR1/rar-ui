import path from 'path'
import { copyFile, mkdir } from 'fs/promises'
import { parallel, series } from 'gulp'
import { epPackage, projRoot, rarOutput } from '@rar-ui/build-utils'
import { run, runTask, withTaskName } from './src'

export const copyFiles = () => {
  return Promise.all([
    copyFile(epPackage, path.resolve(rarOutput, 'package.json')),
    copyFile(
      path.resolve(projRoot, 'README.md'),
      path.resolve(rarOutput, 'README.md'),
    ),
    copyFile(
      path.resolve(projRoot, 'typings', 'global.d.ts'),
      path.resolve(rarOutput, 'global.d.ts'),
    ),
  ])
}

export default series(
  withTaskName('clean', () => run('pnpm run clean')),
  withTaskName('createOutput', () => mkdir(rarOutput, { recursive: true })),
  parallel(
    runTask('buildModules'),
    series(
      withTaskName('buildTheme', () => run('pnpm run -C packages/theme build')),
    ),
  ),
  parallel(copyFiles),
)

export * from './src'
