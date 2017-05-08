var nsMenu = {};

$.register.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
	Alloy.Globals.openWindow("Misc/WebLinkView", {
		url : "http://festforums.ticketmob.com/event.cfm?cart&id=153670",
	}, true);
});

$.speakers.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');

	Alloy.Globals.openWindow('Speakers/Speakers', {}, true);
});

$.schedule.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
	Alloy.Globals.openWindow('Schedule/Schedule', {}, true);
});

$.sponsors.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
	Alloy.Globals.openWindow('Sponsors/Sponsors', {}, true);
});

$.attendees.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
	Alloy.Globals.openWindow('Attendees/AttendeesList', {}, true);
});

$.newsSocial.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
	Alloy.Globals.openWindow('MiscScreens/NewsSocial', {}, true);
});

$.santaBarbara.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
	Alloy.Globals.openWindow("Misc/WebLinkView", {
		url : "http://www.festforums.com/welcome-sb17/",
	}, true);
});

$.pastEvents.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
	Alloy.Globals.openWindow("Misc/WebLinkView", {
		url : "http://www.festforums.com/past-events-1/",
	}, true);
});

$.whoWeAre.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
	Alloy.Globals.openWindow("Misc/WebLinkView", {
		url : "http://www.festforums.com/team/",
	}, true);
});

$.inTheMedia.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
	Alloy.Globals.openWindow("Misc/WebLinkView", {
		url : "http://www.festforums.com/media/",
	}, true);
});

$.contact.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
	Alloy.Globals.openWindow("Misc/WebLinkView", {
		url : "http://www.festforums.com/contact/",
	}, true);
});

$.privacyPolicy.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
	Alloy.Globals.openWindow("Misc/WebLinkView", {
		url : "http://www.festforums.com/privacy-policy",
	}, true);
});

$.messageCenter.button.addEventListener('click', function() {

	var UrbanAirship = Alloy.Globals.UrbanAirship;
	Ti.App.fireEvent('toggleMenu');
	UrbanAirship.displayMessageCenter();
});

$.logout.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
	var api = Alloy.Globals.API;
	api.logout(function(success) {
		Alloy.createController('Auth/Login', {
			callback : function() {
				$.loginView.height = Titanium.UI.SIZE;
				$.logoutView.height = 0;
			}
		}).getView().open();
	}, function(error) {
		var message = (error.message) ? error.message : L('err_generic');
		console.log('err.Message ', error.message);
		Alloy.Globals.error(message, {
			zIndex : 999,
			persistent : false,
		});
	});
});

$.login.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
	Alloy.createController('Auth/Login', {
		callback : function() {
			$.loginView.height = 0;
			$.logoutView.height = Titanium.UI.SIZE;
		}
	}).getView().open();
});

nsMenu.init = function() {

	if (Titanium.App.Properties.getString('defaultUser') == true) {
		$.loginView.height = Titanium.UI.SIZE;
		$.logoutView.height = 0;
	} else {
		$.loginView.height = 0;
		$.logoutView.height = Titanium.UI.SIZE;
	}
};

Titanium.App.addEventListener('onLogin', nsMenu.init);

nsMenu.init();
