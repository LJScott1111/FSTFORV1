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

api.getSpeakers = function(success, fail) {

	var dataStore = Kinvey.DataStore.collection('FestForumSpeakers', Kinvey.DataStoreType.Sync);

	// Pull data from the backend and save it to the cache.
	var promise = dataStore.pull().then(function onSuccess(entities) {
		console.log('SPEAKERS! ', JSON.stringify(entities));
		success(entities);
	}).catch(function onError(error) {
		console.error('SPEAKERS ERROR! ', JSON.stringify(error));
		fail();
	});

	/*
	 var stream = dataStore.find();
	 stream.subscribe(function onNext(entity) {
	 // ...
	 console.log('RECEIVING ENTITIES ', JSON.stringify(entity));
	 }, function onError(error) {
	 // ...
	 console.error('ERROR SPEAKERS ', JSON.stringify(error));
	 }, function onComplete(data) {
	 // ...
	 console.log('SUCCESS SPEAKERS', JSON.stringify(data));
	 });
	 */

};

api.getSponsors = function(success, fail) {

	var dataStore = Kinvey.DataStore.collection('FestForumSponsors', Kinvey.DataStoreType.Sync);

	// Pull data from the backend and save it to the cache.
	var promise = dataStore.pull().then(function onSuccess(entities) {
		console.log('SPONSORS! ', JSON.stringify(entities));
		success(entities);
	}).catch(function onError(error) {
		console.error('SPONSORS ERROR! ', JSON.stringify(error));
		fail();
	});
};

api.getAttendees = function(success, fail) {

	var dataStore = Kinvey.DataStore.collection('FestForumAttendees', Kinvey.DataStoreType.Sync);

	// Pull data from the backend and save it to the cache.
	var promise = dataStore.pull().then(function onSuccess(entities) {
		console.log('ATTENDEES! ', JSON.stringify(entities));
		success(entities);
	}).catch(function onError(error) {
		console.error('ATTENDEES ERROR! ', JSON.stringify(error));
		fail();
	});
};

api.getSchedule = function(success, fail) {

	var dataStore = Kinvey.DataStore.collection('FestForumSchedule', Kinvey.DataStoreType.Sync);

	// Pull data from the backend and save it to the cache.
	var promise = dataStore.pull().then(function onSuccess(entities) {
		console.log('SCHEDULE! ', JSON.stringify(entities));
		success(entities);
	}).catch(function onError(error) {
		console.error('SCHEDULE ERROR! ', JSON.stringify(error));
		fail();
	});
};

// Get user schedule
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
