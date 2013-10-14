/**
 * Created by Beast on 06.10.13.
 */
define([
	'underscore',
	'backbone',
	'backboneLocalstorage',
	'appFiles/Models/Category'
], function (_, Backbone, Store, Category) {
	'use strict';

	var CategoryList = Backbone.Collection.extend({

		model: Category,

		localStorage: new Store('adress-book-category-backbone')

	});

	return CategoryList;
});

