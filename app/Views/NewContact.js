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

    var NewContact = Backbone.View.extend({

        el: '#new_contact',
//
        template: _.template($('#create_contact_template').html()),
//
        events: {
            'click #save': 'onSave',
            'click #cancel' : 'onCansel'
        },

        initialize: function () {
			this.templateBody = this.$el.find('.modal-body');
	        this.categories = this.options.categories;
        },

	    setModel: function(model){
			var model = this.model = model;
		    this.listenTo(model, 'sync', this.close);
		    this.listenTo(model, 'destroy', this.close);
	    },
//
        render: function () {
            var data = {
		            model:this.model.toJSON(),
	                categories: this.categories.toJSON()
	            };

            this.templateBody.html(this.template({data:data}));
	        this.$el.find('.selectpicker').selectpicker();
        },

        close: function(){
            var router = App.getRouter();
            router.navigate("list",  {trigger: true});
//            this.undelegateEvents();
//            this.stopListening();
        },

        onSave: function(){
            var categorySelect = this.$el.find('.selectpicker'),
	            valueName = $('#name_field').val().trim(),
                valueEmail = $('#email_field').val().trim(),
                valuePhone = $('#phone_field').val().trim(),
	            valueCategory = categorySelect.val() == '' ? null : categorySelect.val();
            this.collection.add(this.model);
            this.model.save({ name: valueName, email: valueEmail, phone: valuePhone, category_id: valueCategory });
	        this.trigger('saved', this.model.id);
        },

        onCansel: function(){
	        !this.model.id && this.model.destroy();
        }

    });

    return NewContact;
});
