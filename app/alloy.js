//Urban Airship
var UrbanAirship = require('com.urbanairship');
Alloy.Globals.UrbanAirship = UrbanAirship;
var channelId = UrbanAirship.channelId;
console.log('UA ChannelID:', channelId);
UrbanAirship.userNotificationsEnabled = true;
// UrbanAirship.setUserNotificationsEnabled(true);
UrbanAirship.addEventListener(UrbanAirship.EVENT_PUSH_RECEIVED, function(e) {
	Ti.API.info('Push received' + e.message);
	alert(e.message);
});
Titanium.UI.iPhone.appBadge = 0;

var deviceToken = null;

// Process incoming push notifications
function receivedPushNotification(e) {
	alert('Received push: ' + JSON.stringify(e));
}

// Save the device token for subsequent API calls
function deviceTokenSuccess(e) {
	if (Kinvey.getActiveUser() == null) {
		// Error: there must be a logged-in user.
	} else {
		Kinvey.Push.register(e.deviceToken).then(function() {
			// Successfully registered device with Kinvey.
			console.log('Registered for Kinvey push');
		}, function(error) {
			// Error registering device with Kinvey.
			console.log('Error registering device', error);
			alert(error.message);
		});
	}
};

function deviceTokenError(e) {
	alert('Failed to register for push notifications! ' + e.error);
};

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


// Pubnub
Alloy.Globals.Pubnub = require('pubnub.js')({
    publish_key       : 'pub-c-7cd54e26-ef61-4fca-bb9f-d036647d8155',
    subscribe_key     : 'sub-c-0549a7d8-345f-11e7-b3fb-0619f8945a4f',
    ssl               : false,
    native_tcp_socket : false,
    origin            : 'pubsub.pubnub.com'
});


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
		theme : '#27b5d4',
		button : '#F3702B',
		red : '#cc0000',
		gray : '#898989'
	}
};

Alloy.Globals.banners = [];

Alloy.Globals.appData = {
	speakers : [],
	sponsors : [],
	attendees : [],
	schedule : [],
	banners : []
};

Alloy.Globals.loading = Alloy.createWidget('nl.fokkezb.loading');
Alloy.Globals.UTILS = require('/Utils');
Alloy.Globals.API = require('/Api');

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
					fontSize : '22dp',
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
				// right : rightView,
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

