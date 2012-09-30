
(function() {
  var Me = Backbone.Model.extend({
    urlRoot: 'json/',
    id: 'me.json',
    parse: function(resp) {
      return resp;
    }
  })

  var Meview = Backbone.View.extend({
    el: $('#myplace'),
    template: $('#me').template(),
  
    render: function () {
      this.el.empty();

      var attr = this.model.attributes
        , data = {
            image: attr.image,
            desc:JSON.stringify(attr.desc, null, 4)
          }
        ;
    
      $.tmpl(this.template, data).appendTo(this.el);
    }
  });

  var me = new Me();

  me.fetch({
    success: function(model, response) {
      view = new Meview({model: me});
      view.render();
    },
    error: function (model, response) {
      console.log('Some error loading data')
    }
  });
  
}());