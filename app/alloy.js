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
	"venues" : [],
	speakers : [],
	sponsors : [],
	attendees : []
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

