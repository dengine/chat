define(['Backbone'],function(Backbone){

  var model = Backbone.Model.extend({
  	defaults:{
  		itemTpl: '',
  		userType: '',
  		socket: ''  		
  	}  	
  });
  
  return new model;  
})
