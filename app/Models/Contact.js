/**
 * Created by Beast on 06.10.13.
 */

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var Contact = Backbone.Model.extend({
        defaults: {
            name: '',
            email: '',
            phone: '',
            category_id: null
        }

    });

    return Contact;
});
