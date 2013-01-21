({
    //appDir: "../chat",
    //baseUrl: "/",
    mainConfigFile: 'main.js',
    //dir: "../chat-build",
   /* paths: {     		
		underscore : 'lib/underscore',
		Backbone : 'lib/backbone',
    Model : 'models/chatModel',
    Chat : 'views/chatView',
    SupportView: 'chat/views/supportView',
    ClientView: 'chat/views/clientView',
    ChatItemView: 'chat/views/chatItemView',
    NickPromtView: 'chat/views/nickPromtView',
    RemoteView: 'views/remoteView', 
    socket: '/socket.io/socket.io',
    template: 'chat/templates/template',    
    text: 'chat/lib/text'
	},*/
    
    name: "main",
    include: ["Chat","Model","ClientView"],   
    out: "main.min.js",
})


/*({
    appDir : '../',
    baseUrl : 'js',
    dir : '../../release',
    paths: {
        jquery:         'libs/jquery/jquery',
        underscore:     'libs/underscore/underscore',
        backbone:       'libs/backbone/backbone',
        text:           'libs/require/text',
        json2:          'libs/json/json2',
        templates:      '../templates'
    },
    optimize: 'uglify',
    modules: [
        {
            name: 'main',
            exclude: ['jquery', 'underscore', 'backbone', 'text', 'json2']
        }
    ]
})*/