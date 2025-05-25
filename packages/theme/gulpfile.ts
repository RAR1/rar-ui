import { resolve } from 'path'
import { src, dest, parallel, series } from 'gulp'
import gulpSass from 'gulp-sass'
import dartSass from 'sass'
import autoprefixer from 'gulp-autoprefixer'
import rename from 'gulp-rename'
import { testRoot } from '@test-ui/build-utils'

const distFolder = resolve(__dirname, 'dist');
const distBundle = resolve(testRoot, 'theme');

function buildThemeChalk() {
    const sass = gulpSass(dartSass);
    const noElPrefixFile = /(index|base|display)/
    return src(resolve(__dirname, 'src/**/*.scss'))
    .pipe(sass.sync())
    .pipe(autoprefixer({ cascade: false }))
    .pipe(rename((path) => {
        if(!noElPrefixFile.test(path.basename)) {
            path.basename = `el-${path.basename}`;
        }
    }))
    .pipe(dest(distFolder));
}

/**
 * 复制主题源码到dist包下
 * */ 
function copyThemeSource() {
    return src(resolve(__dirname, 'src/**')).pipe(dest(resolve(distBundle, 'src')))
}

function copyThemeBundle() {
    return src(resolve(__dirname, 'dist/**')).pipe(dest(distBundle));
}

const build = parallel(
    copyThemeSource,
    series(buildThemeChalk, copyThemeBundle)
)

export default build;