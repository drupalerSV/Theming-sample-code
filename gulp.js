//Note this is only sample code

// Import necessary modules
const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

// Define tasks
gulp.task('sass', function() {
    return gulp.src('src/scss/**/*.scss') // Path to your Sass files
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css')); // Output directory for compiled CSS
});

gulp.task('scripts', function() {
    return gulp.src('src/js/**/*.js') // Path to your JS files
        .pipe(concat('app.js')) // Concatenate all JS files into one
        .pipe(gulp.dest('dist/js')) // Output directory for concatenated JS
        .pipe(rename({suffix: '.min'})) // Rename the concatenated file
        .pipe(uglify()) // Minify the JS
        .pipe(gulp.dest('dist/js')); // Output directory for minified JS
});

// Watch task to automatically run tasks when files change
gulp.task('watch', function() {
    gulp.watch('src/scss/**/*.scss', gulp.series('sass'));
    gulp.watch('src/js/**/*.js', gulp.series('scripts'));
});

// Default task
gulp.task('default', gulp.parallel('sass', 'scripts', 'watch'));
