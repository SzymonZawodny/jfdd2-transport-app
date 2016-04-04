/**
 * Require Browsersync
 */
var browserSync = require('browser-sync');

/**
 * Run Browsersync with server config
 */
browserSync({
	server: "src/app",
    files: ["src/app/**/*.html", "src/app/**/*.css", "src/app/**/*.js"]
});