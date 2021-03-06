const { dest, src, parallel, watch, series } = require('gulp')
const config = require('./gulp/config')

const concat = require('gulp-concat')
const uglify = require('gulp-uglify')
const minifyHtml = require('gulp-minify-html')





function copyHtml() {
    return src('./src/index.html')
    .pipe(minifyHtml())
    .pipe(dest('./dist/'))

}


function copyJs() {
    return (
        src(config.allJsFiles)
            .pipe(concat('app.js'))
            .pipe(uglify())
            .pipe(dest('./dist/'))
    )
}

function copyCss() {
    return src([
        config.allCssFiles,
    ]).pipe(dest('./dist/'))

}

function watchFiles(cb) {
    watch(config.allJsFiles, copyJs);
    watch(config.allCssFiles, copyCss);
    cb();
}
function taskBuild() {
    return    parallel(
        copyHtml,
        copyCss,
        copyJs
    )
}

function taskServe() {
    return series(taskBuild, watchFiles)
}

module.exports.build = taskBuild()

module.exports.serve = taskServe()