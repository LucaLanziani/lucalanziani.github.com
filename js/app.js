var attr = DS.attr;



var App = Ember.Application.create();
// App.Store = DS.Store.extend();
var showdown = new Showdown.converter({ extensions: ['twitter'] });

  
function loadTemplate(url, name, callback) {
  var contents = $.get(url, function(templateText) {
    var compiledTemplate = Ember.Handlebars.compile(templateText);
    if (name) {
      Ember.TEMPLATES[name] = compiledTemplate
    } else {
      Ember.View.create({ template: compiledTemplate }).append();
    }
    if (callback) {
      callback();
    }
  });
}

var getParams = function (param) {
    return function (element) {
        return Ember.$.ajax({
                url: element['_'+param]
            }).then(function (data) {
                element[param] = data;
                return element;
            });
    }
};

var getDescriptions = function (param) {
    return function (experiences) {
        var promises = experiences.map(getParams(param));
        return Ember.RSVP
        .all(promises)
        .then(function (result) {
            return result;
        });
    }
};

var getMe = function () {
    return Ember.$.getJSON('data/base.json')
            .then(function (result) {
                return result;
            });
};

var getExperiences = function () {
    return Ember.$.getJSON('data/experiences.json')
            .then(getDescriptions('description'))
            .then(function (result) {
                return result;
            });
};


Ember.Handlebars.helper('format-date', function (date) {
    if (date.length === 0) {
        return "Now"
    }
    return moment(date).format('MM/YYYY');
});

Ember.Handlebars.helper('duration', function (startDate, endDate) {
    return moment.duration(moment(endDate).diff(startDate))
});

Ember.Handlebars.helper('format-markdown', function (input) {
    return new Handlebars.SafeString(showdown.makeHtml(input));
});


App.Router.map(function () {
    // this.route('socials', { path: "/*" });
    this.route('me', { path: "/me"}, function () {
        this.resource('experiences', { path: "/experiences"});  
        this.resource('about', {path:"/about"});      
    });
});

App.IndexRoute = Ember.Route.extend({
    beforeModel: function() {
        this.transitionTo('about');
    }
});

App.AboutRoute = Ember.Route.extend({
    model: function () {
        return Ember.$.getJSON('data/about.json')
            .then(getParams('description'))
            .then(function (about) {
                return about
            })
    }
})

App.MeRoute = Ember.Route.extend({
    model: function () {
        var promises = {
            'info': getMe()
        }

        return Ember.RSVP.hash(promises)
                .then(function (hash) {
                    return hash;
                });
    }
});

App.ExperiencesRoute = Ember.Route.extend({
    model: function () {
        return getExperiences();
    }
});

// App.SocialsRoute = Ember.Route.extend({
//     model: function () {
//         Ember.$.getJSON('data/base.json')
//                 .then(function (base) {
//                     console.log(base);
//                     return base;
//                 });
//     },

//     renderTemplate: function () {
//         var controller = this.controllerFor('socials');

//         this.render('socials', {
//             outlet: 'socials',
//             controller: controller
//         })
//     }
// });


App.ApplicationRoute = Ember.Route.extend({
  model: function() {
    return Ember.$.getJSON('data/base.json')
                .then(function (hash) {
                    console.log(hash)
                    return hash;
                });
  },
  afterModel: function(model) {
    App.set('currentUser', model)
  }
});

App.ApplicationController = Ember.Controller.extend({
  currentPathChanged: function() {
    var page;

    Ember.run.next(function() {
      if (!Ember.isNone(_gaq)) {
        page = window.location.hash.length > 0 ?
               window.location.hash.substring(1) :
               window.location.pathname;
        _gaq.push(['_trackPageview', page]);
      }
    });
  }.observes('currentPath')
});
