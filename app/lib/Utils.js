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

utils.validateName = function(nameValue) {
	var nameRagex = /^[a-zA-Z ]{5,30}$/;
	return nameRagex.test(nameValue);
};

utils.getDateFormatted = function(date) {
	var momentjs = require("alloy/moment");
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

utils.getDay = function(timestamp) {

	var momentjs = require("alloy/moment");
	var dateObj = momentjs(timestamp * 1000);
	return dateObj.format('dddd');
};

utils.getRandomBanner = function() {

	if (Alloy.Globals.banners.length == 0) {
		Alloy.Globals.banners = JSON.parse(JSON.stringify(Titanium.App.Properties.getObject('appdata').banners));
	};

	// get a random array element from
	var random = Math.floor(Math.random() * Alloy.Globals.banners.length);

	var randomObj = Alloy.Globals.banners[random];
	Alloy.Globals.randomObj = randomObj;
	// console.log('RANDOM ELEMENT ', randomObj);

	Alloy.Globals.banners.splice(random, 1);
	return randomObj;
};

utils.downloadAppdata = function(fail, callback) {

	Alloy.Globals.loading.show();
	Alloy.Globals.API.getSpeakers(function(speakersData) {

		// Save the data in local
		var appdata = Titanium.App.Properties.getObject('appdata');
		appdata.speakers = JSON.parse(JSON.stringify(speakersData));

		Alloy.Globals.API.getSponsors(function(sponsorsData) {

			appdata.sponsors = JSON.parse(JSON.stringify(sponsorsData));

			Alloy.Globals.API.getAttendees(function(attendeesData) {

				appdata.attendees = JSON.parse(JSON.stringify(attendeesData));

				Alloy.Globals.API.getSchedule(function(scheduleData) {

					appdata.schedule = JSON.parse(JSON.stringify(scheduleData));

					Alloy.Globals.API.getBanners(function(bannersData) {

						appdata.banners = JSON.parse(JSON.stringify(bannersData));
						
						// pull the groups for chat
						Alloy.Globals.API.getGroups(function(groupsData) {
							Alloy.Globals.loading.hide();
							
							appdata.groups = JSON.parse(JSON.stringify(groupsData));
							Titanium.App.Properties.setObject('appdata', appdata);

							if (callback) {
								callback();
							};
						}, function( error ) {
							Alloy.Globals.loading.hide();
							if (fail) {
								fail();
							};
						});
						
					}, function(error) {
						Alloy.Globals.loading.hide();
						if (fail) {
							fail();
						};
					});

				}, function(error) {
					Alloy.Globals.loading.hide();
					if (fail) {
						fail();
					};
				});

			}, function(error) {
				Alloy.Globals.loading.hide();
				if (fail) {
					fail();
				};
			});

		}, function(error) {
			Alloy.Globals.loading.hide();
			if (fail) {
				fail();
			};
		});

	}, function(error) {
		Alloy.Globals.loading.hide();
		if (fail) {
			fail();
		};
		console.error('SPEAKERS FAILED');
	});
};

module.exports = utils;
