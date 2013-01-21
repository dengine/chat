define(['Model','SupportView','ClientView'], function (Model, SupportView, ClientView) {
    
    return Backbone.View.extend({

        id: 'chat',
        className: 'container well well-small',

        initialize: function (userType) {            
            this.loadCss('/chat/css/chat.css');
            $('<script/>',{ src: '/socket.io/socket.io.js' }).appendTo('head');

            Model.on('change:socket', this.render, this);
            Model.set({
                'userType': userType,
                'socket': io.connect('https://chat-kpa6.rhcloud.com/')
            });
            
        },

        render: function () {
            var startButton = $('<a/>', {
                 id: 'runChat',
                 class: 'btn btn-mini btn-success',
                 text: 'Запустить чат'
            });

            this.$el.hide().prependTo('body');

            if (Model.get('userType') === 'client') {
                
                    startButton.appendTo('body').on('click', function(){
                        new ClientView;
                    });
                
            };

            if (Model.get('userType') === 'support') {
                
                    new SupportView
                
            };
        },

        loadCss: function (link) {
            document.createStyleSheet ? 
            document.createStyleSheet(link) : 
            $("head").append($('<link/>',{ href: link, rel:'stylesheet', type:'text/css'}));
        }
    });
})
