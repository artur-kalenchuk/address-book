define([
	'jquery',
	'underscore',
	'backbone'
], function ($, _, Backbone) {
	'use strict';

	var ContactList = Backbone.View.extend({

		el: '#contact_list',

		template: _.template($('#contact_list_template').html()),

		events: {
            'click #add_contact' : 'onAddContact',
            'click .remove_contact' : 'onRemoveContact',
            'click .contact_item' : 'onShowContact'
		},

		initialize: function () {
            var collection = this.collection;

            this.listenTo(collection, 'all', this.render);
        },

		setActive: function(modelId){
			this.$el.find('li#'+modelId).trigger('click');
		},

		removeActive: function(){
			this.$el.find('li').removeClass('active');
		},

		render: function () {
            var data = this.collection.toJSON();
			this.$el.html(this.template({data:data}));
		},

		filter: function(filter_id){
			var self = this,
				activeContacts = filter_id === null ? this.collection.models : this.collection.where({category_id:filter_id});

			this.hideAll();
			_.each(activeContacts, function(model){
				self.show(model.id);
			})
		},

		search: function(val,category){
			var self = this,
				searchResult = this.collection.search(val, category);
			this.hideAll();
			_.each(searchResult, function(model){
				self.show(model.id);
			})
		},

		hideAll: function(){
			this.$el.find('li').hide();
		},

		show: function(id){
			this.$el.find('li#'+id).show();
		},

        onAddContact: function(e){
            var router = App.getRouter();

            router.navigate("createContact",  {trigger: true});
        },

        onRemoveContact: function(e){
            var model_id = e.target.parentElement.id,
                selectedModel = this.collection.get(model_id);
            selectedModel.destroy();
        },

        onShowContact: function(e){
            var model_id = e.target.id;
            $(e.target).parent().children().removeClass('active');
            $(e.target).addClass('active');
            this.trigger('showContact', this.collection.get(model_id));
        }
	});

	return ContactList;
});