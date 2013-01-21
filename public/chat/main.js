require.config({  
  paths: {        
    underscore : 'lib/underscore',
    Backbone : 'lib/backbone',
    Model : 'models/chatModel',
    Chat : 'views/chatView',
    SupportView: 'views/supportView',
    ClientView: 'views/clientView',
    ChatItemView: 'views/chatItemView',
    NickPromtView: 'views/nickPromtView',
    RemoteView: 'views/remoteView',     
    template: 'templates/template',    
    text: 'lib/text'
  },  
  shim: {
    underscore: {
      exports: '_'
    },             
    Backbone: {
      deps: ['underscore'],
      exports: 'Backbone'
    }    
  }
});