var attr = DS.attr;

App = Ember.Application.create();
showdown = new Showdown.converter()

var getParams = function (param) {
    return function (element) {
        return Ember.$.ajax({
                url: element['_'+param]
            }).then(function (data) {
                element[param] = data;
                return element;
            });
    }
}

var getDescriptions = function (param) {
    return function (experiences) {
        var promises = experiences.map(getParams(param));
        return Ember.RSVP.all(promises).then(function (result) {
            return result;
        });
    }
}

var getInfo = function () {
    return Ember.$.getJSON('data/me.json')
            .then(getParams('description'))
            .then(function (result) {
                return result;
            });
}

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
})

Ember.Handlebars.helper('format-markdown', function (input) {
    return new Handlebars.SafeString(showdown.makeHtml(input));
});


App.Router.map(function () {
    this.resource('me');
})

App.IndexRoute = Ember.Route.extend({
    beforeModel: function() {
        this.transitionTo('me');
    }
})

App.MeRoute = Ember.Route.extend({
    model: function () {
        var promises = {
            'info': getInfo(),
            'experiences': getExperiences()
        }

        return Ember.RSVP.hash(promises)
                .then(function (hash) {
                    return hash;
                });
    }
})


//App.Router.map(function() {
//     this.resource('me', function() {
//       this.resource('experiences'); // This will be foo.bar.baz
//     });
// });


// App.MeRoute = Ember.Route.extend({
//      model: getMe
// });

// App.ExperiencesRoute = Ember.Route.extend({
//     model: getExperiences;
// })

