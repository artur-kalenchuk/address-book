/**
 * Created by Beast on 06.10.13.
 */

define([
	'underscore',
	'backbone'
], function (_, Backbone) {
	'use strict';

	var Category = Backbone.Model.extend({
		defaults: {
			name: ''
		}

	});

	return Category;
});
