var gulp   = require('gulp')
    sass   = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    cssnano = require('gulp-cssnano'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    jshint = require('gulp-jshint'),
    // babel = require('gulp-babel'),
    // concat = require('gulp-concat'),
    webpackStream = require('webpack-stream'),
    path = require('path'),
    browserSync = require('browser-sync');

var webpack = require('webpack');

// define the default task and add the watch task to it
gulp.task('default', ['watch']);


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

gulp.task('img', function() {
    return gulp
        .src('src/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('src/img'))
});

var webpackConf = {
    entry: {
        main: './src/js/App.js',
        // vendor: ['react', 'react-dom', 'react-geomicons']
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/dist'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            include : path.resolve(__dirname, 'src/js'),
            loader : 'babel-loader',
            query: {
                presets: ['es2015', 'react'],
                plugins: ["transform-react-jsx"],
            }
        }]
    },
};
gulp.task('webpack', function() {
    return gulp.src('src/js/app.jsx')
        .pipe(webpackStream(webpackConf).on('error', swallowError))
        .pipe(gulp.dest('src/js'));
});

function swallowError (error) {

  // If you want details of the error in the console
  console.log(error.toString())

  this.emit('end')
}


gulp.task('browser-sync', ['webpack', 'sass'], function() {
    browserSync({
        server: {
            baseDir: "src",
            directory: true
        }
    });
});

gulp.task('lint', function() {
    return gulp.src('./src/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});


gulp.task('watch', ['browser-sync'], function(){
    gulp.watch(['src/scss/**/*.scss'], ['sass', browserSync.reload]);
    gulp.watch(['src/js/**/*.jsx'], ['webpack', browserSync.reload]);
    gulp.watch(['src/**/*.php', 'src/**/*.html'], browserSync.reload);
});
