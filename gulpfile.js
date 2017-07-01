g           = require('gulp');
path        = require('path');
gClean      = require('gulp-clean');
gLess       = require('gulp-less');
gConcat     = require('gulp-concat');
gWatch      = require('gulp-watch');
gElectron   = require('electron-connect').server.create({
    path: 'src/'
});

g.task('clean', function(){
    return g 
        .src('build', {read: false})
        .pipe(gClean())
})

g.task('css', function(){
    return g
        .src('src/**/*.less')
        .pipe(gLess({
            paths: [path.join(__dirname, 'src')]
        }))
        .pipe(gConcat('all.css'))
        .pipe(g.dest('src'))
})

g.task('build', ['clean', 'css'], function(){
    g
        .src('src/**/*')
        .pipe(g.dest('build'))

})

g.task('dev', function(){
    gElectron.start()

    // g.watch(['src/index.html'], gElectron.reload)
    g.watch('src/**/*.*{js,less,html}', function(){
        g.start('css')
        gElectron.reload()
    })
})