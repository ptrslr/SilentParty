var gulp   = require('gulp')
    sass   = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync');

// define the default task and add the watch task to it
gulp.task('default', ['sass']);


/* node-sass, biatch! */

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};

var autoprefixerOptions = {
  browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

gulp.task('sass', function() {
    return gulp
        .src('src/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(cssnano({autoprefixer: autoprefixerOptions}))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('src/css'));
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "src",
            directory: true
        }
    });
});


gulp.task('watch', ['browser-sync'], function(){
    gulp.watch(['src/scss/**/*.scss'], ['sass', browserSync.reload]);
    gulp.watch(['src/js/**/*.js'], browserSync.reload);
    gulp.watch(['src/**/*.php', 'src/**/*.html'], browserSync.reload);
});