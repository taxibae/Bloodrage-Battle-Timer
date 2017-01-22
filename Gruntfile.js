 module.exports = function(grunt) {
 
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        // Translation for multi-lang
        nggettext_extract: {
            pot: {
                files: {
                'public/translate/translate.pot': [
                    'public/view-index-main/index-main.templete.html'
                ]}
            },
        },
        nggettext_compile: {
            all: {
                options: {
                    module: 'gettext_translation'
                },
                files: {
                    'public/translate/translation.js': ['public/translate/po/*.po']
                }
            },
        }, 
        
    });
    
    grunt.loadNpmTasks('grunt-angular-gettext');
};