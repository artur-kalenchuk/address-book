'use strict';
require.config({
    // The shim config allows us to configure dependencies for
    // scripts that do not call define() to register a module
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery',
                'bootstrap',
	            'bootstrapSelect'
            ],
            exports: 'Backbone'
        },
        backboneLocalstorage: {
            deps: ['backbone'],
            exports: 'store'
        },

        bootstrap:{
            deps: ['jquery']
        },

	    bootstrapSelect:{
		    deps: ['bootstrap']
	    }
    },
    paths: {
        //vendor
        jquery: 'vendor/jquery/jquery-1.10.2.min',
        underscore: 'vendor/underscore/underscore-min',
        backbone: 'vendor/backbone/backbone-min',
        backboneLocalstorage: 'vendor/backbone/backbone.localStorage/backbone.localStorage-min',
        text: 'vendor/require/requirejs-text/text',
        bootstrap: 'vendor/bootstrap/js/bootstrap.min',
	bootstrapSelect: 'vendor/bootstrap/bootstrap-select/bootstrap-select.min',
        //app
        appFiles: 'app/',
        app: 'app/App'

    }
});

require([
    'app'
], function (App) {
      App.init();
});
