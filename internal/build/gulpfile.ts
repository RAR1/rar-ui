import { series } from 'gulp'
import { build } from './src'

export default series(build);

export * from './src'