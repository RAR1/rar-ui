import path from 'path'
import { series, parallel } from 'gulp'
import { copyFile } from 'fs/promises';
import { withTaskName, run, runTask } from './src';
import { mkdir } from 'fs/promises';
import { testRoot, epPackage, ttOutput, projRoot } from '@test-ui/build-utils'

export const copyFiles = () => {
   return Promise.all([
    copyFile(epPackage, path.resolve(ttOutput, 'package.json')),
    copyFile(
        path.resolve(projRoot, 'README.md'),
        path.resolve(ttOutput, 'README.md')
    ),
    copyFile(
        path.resolve(projRoot, 'typings', 'global.d.ts'),
        path.resolve(ttOutput, 'global.d.ts')
    )
   ]) 
}


export default series(
    withTaskName('clean', () => run('pnpm run clean')),
    withTaskName('createOutput', () => mkdir(testRoot, { recursive: true })),
    parallel(
        runTask('buildModules'),
        series(
            withTaskName('buildTheme', () =>
                run('pnpm run -C packages/theme build')
            )
        )
    ),
    parallel(copyFiles),
)

export * from './src'