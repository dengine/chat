define(['Model', 'text!template.html'], function (Model, template){

    return Backbone.View.extend({

         events : {
            'click .disabled, .disabled i' : 'cancel',            
            'click #save' : 'save',
            'click #close' : 'close',            
            'focus input' : 'showBtn',
            'hide' : 'hide'
        },

        initialize : function(){
            if (Model.get('nick')) return;            

            this.tpl = _.template($('<div/>').html(template).find('#nickTemplate').html());            
            this.setElement($('<div/>').html(this.tpl).find('.modal'));
            this.input = this.$el.find('input');
            this.saveBtn = this.$el.find('#save');

            this.render();
        }, 
        cancel : function(e){
            e.stopImmediatePropagation();                                
        }, 
        save : function(){
            Model.set('nick',this.input.val());
            this.$el.modal('hide');
        },
        showBtn : function(){
            this.saveBtn.removeClass('disabled');
            this.input.attr('placeholder','');            
        },
        close : function(){            
            this.$el.modal('hide');            
        },
        hide : function(){            
            this.remove();            
        },
        
        render : function(){           
            this.$el.appendTo('body').modal({
                    backdrop: 'static',                        
            });    
        }
    })
})