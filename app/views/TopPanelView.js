define([
	'jquery',
	'underscore',
	'backbone'
], function ($, _, Backbone) {
	'use strict';

	var TopPanel = Backbone.View.extend({

		el: '#top_panel',

		template: _.template($('#contact_search_template').html()),

		events: {
			'click #add_category' : 'onAddCategory',
			'change #categories' : 'onSelectCategory',
			'keyup #search_field' : 'onSearch',
			'click .remove_contact' : 'onRemoveContact'
		},

		initialize: function () {
			var collection = this.collection;

			this.listenTo(collection, 'all', this.render);
		},

		render: function () {
			var data = this.collection.toJSON();
			this.$el.html(this.template({data:data}));
			this.$el.find('.selectpicker').selectpicker();
		},

		onAddCategory: function(e){
			var router = App.getRouter();

			router.navigate("createCategory",  {trigger: true});
		},

		onSelectCategory: function(e){
			var model_id = $(e.target).val().trim();

            this.$el.find('#search_field').val('');
			this.trigger('changeCategory', model_id);
		},

		onSearch: function(e){
			var value = $(e.target).val().trim(),
                category = this.$el.find('.selectpicker').val().trim();
			this.trigger('search', value, category);
		},

		onRemoveContact: function(e){
			var model_id = e.target.parentElement.id,
				selectedModel = this.collection.get(model_id);
			selectedModel.destroy();
		}
	});

	return TopPanel;
});