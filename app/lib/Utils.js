var utils = {};

utils.validateEmail = function(emailValue) {
	var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return emailRegex.test(emailValue);
};

utils.validatePassword = function(passValue) {
	var passRegex = /^[A-Za-z]\w{5,14}$/;
	return passRegex.test(passValue);
};

utils.validateZeroLength = function(string) {
	return (string.trim().length != 0);
};

utils.getDateFormatted = function(date) {
	var momentjs = require("alloy/moment");
	var dateObj = momentjs(date);
	var dateString = "";
	dateString = momentjs(date).format('YYYY-MM-DD');
	return dateString;
};

// Function to sort array
utils.sortArray = function(prop) {
	return function(a, b) {
		if (a[prop] > b[prop]) {
			return 1;
		} else if (a[prop] < b[prop]) {
			return -1;
		}
		return 0;
	};
};

utils.downloadAppdata = function(fail, callback) {

	Alloy.Globals.loading.show();
	Alloy.Globals.API.getSpeakers(function(speakersData) {

		Alloy.Globals.loading.hide();
		console.log('SPEAKERS DOWNLOADED ', JSON.stringify(speakersData));
		
		// Save the data in local
		var appdata = Titanium.App.Properties.getObject('appdata');
		appdata.speakers = JSON.parse(JSON.stringify(speakersData));
		Titanium.App.Properties.setObject('appdata', appdata);

		if (callback) {
			callback();
		};
	}, function(error) {
		Alloy.Globals.loading.hide();
		if (fail) {
			fail();
		};
		console.error('SPEAKERS FAILED');
	});
};

module.exports = utils; 