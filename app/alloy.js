// Kinvey
var Kinvey = Alloy.Globals.Kinvey = require('kinvey-titanium-sdk-3.4.4');
Alloy.Globals.checkUser = function(callback) {
	var promise = Kinvey.initialize({
		appKey : 'kid_b1vnajEDkl',
		appSecret : '10609ec172544ae6b75923af98bfab95'
	});

	promise.then(function(user) {
		//Alloy.Globals.setupPushNotifications();

		// If user is logged in using default user, the app will ask her login on every app load
		console.log('CHECK USER = ', Titanium.App.Properties.getString('defaultUser'));
		if (Titanium.App.Properties.getString('defaultUser') == true) {
			callback();
			return;
		}

		if (!user) {// For testing!
			callback();

		} else {

			var thisUser = Kinvey.User.getActiveUser();
			//TODO: download all the reqired data and save it in 'appdata'
			callback(thisUser);
		}

	}, function(error) {
		console.log("NO USER!!");
		//errorCallback(error);
		callback();
	});

};

// Initialice jolicode pageflow
Alloy.Globals.jolicode = {};
Alloy.Globals.jolicode.pageflow = {};
Alloy.Globals.jolicode.pageflow.height = Ti.Platform.displayCaps.platformHeight;
Alloy.Globals.jolicode.pageflow.width = Ti.Platform.displayCaps.platformWidth;

if (OS_ANDROID) {
	Alloy.Globals.jolicode.pageflow.height = Ti.Platform.displayCaps.platformHeight / Ti.Platform.displayCaps.logicalDensityFactor;
	Alloy.Globals.jolicode.pageflow.width = Ti.Platform.displayCaps.platformWidth / Ti.Platform.displayCaps.logicalDensityFactor;
}

/* ------------------------------------------ Defining Alloy variables ----------------------------------------------- */
Alloy.Globals.globalValues = {

	colors : {
		theme : '#304158',
		button : '#F3702B',
		red : '#cc0000',
		gray : '#898989'
	}
};

Alloy.Globals.appData = {
	"details" : [],
	"bands" : [],
	"shows" : [],
	"venues" : []
};

Alloy.Globals.loading = Alloy.createWidget('nl.fokkezb.loading');
Alloy.Globals.UTILS = require('Utils');
Alloy.Globals.API = require('Api');

// TOAST - https://github.com/FokkeZB/nl.fokkezb.toast
var toast = Alloy.createWidget('nl.fokkezb.toast', 'global', {
	// defaults
});
Alloy.Globals.toast = toast.show;
// same as toast.info
Alloy.Globals.error = toast.error;
// applies the 'error' theme

// Set userdata
if (!Titanium.App.Properties.getObject('userdata')) {
	Titanium.App.Properties.setObject('userdata', {});
};

/* ------------------------------------------ Defining Alloy variables ----------------------------------------------- */
Alloy.Globals.scheduleEventListeners = [];

// Common function to open a window
Alloy.Globals.openWindow = function(controller, arguments, newOne, titleText) {

	if (Alloy.Globals.pageflow.getCurrentPage() == null || newOne === true) {

		Alloy.Globals.pageflow.addChild({
			arguments : arguments,
			controller : controller,
			backButton : {
				tintColor : '#ffffff',
				title : '\uf060',
				width : '55dp',
				height : '35dp',
				left : 0,
				backgroundColor : 'transparent',
				borderColor : 'transparent',
				font : {
					fontSize : '16dp',
					fontFamily : "FontAwesome"
				},
				hidden : newOne === true ? false : true
			},
			navBar : {
				backgroundColor : '#000',
				left : 'Misc/LeftNavView',
				// right : 'Misc/NavRightMenu',
				title : titleText,
				center : 'Misc/CenterNavView',
				titleOptions : {
					color : '#fff',
					font : {
						fontSize : '15dp'
					},
					width : Titanium.UI.SIZE
				}
			},
			direction : {
				top : 0,
				left : 1
			}
		});

		if (!newOne) {

			currentPage = controller;
		}
	} else if (currentPage != controller) {

		Alloy.Globals.pageflow.replacePage(0, {
			arguments : arguments,
			controller : controller,
			backButton : {
				hidden : true
			},
			navBar : {
				backgroundColor : '#000',
				left : 'Misc/LeftNavView',
				right : rightView,
				title : titleText,
				center : 'Misc/CenterNavView',
				titleOptions : {
					color : '#fff',
					font : {
						fontSize : '15dp'
					},
					width : Titanium.UI.SIZE
				}
			},
			direction : {
				top : 0,
				left : 1
			}
		});
		currentPage = controller;
	}
};

