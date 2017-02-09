//The build will inline common dependencies into this file.

//For any third party dependencies, like jQuery, place them in the lib folder.

//Configure loading modules from the lib directory,
//except for 'app' ones, which are in a sibling
//directory.
requirejs.config({
    baseUrl: '/javascripts/lib',
    paths: {
        components: '../components',
        modules: '../modules',
        templates: '../templates',
        mustache: 'mustache',
        text: 'text',
        dropzone: 'dropzone',
        async: 'async',
        typeahead: 'typeahead',
        bloodhound: 'bloodhound'
    }
});
