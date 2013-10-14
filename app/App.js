/**
 * Created with JetBrains WebStorm.
 * User: artur
 * Date: 10/1/13
 * Time: 7:23 PM
 * To change this template use File | Settings | File Templates.
 */
define(
    ['jquery',
    'underscore',
    'backbone',
    'appFiles/router/GlobalRouter'
    ],
    function($, _, Backbone, GlobalRouter ) {
    'use strict';
        window.App = {
            Models: {},
            Views: {},
            Collections: {},
            Router: null,
            init: function() {
                this.Router = new GlobalRouter();
                Backbone.history.start();
            },

            getRouter: function(){
                return this.Router
            }
        }
        return App;

    });