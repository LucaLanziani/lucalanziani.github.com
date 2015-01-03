(function () {
  "use strict";

  var main = function (DS, Ember, Handlebars, Showdown, moment, gaq, window, jQuery) {

    var App = Ember.Application.create();
    var showdown = new Showdown.converter({ extensions: ['twitter'] });

    var getParams = function (param) {
      return function (element) {
        return Ember.$.ajax({
          url: element['_' + param]
        }).then(function (data) {
          element[param] = data;
          return element;
        });
      };
    };

    var getDescriptions = function (param) {
      return function (experience) {
        var promises = experience.map(getParams(param));
        return Ember.RSVP
          .all(promises)
          .then(function (result) {
            return result;
          });
      };
    };

    var getMe = function () {
      return Ember.$.getJSON('data/base.json')
        .then(function (result) {
          return result;
        });
    };

    var getExperience = function () {
      return Ember.$.getJSON('data/experience.json')
        .then(getDescriptions('description'))
        .then(function (result) {
          return result;
        });
    };


    Ember.Handlebars.helper('format-date', function (date) {
      if (date.length === 0) {
        return "Now";
      }
      return moment(date).format('MM/YYYY');
    });

    Ember.Handlebars.helper('duration', function (startDate, endDate) {
      return moment.duration(moment(endDate).diff(startDate));
    });

    Ember.Handlebars.helper('format-markdown', function (input) {
      return new Handlebars.SafeString(showdown.makeHtml(input));
    });

    App.Router.map(function () {
      // this.route('socials', { path: "/*" });
      this.route('me', { path: "/me"}, function () {
        this.resource('experience', { path: "/experience"});
        this.resource('about', {path: "/about"});
      });
    });

    App.IndexRoute = Ember.Route.extend({
      beforeModel: function () {
        this.transitionTo('about');
      }
    });

    App.AboutRoute = Ember.Route.extend({
      model: function () {
        return Ember.$.getJSON('data/about.json')
          .then(getParams('description'))
          .then(function (about) {
            return about;
          });
      }
    });

    App.MeRoute = Ember.Route.extend({
      model: function () {
        var promises = {
          'info': getMe()
        };

        return Ember.RSVP.hash(promises)
          .then(function (hash) {
            return hash;
          });
      }
    });

    App.ExperienceRoute = Ember.Route.extend({
      model: function () {
        return getExperience();
      }
    });

    App.ApplicationRoute = Ember.Route.extend({
      model: function () {
        return Ember.$.getJSON('data/base.json')
          .then(function (hash) {
            return hash;
          });
      },
      afterModel: function (model) {
        App.set('currentUser', model);
      }
    });

    App.ApplicationController = Ember.Controller.extend({
      currentPathChanged: function () {
        var page;

        Ember.run.next(function () {
          if (!Ember.isNone(gaq)) {
            page = window.location.hash.length > 0 ?
                 window.location.hash.substring(1) :
                 window.location.pathname;
            gaq.push(['_trackPageview', page]);
          }
        });
      }.observes('currentPath')
    });

    var mustache = function () {
      jQuery('img[alt=me]').each(function () {
        var img = this;
        var oldSrc = img.src;
        img.src = 'http://mustachify.me/?src=' + encodeURIComponent(img.src);
        setTimeout(function () {
          img.src = oldSrc;
        }, 10000);
      });
    };

  };

  function start() {
    try {
      jQuery(document).ready(function ($) {
        main(DS, Ember, Handlebars, Showdown, moment, _gaq, window, $);
      });
    } catch(err) {
      if ( err.name === "ReferenceError" ) {
        setTimeout(start, 0);
      } else {
        throw err;
      }
    }
  }

  start();
}());