define(['Model','ChatItemView','text!template.html'], 
	function (Model, ChatItemView, template) {	
		return Backbone.View.extend({

			id: 'supportChat',
			events: {
				'click .disabled, .disabled i': 'cancel',
				'click #sendMessage': 'sendMessage',
				'click #showHistory': 'showHistory',
				'click #accept': 'enableChat',
				'submit form': 'sendMessage',
			},

			initialize: function () {
			    var tpl = $('<div/>').html(template);

				this.userTpl = tpl.find('#' + Model.get('userType') + 'Template').html();
				Model.set('itemTpl',tpl.find('#itemTemplate').html());

				this.socket = Model.get('socket');
				this.bindSocket();
				this.render();
				
				this.input = this.$el.find('input');
				this.history = this.$el.find('#history');
				
			},
			bindSocket: function () {
				var self = this;
				this.socket.on('message', function (msg) {
					switch (msg.type) {
					case 'message':								
						new ChatItemView(msg);
						break;
					case 'chatRequest':
						self.accept();
						break;
					case 'mousePosition':
						$('div.pointer').css({ 'left': msg.pos.x, 'top': msg.pos.y })
						break;
					case 'sendContent':
						self.showRemoteContent(msg.clientData);
						break;
					case 'inputData':
						$('#' + data.id).val(data.value);
						break;
					case 'stopChat':
						self.disableChat();
						break;
					case 'stopRemote':					
						$('#remoteScreen').hide();
						break;
					}
				});			
			},
			cancel: function (e) {
				e.stopImmediatePropagation();
			},
			sendMessage: function (e) {
				e.preventDefault();

				var nick, msg,
					text =  this.input.val();				    

				if (text.length > 0) {

				    nick = Model.get('nick') || Model.get('userType');
					msg = {
						'type': 'message',
						'name': nick,
						'text': text
					};				
					
					this.socket.emit('message', msg);
					
					if (this.history.is(':hidden')) {
						this.showHistory();
					};

					this.input.val('');

					new ChatItemView(msg);
				}
			},
			enableChat: function () {
				this.input.removeAttr("disabled").attr('placeholder', '');
				this.$el.find('span.add-on').removeClass('disabled');
				
				this.socket.emit('message', { type: 'accepted' });
			},
			disableChat: function () {
				this.input.attr({ 'disabled': 'disabled', 'placeholder': 'Ожидание клиента' }).end()
				          .find('span.add-on,#accept').addClass('disabled');

				this.history.html('').hide();
			},
			showHistory: function () {
				var historyBtn = this.$el.find('#showHistory');

				historyBtn.attr('title') === 'показать историю' ? 
				historyBtn.attr('title', 'спрятать') : 
				historyBtn.attr('title', 'показать историю');
				
				this.history.is(':hidden') ? 
				this.history.show() : 
				this.history.hide();
			},
			showRemoteContent: function (data) {
				$('#remoteScreen').show();
				$('#screen').html(data.content);

				_.each(data.values, function (value, id) {
					$('#' + id).val(value)
				})
			},
			accept: function () {
				this.input.attr('placeholder', 'Запрос от клиента. Нажмите подвердить');
				this.$el.find('#accept').removeClass('disabled');
			},
			render: function () {
	            this.$el.html(_.template(this.userTpl));
				$('#chat').append(this.$el).show();
			}
		});
	}
)