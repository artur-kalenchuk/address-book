/**
 * Created by Beast on 06.10.13.
 */
define([
    'underscore',
    'backbone',
    'backboneLocalstorage',
    'appFiles/Models/Contact'
], function (_, Backbone, Store, Contact) {
    'use strict';

    var ContactList = Backbone.Collection.extend({

        model: Contact,

        localStorage: new Store('adress-book-backbone'),

	    search: function(val, category){
		    var pattern = new RegExp( $.trim(val).replace( / /gi, '|' ), "i"),
                category = category == '' ? undefined : category,
		        result = this.filter(function( model ){
                if((_.isUndefined(category) || model.get('category_id') == category) && pattern.test(model.get('name')))
                    return true;
		    });
		    return result;
	    }

    });

    return ContactList;
});

