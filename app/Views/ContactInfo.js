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

    var ContactInfo = Backbone.View.extend({

        el: '#contact_info',

        template: _.template($('#contact_info_template').html()),

        events: {
	        'click #edit_contact' : 'onEditContact'
        },

        render: function () {
	        var categories = this.collection,
		        data = this.model.toJSON(),
                category = categories.get(data.category_id);

            data.category_name = _.isUndefined(category) ? '-' : category.get('name');
            this.listenTo(this.model, 'destroy', this.close);
            this.$el.html(this.template({data:data}));
        },

        close: function(){
            var router = App.getRouter();
            router.navigate("list",  {trigger: true});
            this.$el.html('');
        },

	    onEditContact: function(){
		    this.trigger('editContact', this.model);
	    },

	    clear: function(){
		    this.$el.html('');
	    }

    });

    return ContactInfo;
});