/**
 * Created by kusamao_abe on 2015/11/05.
 */

var gulp     = require( 'gulp' ),
	sass     = require( 'gulp-sass' ),
	data     = require( 'gulp-data' ),
	jade     = require( 'gulp-jade' ),
	browser  = require( 'browser-sync' ),
	remove   = require( 'rimraf' ),
	plumber  = require( 'gulp-plumber' ),
	sequence = require( 'run-sequence' );

gulp.task( 'scss', function () {
	return gulp.src( [ './src/scss/**/*.scss', '!_*.scss' ] )
		.pipe( plumber() )
		.pipe( sass() )
		.pipe( gulp.dest( './dist/css/' ) )
		.pipe( browser.reload( { stream: true } ) );
} );

gulp.task( 'jade', function () {
	return gulp.src( [ './src/**/*.jade', '!./src/**/_*.jade' ] )
		.pipe( plumber() )
		.pipe( data( function () {
			return require( './package.json' )
		} ) )
		.pipe( jade( { pretty: true } ) )
		.pipe( gulp.dest( './dist/' ) )
		.pipe( browser.reload( { stream: true } ) );
} );

gulp.task( 'clean', function ( callback ) {
	remove( './dist', callback );
} );

gulp.task( 'browser', function () {
	browser( {
		port: 3500,
		server: {
			baseDir: './dist'
		}
	} );
} );

gulp.task( 'build', [ 'clean' ], function ( callback ) {
	return sequence( [
		'jade', 'scss'
	], callback );
} );

gulp.task( 'watch', [ 'build' ], function () {
	gulp.watch( [ './src/scss/**/*.scss' ], [ 'scss' ] );
	gulp.watch( [ './src/**/*.jade' ], [ 'jade' ] );
} );

gulp.task( 'default', [ 'watch', 'browser' ] );