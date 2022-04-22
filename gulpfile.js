// -----------------
// Gulp + Plugins
// -----------------

const { src, dest, series, parallel, watch } = require('gulp')
const cleanCSS = require('gulp-clean-css')
const uglify = require('gulp-uglify')
const del = require('del')

// -----------------
// Global config
// -----------------
const srcPath = './src/'
const destPath = '/home/daw/ftp/html'

// -----------------
// Private tasks
// -----------------


// Task A
function copySourceFiles(cb) {
    // Remove previous files
    del([destPath + '**/*.*'], cb)
    // Copy new files
    return src([srcPath + '**/*.{html,css,js,svg,png,jpg,jpeg}'])
        .pipe(dest(destPath))
}
//Borra los archivos anteriores, los copia nuevamente comprobando el tipo de archivos  y son
//enviados a la destinacion indicada en la constante destPath


// Task B
function minifyCss(cb) {
    return src([srcPath + 'styles/*.css'])
        .pipe(cleanCSS())
        .pipe(dest(destPath + 'styles/'))
}

//Busca con la constante srcPath una carpeta styles con un .css, llama a la funcion
//cleanCSS y lo reenvia a la carpeta destino styles usando destPath


// Task C
function minifyJs(cb) {
    return src([srcPath + 'scripts/*.js'])
        .pipe(uglify())
        .pipe(dest(destPath + 'scripts/'))
}



// -----------------
// Public tasks
// -----------------

// Task 1. Copy source files (A)
exports.update = copySourceFiles
//Cuando llamas a la tarea publica update llama a la tarea privada copySourceFiles



// Task 2. Minify CSS and JS (B+C)
exports.minify = parallel(
    minifyCss, 
    minifyJs
)
//Cuando llamas a la tarea publica minify esta llama paralelamente
//a las tareas privadas minifyCss y minifyJS


// Task 3. Execute tasks when a change occurs
exports.watch = function(cb) {
   watch('src',function(){
	series(this.default)
	});
};

// Task 4. Execute tasks 1 and 2
exports.default = series(
    this.update,
    this.minify
)
//Cuando llamas a la tarea publica default esta llama a las dos tareas publicas
//update y minify documentadas anteriormente
