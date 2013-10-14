/**
 * Created with JetBrains WebStorm.
 * User: artur
 * Date: 10/2/13
 * Time: 6:48 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'jquery',
	'underscore',
    'backbone',
    'appFiles/Models/Contact',
	'appFiles/Models/Category',
    'appFiles/Collections/ContactList',
	'appFiles/Collections/CategoryList',
	'appFiles/views/ContactList',
    'appFiles/views/ContactInfo',
    'appFiles/views/NewContact',
	'appFiles/views/TopPanelView',
	'appFiles/views/NewCategory'
], function ($, _,  Backbone,
             ContactModel,
             CategoryModel,
             ContactListCollection,
             CategoryListCollection,
             ContactListView,
             ContactInfoView,
             NewContactView,
             TopPanel,
             NewCategoryView) {
    'use strict';

    var GlobalRouter = Backbone.Router.extend({
        routes: {
	        '': 'defaultRoute',
            'createContact' : 'createContact',
            'list'          : 'showList',
	        'createCategory' : 'createCategory'
        },
	    initialize: function(){
			var App = window.App,
				Views = App.Views,
                Collections = App.Collections,
                Models = App.Models;

            Models.contact = new ContactModel();
            Collections.contactList = new ContactListCollection();
		    Collections.categoryList = new CategoryListCollection();
		    Views.topPanel = new TopPanel({
			    collection: Collections.categoryList
		    });
		    Views.contactList = new ContactListView({
                collection: Collections.contactList
            });

		    Views.newContact = new NewContactView({
			    collection: Collections.contactList,
			    categories: Collections.categoryList
		    });

            Views.contactInfo = new ContactInfoView({
	            collection: Collections.categoryList
            });

            Collections.contactList.fetch();
		    Collections.categoryList.fetch();

            this.listenTo(Views.contactList, 'showContact', this.onShowContact);
		    this.listenTo(Views.topPanel, 'changeCategory', this.onChangeCategory);
		    this.listenTo(Views.topPanel, 'search', this.onSearch);
		    this.listenTo(Views.contactInfo, 'editContact', this.onEdit);
		    this.listenTo(Views.newContact, 'saved', this.onSave);
	    },

        defaultRoute: function (param) {},

        showList: function(){
            App.Collections.contactList.fetch();
        },

        createContact: function(){
	        App.Views.newContact.setModel(new ContactModel());
            App.Views.newContact.render();
        },

	    createCategory: function(){
		    App.Views.newCategory = new NewCategoryView({
			    model: new CategoryModel(),
			    collection: App.Collections.categoryList
		    });
		    App.Views.newCategory.render();
	    },

        onShowContact: function(contact){
            App.Views.contactInfo.model = contact;
            App.Views.contactInfo.render()
        },

	    onSave: function(modelId){
		    App.Views.contactList.setActive(modelId);
	    },

	    onChangeCategory: function(category_id){
		    category_id = category_id == '' ? null : category_id;
		    App.Views.contactList.removeActive();
		    App.Views.contactList.filter(category_id);
		    App.Views.contactInfo.clear();
	    },

	    onSearch: function(val, category){
		    App.Views.contactList.removeActive();
		    App.Views.contactList.search(val, category);
		    App.Views.contactInfo.clear();
	    },

	    onEdit: function(model){
		    App.Views.newContact.setModel(model);
		    App.Views.newContact.render();
	    }
    });

    return GlobalRouter;
});