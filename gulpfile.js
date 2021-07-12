const { src, dest, task, series, watch, parallel } = require("gulp");
const rm = require("gulp-rm");
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');


const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const gulpif = require('gulp-if');

const env = process.env.NODE_ENV;

const {SRC_PATH, DIST_PATH, STYLE_LIBS, JS_LIBS} = require("./gulp.config");



task('clean', () => {
  return src(`${DIST_PATH}/**/*`, { read: false }).pipe(rm());
});

task('copy:html', () => {
  return src(`${SRC_PATH}/*.html`).pipe(dest(`${DIST_PATH}`)).pipe(reload({ stream: true }));
});

task('copy:png', () => {
  return src(`${SRC_PATH}/img/*.png`).pipe(dest(`${DIST_PATH}/img`));
});

task('copy:svg', () => {
  return src(`${SRC_PATH}/**/*.svg`).pipe(dest(`${DIST_PATH}`));
});

task('copy:video', () => {
  return src(`${SRC_PATH}/video/Beats.mp4`).pipe(dest(`${DIST_PATH}/video`));
});


task('styles', () => {
  return src([...STYLE_LIBS, `${SRC_PATH}/scss/main.scss`])
    .pipe(gulpif(env == "dev", sourcemaps.init()))
    .pipe(concat('main.scss'))
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))

    .pipe(gulpif(env == "dev",
      autoprefixer({
        cascade: false
      }))
    )
    
    .pipe(gulpif (env == "prod", cleanCSS()))
    .pipe(gulpif(env == "dev", sourcemaps.write()))
    .pipe(dest(`${DIST_PATH}`))
    .pipe(reload({ stream: true }));
});



task("scripts", () => {
  return src([...JS_LIBS, `${SRC_PATH}/js/*.js`])
    .pipe(gulpif(env == "dev",sourcemaps.init()))
    .pipe(concat('main.js', { newLine: ";" }))
    .pipe(gulpif (env == "prod",
      babel({
        presets: ['@babel/env']
      }))
    )
    .pipe(gulpif (env == "prod",uglify()))
    .pipe(gulpif(env == "dev",sourcemaps.write()))
    .pipe(dest(`${DIST_PATH}`))
    .pipe(reload({ stream: true }));
});



task('server', () => {
  browserSync.init({
    server: {
      baseDir: `./${DIST_PATH}`
    },
    open: false
  });
});

task("watch", () => {
  watch(`./SRC_PATH/scss/**/*.scss`, series("styles"));
  watch(`./SRC_PATH/*.html`, series("copy:html"));
  watch(`./SRC_PATH/img/*.png`, series("copy:png"));
  watch(`./SRC_PATH/js/*.js`, series("scripts"));
})

task(
  'default', 
  series(
    'clean',
    parallel('copy:html','copy:png', 'copy:svg', 'copy:video', 'styles', "scripts"), 
    parallel('watch','server')
    )
);

task(
  'build', 
  series('clean', parallel('copy:html','copy:png', 'copy:svg', 'copy:video', 'styles', "scripts"))
);