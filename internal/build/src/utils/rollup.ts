import type { RollupBuild, OutputOptions } from 'rollup';
export function writeBundles(bundle: RollupBuild, options: OutputOptions[] ) {
    return Promise.all(options.map((option) => bundle.write(option)))
}