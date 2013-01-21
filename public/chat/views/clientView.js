define(['SupportView', 'ChatItemView', 'NickPromtView', 'RemoteView'],
    function (SupportView, ChatItemView, NickPromtView, RemoteView) {
    	return SupportView.extend({
    	
        	id : 'clientChat',
            events : {            
                'click.Chat #connect' : 'connect',
                'click.Chat #disconnect' : 'disconnect',
                'click.Chat #remoteControl' : 'remoteControl'
            },

            initialize : function(){                        
                this.parent = SupportView.prototype;
                this.parent.initialize.apply(this);
                this.events = _.extend({},this.parent.events,this.events);

                this.startButton = $('#runChat');            
                this.startButton.hide();

                new NickPromtView;
                
            },            
            bindSocket : function(){                
                var self = this;
                this.socket.on('message',function(msg){
                    switch (msg.type){
                        case 'message':                
                            new ChatItemView(msg);
                            break;
                        case 'accepted':
                            self.enableChat();
                            break;
                    }; 
                });                        
            },
            connect : function(){            
                this.input.attr('placeholder','Соединение');                       
                this.socket.emit('message',{ type:'chatRequest'} );
                this.socket.socket.reconnect();            
            },
            disconnect : function(){                       
                this.socket.emit('message',{type: 'stopChat'});
                this.startButton.show();            
                this.remove();
                $('#chat').hide();
            },
            remoteControl : function(){
                var current = this.$el.find('#remoteControl');
                    
                if (this.remote) {                
                    this.remote.stop();
                    this.remote = null;
                    current.attr('title','Показать рабочую область');
                } else {                
                    this.remote = new RemoteView;                
                    current.attr('title','спрятать рабочую область');

                }
            },
            enableChat : function(){                 
                this.input.removeAttr("disabled").attr('placeholder','');
                this.$el.find('span.add-on,#disconnect').removeClass('disabled').end()
                this.$el.find('#connect').addClass('disabled');
            }  
    	})
    }
)