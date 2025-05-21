import { src, dest, parallel } from 'gulp'
import gulpSass from 'gulp-sass'
import dartSass from 'sass'


function copy() {
    return src('src/**/*.scss')
        .pipe(gulpSass(dartSass)())
        .pipe(dest('dist'));
}

const build = parallel(copy)

export default build;