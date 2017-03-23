//npm install --save-dev gulp browserify source jshint browserSync uglify concat util ngAnnotate del
let gulp = require('gulp');
let browserify = require('browserify');
let source = require('vinyl-source-stream');
let jshint = require('gulp-jshint');
let browserSync = require('browser-sync').create();
let uglify = require('gulp-uglify');
let concat = require('gulp-concat');
let util = require('gulp-util');
let ngAnnotate = require('gulp-ng-annotate');
let del = require('del');

let ambiente = util.env.prod ? 'prod' : 'dev';
let configFile = './app/env/' + ambiente + '.js';

let path = {
	VENDOR: [
		'bower_components/jquery/dist/jquery.min.js',
		'bower_components/angular/angular.min.js',
		'bower_components/angular-animate/angular-animate.min.js',
		'bower_components/angular-ui-router/release/angular-ui-router.min.js',
		'bower_components/angular-aria/angular-aria.min.js',
		'bower_components/angular-material/angular-material.min.js',
		'bower_components/materialize/dist/js/materialize.min.js',
		'bower_components/angular-material-sidemenu/dest/angular-material-sidemenu.js',
		'bower_components/firebase/firebase.js',
		'bower_components/angularfire/dist/angularfire.min.js',
		'bower_components/angular-local-storage/dist/angular-local-storage.min.js',
		'bower_components/material-steppers/dist/material-steppers.min.js',
		'bower_components/angular-materialize/src/angular-materialize.js',
		'bower_components/chart.js/dist/Chart.min.js',
		'bower_components/angular-chart.js/dist/angular-chart.min.js'
	],
	APP: [
		'app/assets/**/*.js',
		'app/config/interceptor.js',
		'app/config/rotas.js',
		'app/config/auth.service.js',
		'app/shared/directives/**/*.js',
		'app/shared/services/is-storage.service.js',
		'app/shared/services/is-alert.service.js',
		'app/shared/filters/is-range.filter.js',
		'app/views/login/login.controller.js',
		'app/views/selecao/selecao.controller.js',
		'app/views/selecao/detalhes-selecao.controller.js',
		'app/views/selecao/selecao.service.js',
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
	HTML: [
		'app/**/**/*.json',
		'app/**/**/*.css',
		'app/**/**/*.html',
		'app/*.html'
	],
	CSS: [
		'bower_components/angular-material/angular-material.min.css',
		'bower_components/angular-material-sidemenu/dest/angular-material-sidemenu.css',
		'bower_components/material-design-icons/iconfont/material-icons.css',
		'bower_components/materialize/dist/css/materialize.min.css',
		'bower_components/material-steppers/dist/material-steppers.min.css',
		'app/assets/css/style.css'

	],
	ROBOTO: [
		'bower_components/materialize/fonts/**/*.{ttf,woff,woff2}'
	],
	ICONS: [
		'bower_components/material-design-icons/iconfont/**/*.{ttf,woff,woff2}'
	],
	IMAGES: [
		'app/assets/img/*.*'
	]
};

gulp.task('revision-code', function () {
	return gulp.src('./app/**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('vendor-deploy', function () {
	return gulp.src(path.VENDOR, [configFile])
		.pipe(ngAnnotate())
		.pipe(util.env.prod ? uglify().on('error', util.log) : util.noop())
		.pipe(concat('vendor.min.js'))
		.pipe(gulp.dest('./public/'));
});

gulp.task('app-deploy', function () {
	return gulp.src(path.APP, [configFile])
		.pipe(ngAnnotate())
		.pipe(util.env.prod ? uglify().on('error', util.log) : util.noop())
		.pipe(concat('app.min.js'))
		.pipe(gulp.dest('./public/'));
});

gulp.task('styles-deploy', function () {
	gulp.src(path.CSS)
		.pipe(concat('styles.css'))
		.pipe(gulp.dest('./public'))
});

gulp.task('icons-deploy', function () {
	gulp.src(path.ICONS)
		.pipe(gulp.dest('./public'))
});

gulp.task('roboto-deploy', function () {
	gulp.src(path.ROBOTO)
		.pipe(gulp.dest('./public/fonts'))
});

gulp.task('images-deploy', function () {
	gulp.src(path.IMAGES)
		.pipe(gulp.dest('./public/assets/img/'))
});

gulp.task('html-deploy', function () {
	gulp.src(path.HTML)
		.pipe(gulp.dest('./public/'))
});

gulp.task('browserify', function () {
	return browserify('./app/config/module.js')
		.bundle()
		.pipe(source('main.js'))
		.pipe(gulp.dest('./public/'));
});

gulp.task('build', [
	'clean',
	'revision-code',
	'vendor-deploy',
	'app-deploy',
	'styles-deploy',
	'icons-deploy',
	'roboto-deploy',
	'images-deploy',
	'html-deploy',
	'browserify'
]);

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

gulp.task('clean', function () {
	del.sync('public');
});

gulp.task('default', ['browser-sync'], function () {
	gulp.watch(path.HTML, ["html-deploy"]).on('change', browserSync.reload);
	gulp.watch(path.IMAGES, ["images-deploy"]).on('change', browserSync.reload);
	gulp.watch(path.APP, ["app-deploy"]).on('change', browserSync.reload);
	gulp.watch(path.CSS, ["styles-deploy"]).on('change', browserSync.reload);
});