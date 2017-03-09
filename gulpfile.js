//npm install --save-dev gulp browserify vinyl-source-stream vinyl-buffer jshint gulp-jshint browser-sync gulp-uglify gulp-concat gulp-util gulp-ng-annotate
var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var jshint = require('gulp-jshint');
var browserSync = require('browser-sync').create();
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var util = require('gulp-util');
var ngAnnotate = require('gulp-ng-annotate');

var ambiente = util.env.prod ? 'prod' : 'dev';
var configFile = './app/env/' + ambiente + '.js';

var path = {
	DEPENDENCIES: [
		'bower_components/jquery/dist/jquery.min.js',
		'bower_components/angular/angular.min.js',
		'bower_components/angular-animate/angular-animate.min.js',
		'bower_components/angular-ui-router/release/angular-ui-router.min.js',
		'bower_components/angular-aria/angular-aria.min.js',
		'bower_components/angular-material/angular-material.min.js',
		'bower_components/angular-ui-grid/ui-grid.min.js',
		'bower_components/angular-materialize/js/app.js',
		'bower_components/materialize/dist/js/materialize.min.js',
		'bower_components/angular-material-sidemenu/dest/angular-material-sidemenu.js',
		'bower_components/firebase/firebase.js',
		'bower_components/angularfire/dist/angularfire.min.js',
		'bower_components/angular-local-storage/dist/angular-local-storage.min.js',
		'bower_components/angular-toastr/dist/angular-toastr.js',
		'bower_components/angular-toastr/dist/angular-toastr.tpls.js'
	],
	JS: [
		'app/assets/**/*.js',

		'app/config/module.js',
		'app/config/rotas.js',
		'app/config/auth.service.js',

		'app/shared/directives/isInputText/is-input-text.directive.js',

		'app/shared/services/is-storage.service.js',
		'app/shared/services/is-alert.service.js',

		'app/views/login/login.controller.js',
		'app/views/dashboard/dashboard.controller.js',
		'app/views/dashboard/dashboard.service.js',
		'app/views/avaliador/avaliador.controller.js',
		'app/views/avaliador/avaliador.service.js',
		'app/views/criterio/criterio.controller.js',
		'app/views/criterio/criterio.service.js',
		'app/views/candidato/candidato.controller.js',
		'app/views/candidato/candidato.service.js',
		'app/views/programa/programa.controller.js',
		'app/views/programa/programa.service.js'
	],
	JSON: [
		'app/views/**/*.json'
	],
	CSS: [
		'app/**/*.html',
		'app/**/*.css',
		'app/views/**/*.css',
		'app/**/*.json',
		'assets/css/style.css',
		'app/views/login/style.css',
		'bower_components/angular-material/angular-material.min.css',
		'bower_components/angular-material-sidemenu/dest/angular-material-sidemenu.css',
		'bower_components/angular-ui-grid/ui-grid.min.css',
		'bower_components/material-design-icons/iconfont/material-icons.css',
		'bower_components/materialize/dist/css/materialize.min.css',
		'bower_components/material-design-icons/iconfont/**/*.{ttf,woff,woff2,eof,svg}',
		'bower_components/angular-ui-grid/**/*.{ttf,woff,woff2,eof,svg}',
		'bower_components/angular-toastr/dist/angular-toastr.css'
	],
	FONTES: [
		'bower_components/materialize/fonts/**/*.{ttf,woff,woff2,eof,svg}'
	],
	WATCH: [
		'app/views/**/*.*',
		'app/assets/**/*.*',
		'app/config/*.*',
		'app/shared/**/*.*',
		'app/*.*'
	],
	IMAGES: [
		'app/assets/img/*.*'
	]
};
gulp.task('lint', function () {
	return gulp.src('./app/**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('dependencies', function () {
	return gulp.src(path.DEPENDENCIES, [configFile])
		.pipe(ngAnnotate())
		.pipe(util.env.prod ? uglify() : util.noop())
		.pipe(concat('dependencies.min.js'))
		.pipe(gulp.dest('./public/'));
});

gulp.task('scripts', function () {
	return gulp.src(path.JS, [configFile])
		.pipe(ngAnnotate())
		.pipe(util.env.prod ? uglify() : util.noop())
		.pipe(concat('vendor.min.js'))
		.pipe(gulp.dest('./public/'));
});

gulp.task('browserify', function () {
	return browserify('./app/config/module.js')
		.bundle()
		.pipe(source('main.js'))
		.pipe(gulp.dest('./public/'));
});

gulp.task('copy', ['browserify'], function () {
	gulp.src(path.CSS)
		.pipe(gulp.dest('./public'))
		.pipe(browserSync.stream())
});

gulp.task('images', ['browserify'], function () {
	gulp.src(path.IMAGES)
		.pipe(gulp.dest('./public/assets/img/'))
		.pipe(browserSync.stream())
});

gulp.task('fontes', ['browserify'], function () {
	gulp.src(path.FONTES)
		.pipe(gulp.dest('./public/fonts'))
		.pipe(browserSync.stream())
});

gulp.task('build', ['lint', 'copy', 'images', 'fontes', 'dependencies', 'scripts']);

gulp.task('browser-sync', ['build'], function () {
	browserSync.init({
		server: {
			baseDir: "./public",
			routes: {
				"/bower_components": "bower_components",
				"/node_modules": "node_modules"
			}
		},
		browser: "chrome"
	});
	console.log('Rodando em ambiente ' + ambiente);
});

gulp.task('default', ['browser-sync'], function () {

	gulp.watch(path.WATCH, ["build"]);
	gulp.watch("./public/**/*.*").on('change', browserSync.reload);
});