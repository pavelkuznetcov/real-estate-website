var gulp = require("gulp");
var less = require("gulp-less");
var plumber = require("gulp-plumber");
// var svgstore = require("gulp-svgstore");
// var rename = require("gulp-rename");
// var server = require("browser-sync");

gulp.task("style", function(){
	gulp.src("style.less")
	.pipe(plumber())
	.pipe(less())
	.pipe(gulp.dest("css"))
});
