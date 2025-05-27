import { series, parallel } from 'gulp'
import { withTaskName, run, runTask } from './src';
import { mkdir } from 'fs/promises';
import { testRoot } from '@test-ui/build-utils'

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
    )
)

export * from './src'