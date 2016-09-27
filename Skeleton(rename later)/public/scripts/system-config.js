SystemJS.config({
    'transpiler': 'plugin-babel',
    'map': {
        'plugin-babel': './../node_modules/systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build': './../node_modules/systemjs-plugin-babel/systemjs-babel-browser.js',
        'jquery': './../bower_components/jquery/dist/jquery.js',
        'index': './scripts/index.js',
        'app': './scripts/app.js'
    }
});