Alloy.Globals.getAndStoreData = function(callback) {

	Alloy.Globals.loading.show();
	// Alloy.Globals.getBanners();

	var api = require('Api');;
	var count = 0,
	    fails = 0;

	var getBandList = new api.getBandList(function(data) {

		count++;
		console.debug("count++", count);
		if (count === 3) {
			var fetchedData = Alloy.Globals.combinedDetails();
			callback(fetchedData);
		}

	}, function(error) {

		fails++;
		console.debug("fails ", fails);
		callback(false);

	});
	var getVenueList = new api.getVenueList(function(data) {

		count++;
		console.debug("count++", count);
		if (count === 3) {
			var fetchedData = Alloy.Globals.combinedDetails();
			callback(fetchedData);
		}

	}, function(error) {

		fails++;
		console.debug("fails ", fails);
		callback(false);

	});
	var getShowList = new api.getShows(function(data) {

		count++;
		console.debug("count++", count);
		if (count === 3) {
			var fetchedData = Alloy.Globals.combinedDetails();
			callback(fetchedData);
		}

	}, function(error) {

		fails++;
		console.debug("fails ", fails);
		callback(false);

	});
};

Alloy.Globals.combinedDetails = function() {

	var appdata = Titanium.App.Properties.getObject('appdata', {});
	var combinedData = [];

	/*for (var i = 0,bandLen = appdata.bands.length; i < bandLen; i++) {
	 var bandProfile = {};
	 bandProfile.bandDetails = appdata.bands[i];

	 for (var j = 0,showLen = appdata.shows.length; j < showLen; j++) {

	 if (appdata.shows[j].band_id === bandProfile.bandDetails._id) {
	 bandProfile.showDetails = JSON.parse(JSON.stringify(appdata.shows[j]));
	 // } else {
	 // continue;

	 for (var k = 0,venueLen = appdata.venues.length; k < venueLen; k++) {
	 if (bandProfile.showDetails.venue_id === appdata.venues[k]._id) {
	 bandProfile.venueDetails = JSON.parse(JSON.stringify(appdata.venues[k]));
	 combinedData.push(bandProfile);
	 }
	 }
	 }
	 }
	 }*/

	for (var j = 0,
	    showLen = appdata.shows.length; j < showLen; j++) {
		var bandProfile = {};
		bandProfile.showDetails = JSON.parse(JSON.stringify(appdata.shows[j]));
		// Find the matching band
		for (var i = 0,
		    bandLen = appdata.bands.length; i < bandLen; i++) {
			if (appdata.bands[i]._id == bandProfile.showDetails.band_id) {
				bandProfile.bandDetails = JSON.parse(JSON.stringify(appdata.bands[i]));
				break;
			}
		}
		// Find the matching venue
		for (var k = 0,
		    venueLen = appdata.venues.length; k < venueLen; k++) {
			if (appdata.venues[k]._id == bandProfile.showDetails.venue_id) {
				bandProfile.venueDetails = JSON.parse(JSON.stringify(appdata.venues[k]));
				break;
			}
		}
		combinedData.push(bandProfile);
	}

	console.debug("JSON.stringify(combinedData) ", JSON.stringify(combinedData));
	// Setting all details in appdata
	appdata.details = JSON.parse(JSON.stringify(combinedData));
	Titanium.App.fireEvent('get_next_show');
	Titanium.App.Properties.setObject('appdata', appdata);
	Alloy.Globals.loading.hide();

	console.debug("appdata details ", JSON.stringify(Titanium.App.Properties.getObject('appdata')));
	return true;
};

// Format date object
Alloy.Globals.getFormattedDate = function(timestamp) {
	var momentjs = require('moment');
	var dateObj = momentjs(timestamp * 1000);
	var dateString = [];
	dateString[0] = dateObj.format('dddd, MMMM, Do');
	dateString[1] = dateObj.format('h:mm a');
	console.debug(JSON.stringify(dateString));
	return dateString;
};

