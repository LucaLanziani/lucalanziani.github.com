(function(){"use strict";var e=typeof window!="undefined"?window:global;if(typeof e.require=="function")return;var t={},n={},r=function(e,t){return{}.hasOwnProperty.call(e,t)},i=function(e,t){var n=[],r,i;/^\.\.?(\/|$)/.test(t)?r=[e,t].join("/").split("/"):r=t.split("/");for(var s=0,o=r.length;s<o;s++)i=r[s],i===".."?n.pop():i!=="."&&i!==""&&n.push(i);return n.join("/")},s=function(e){return e.split("/").slice(0,-1).join("/")},o=function(t){return function(n){var r=s(t),o=i(r,n);return e.require(o)}},u=function(e,t){var r={id:e,exports:{}};t(r.exports,o(e),r);var i=n[e]=r.exports;return i},a=function(e){var s=i(e,".");if(r(n,s))return n[s];if(r(t,s))return u(s,t[s]);var o=i(s,"./index");if(r(n,o))return n[o];if(r(t,o))return u(o,t[o]);throw new Error('Cannot find module "'+e+'"')},f=function(e){for(var n in e)r(e,n)&&(t[n]=e[n])};e.require=a,e.require.define=f,e.require.brunch=!0})(),window.require.define({Application:function(e,t,n){Application={initialize:function(){var e=t("models/Me"),n=t("views/MeView"),r=new e,i=new n({model:r});typeof Object.freeze=="function"&&Object.freeze(this)}},n.exports=Application}}),window.require.define({"collections/Busses":function(e,t,n){var r=t("core/Collection"),i=t("models/Bus"),s=r.extend({model:i,url:"/busses",initialize:function(){this.prefix=""},setUrl:function(e,t,n){n&&(this.prefix=n),router.navigate(this.prefix+this.url,{trigger:e})}});n.exports=s}}),window.require.define({"collections/Directions":function(e,t,n){var r=t("core/Collection"),i=t("models/Direction"),s=r.extend({model:i,url:"/directions",initialize:function(){this.on("change",this.setSelectedOnUrl),this.prefix=""},parseSelected:function(){var e=this.filter(function(e){return e.get("checked")}),t=_.map(e,function(e){return e.get("id")});return t.join("-")},setSelectedOnUrl:function(){this.setUrl(!1)},setUrl:function(e,t,n){n&&(this.prefix=n);var r=this.parseSelected();if(r.length>0){var i=[this.prefix+this.url,r];t&&i.push(t),console.log("DIRECTIONS: "+i),router.navigate(i.join("/"),{trigger:e})}else router.navigate(this.prefix+this.url,{trigger:e})},goToStation:function(){var e=["getstations",this.parseSelected()];router.navigate(e.join("/"),{trigger:!0,replace:!0}),this.setUrl(!1,"stations")}});n.exports=s}}),window.require.define({"collections/Lines":function(e,t,n){var r=t("core/Collection"),i=t("models/Line"),s=r.extend({model:i,url:"/lines",initialize:function(){this.on("change",this.setLines)},parseSelected:function(){var e=this.filter(function(e){return e.get("checked")}),t=_.map(e,function(e){return e.get("number")});return t.join("-")},setLines:function(){this.setUrl(!1)},getSelected:function(){this.setUrl(!0,"directions")},setUrl:function(e,t,n){this.prefix||(this.prefix=n||"");var r=this.parseSelected();console.log(r);if(r.length>0){var i=[this.prefix+this.url,r];t&&i.push(t),console.log(i),router.navigate(i.join("/"),{trigger:e})}else router.navigate(this.prefix+this.url,{trigger:e})},goToDirections:function(){var e=["getdirections",this.parseSelected()];console.log(e),router.navigate(e.join("/"),{trigger:!0,replace:!0}),this.setUrl(!1,"directions")}});n.exports=s}}),window.require.define({"collections/Stations":function(e,t,n){var r=t("core/Collection"),i=t("models/Station"),s=r.extend({model:i,url:"/stations",initialize:function(){this.prefix=""},setUrl:function(e,t,n){n&&(this.prefix=n),router.navigate(this.prefix+this.url,{trigger:e})}});n.exports=s}}),window.require.define({"config/ApplicationConfig":function(e,t,n){var r=function(){var e="/";return{BASE_URL:e}}.call();n.exports=r}}),window.require.define({"core/Collection":function(e,t,n){Collection=Backbone.Collection.extend({}),n.exports=Collection}}),window.require.define({"core/Model":function(e,t,n){Model=Backbone.Model.extend({}),n.exports=Model}}),window.require.define({"core/Router":function(e,t,n){Router=Backbone.Router.extend({routes:{},initialize:function(e){}}),n.exports=Router}}),window.require.define({"core/View":function(e,t,n){t("helpers/ViewHelper"),View=Backbone.View.extend({template:function(){},getRenderData:function(){},initialize:function(){this.render=_.bind(this.render,this)},render:function(){return this.$el.html(this.template(this.getRenderData())),this.afterRender(),this},afterRender:function(){}}),n.exports=View}}),window.require.define({"events/ApplicationEvents":function(e,t,n){var r=function(){var e="onApplicationInitialized";return{APPLICATION_INITIALIZED:e}}.call();n.exports=ApplicationConfig}}),window.require.define({"helpers/ViewHelper":function(e,t,n){Handlebars.registerHelper("link",function(e,t){e=Handlebars.Utils.escapeExpression(e),t=Handlebars.Utils.escapeExpression(t);var n='<a href="'+t+'">'+e+"</a>";return new Handlebars.SafeString(n)})}}),window.require.define({initialize:function(e,t,n){application=t("Application"),$(function(){application.initialize()})}}),window.require.define({"models/Me":function(e,t,n){var r=t("core/Model"),i=r.extend({urlRoot:"json/",id:"me.json",parse:function(e){return e}});n.exports=i}}),window.require.define({"routers/ApplicationRouter":function(e,t,n){var r=t("core/Router"),i=t("Application"),s=function(e,t){t=t||"",json_lines=t.split("-"),e.each(function(e){_.contains(json_lines,e.id)&&e.set({checked:!0},{silent:!0})}),e.trigger("change")},o;ApplicationRouter=r.extend({routes:{"":"home","getstations/:directions":"loadOnlyStations","getdirections/:lines":"loadOnlyDirections",lines:"loadLines","lines/":"loadLines","lines/:lines":"loadLines","lines/:lines/":"loadLines","lines/:lines/directions":"loadDirections","lines/:lines/directions/":"loadDirections","lines/:lines/directions/:directions":"loadDirections","lines/:lines/directions/:directions/":"loadDirections","lines/:lines/directions/:directions/stations":"loadMap"},home:function(){i.lines.fetch({success:function(e){e.setUrl(!1,"",Backbone.history.fragment)}})},loadLines:function(e){i.lines.fetch({success:function(t){s(t,e)}})},loadDirections:function(e,t){i.lines.fetch({success:function(n){s(n,e),i.directions.fetch({data:{lines:e},success:function(e){e.setUrl(!1,"",Backbone.history.fragment),t&&s(e,t)},error:function(){console.log("Fail")}})}})},loadMap:function(e,t){i.lines.fetch({success:function(n){s(n,e),i.directions.fetch({data:{lines:e},success:function(e){console.log(Backbone.history.fragment),e.setUrl(!1,"",Backbone.history.fragment),console.log(t),t&&s(e,t),i.stations.fetch({data:{directions:t},success:function(e){i.main_view.showLegend(i.directions),e.setUrl(!1,"",Backbone.history.fragment)}}),i.busses.fetch({data:{directions:t}}),o=setInterval(function(){i.busses.fetch({data:{directions:t}})},2e3)},error:function(){console.log("Fail")}})}})},loadOnlyDirections:function(e){var t=["lines",i.lines.parseSelected()],t=t.join("/");i.directions.fetch({data:{lines:e},success:function(e){e.setUrl(!1,"",t)}})},loadOnlyStations:function(e){i.stations.fetch({data:{directions:e},succes:function(){i.main_view.showLegend(i.directions)}}),clearInterval(o),o=setInterval(function(){i.busses.fetch({data:{directions:e}})},2e3)}}),n.exports=ApplicationRouter}}),window.require.define({"utils/BackboneView":function(e,t,n){var r=t("core/View"),i=t("templates/HomeViewTemplate");BackboneView=r.extend({id:"view",template:i,initialize:function(){this.render=_.bind(this.render,this)},render:function(){return this.$el.html(this.template(this.getRenderData())),this},getRenderData:function(){return{content:"View Content"}}}),n.exports=BackboneView}}),window.require.define({"views/MeView":function(e,t,n){var r=t("core/View"),i=t("templates/MeTemplate"),s=r.extend({el:$("#MyDesc"),template:i,initialize:function(){_.bindAll(this,"render"),this.model.on("change",this.render)},render:function(){this.$el.empty();var e=this.model.attributes,t={desc:JSON.stringify(e.desc,null,4)};this.$el.html(this.template(t))}});n.exports=s}})