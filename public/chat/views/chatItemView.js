define(['Model'], function (Model){
	return Backbone.View.extend({
        tagName: "p",               
        initialize : function(chatMsg){               
            this.msg = chatMsg;            
            this.render();
        },
        render : function(){                                        
             var template = _.template(Model.get('itemTpl'), this.msg);                                   
             this.$el.html(template).appendTo('#history');
             if ($('#history').not(':visible')) {
                $('#history').show();
             }
        }
    });
})