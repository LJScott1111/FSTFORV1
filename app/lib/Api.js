/***
 Api.js

 */

var moment = require('alloy/moment');
var Kinvey = Alloy.Globals.Kinvey;

var api = {};

api.signup = function(args, success, fail) {

	var promise = Kinvey.User.signup({
		username : args.username,
		password : args.password,
		application : 'festforum'
	});

	Alloy.Globals.loading.show();

	promise.then(function(user) {

		Alloy.Globals.loading.hide();
		console.log("SIGNUP SUCCESS ", JSON.stringify(user));
		success(user);

	}, function(error) {

		Alloy.Globals.loading.hide();

		console.error("SIGNUP ERROR ", error);
		fail(error);
	});

};

api.login = function(args, success, fail) {
	var promise = Kinvey.User.login({
		username : args.username,
		password : args.password,
		application : 'festforum'
	});

	Alloy.Globals.loading.show();

	promise.then(function(user) {

		Alloy.Globals.loading.hide();
		console.log("LOGIN SUCCESS ", JSON.stringify(user));
		success(user);

	}, function(error) {

		Alloy.Globals.loading.hide();

		console.error("LOGIN ERROR ", error);
		fail(error);
	});
};

api.logout = function(args, success, fail) {
	var user = Kinvey.getActiveUser();
	if (null !== user) {
		var promise = Kinvey.User.logout();
		promise.then(function() {
			console.debug("Logout Success");
			Titanium.App.Properties.removeProperty('appdata');
			Titanium.App.Properties.removeProperty('userid');
			console.debug("Titanium.App.Properties.removeProperty('userid') ", Titanium.App.Properties.getString('userid'));
			Titanium.App.Properties.removeProperty('defaultUser', false);
			// onloadCallback();
		}, function(error) {
			console.debug("Logout Error");
			// errorCallback(error);
		});
	}
};

api.checkUser = function() {

	// To check if a person is logged in
	var promise = Kinvey.init({
		appKey : 'kid_b1vnajEDkl',
		appSecret : '10609ec172544ae6b75923af98bfab95'
	});
};

api.getUserSchedule = function(args, success, fail) {
	// Local DB
};

api.saveUserSchedule = function(args, success, fail) {
	// Local DB
};

api.deleteUserSchedule = function(args, success, fail) {
	// Local DB
};

module.exports = api;
