/**
 * Created with JetBrains WebStorm.
 * User: artur
 * Date: 10/9/13
 * Time: 6:09 PM
 * To change this template use File | Settings | File Templates.
 */
/**
 * Created with JetBrains WebStorm.
 * User: artur
 * Date: 10/8/13
 * Time: 7:37 PM
 * To change this template use File | Settings | File Templates.
 */

define([
	'jquery',
	'underscore',
	'backbone'
], function ($, _, Backbone) {
	'use strict';

	var NewCategory = Backbone.View.extend({

		el: '#new_category',
		template: _.template($('#new_category_template').html()),
		events: {
			'click #save_category': 'onSave',
			'click #cancel_category' : 'onCansel'
		},

		initialize: function () {
			var model = this.model;

			this.listenTo(model, 'sync', this.close);
			this.listenTo(model, 'destroy', this.close);
		},
		render: function () {
			var data = this.model.toJSON();
			this.$el.find('.modal-body').html(this.template({data:data}));
			this.$el.find('.selectpicker').selectpicker();
		},

		close: function(){
			var router = App.getRouter();
			router.navigate("list",  {trigger: true});
			this.undelegateEvents();
			this.stopListening();
		},

		onSave: function(){
			var valueName = $('#category_name_field').val().trim();
			this.collection.add(this.model);
			this.model.save({ name: valueName});
		},

		onCansel: function(){
			this.model.destroy();
		}

	});

	return NewCategory;
});
