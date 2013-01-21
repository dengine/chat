define(['Model'], function(Model){
	
    return Backbone.View.extend({
    
        events : {
            'mousemove.remote':'mousePosition',
            'change.remote input, select'       : 'sendData',                
        },

        initialize: function(){
            this.socket = Model.get('socket');
            this.setElement('#content');
            _.bindAll(this,'updateRemotePage');

            this.bindContentChange();
            this.updateRemotePage();                      
        },        
        mousePosition: function(e){                    
            this.socket.emit('message' , { type: 'mousePosition', pos: {
                    x: e.pageX - this.$el.offset().left,
                    y: e.pageY - this.$el.offset().top
            }});
        },
        updateRemotePage : function(){        
            var content = this.$el.html(),
                values = {};

                this.$el.find('input, select').each(function(){
                    if (this.value.length > 0) {
                        values[this.id] = this.value                    
                    };                                  
                });                                               
                this.socket.emit('message',{ type: 'sendContent', clientData : { 
                    content: content,
                    values: values 
                }});  
        },
        bindContentChange : function(){                             
           if ( window.addEventListener ) {

                this.$el.on('DOMNodeInserted.remote',this.updateRemotePage);

           } else if ( document.onpropertychange ) {

                document.onpropertychange = this.updateRemotePage;

           } else {

                var content = this.$el.find('*'),
                    self = this;

                this.updateTimer = setInterval(function(){
                    var current = this.$el.find('*');
                    
                    if (content.length < current.length) {
                        content = current;
                        self.updateRemotePage()
                    }},500);
               }
        },
        sendData: function(e){            
            var id = $(e.target).attr('id'),
                value = $(e.target).val();

            if (value.length > 0 ) {
                this.socket.emit('message' , { type : 'inputData', data : {
                    'id':id,
                    'value':value
                }});
            };
        },
        stop: function(){            
            this.$el.off('.remote');

            if (document.onpropertychange) document.onpropertychange = null;           

            if (this.updateTimer) clearInterval(this.updateTimer);        
            
            this.socket.emit('message',{ type: 'stopRemote' });
        }
    }); 
})