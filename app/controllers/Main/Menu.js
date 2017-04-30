var nsMenu = {};

$.register.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
	Alloy.Globals.openWindow("Misc/WebLinkView", {
		url : "http://festforums.ticketmob.com/event.cfm?cart&id=153670",
	}, true);
});

$.speakers.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');

	var schedule = {};

	Alloy.Globals.openWindow('Speakers/Speakers', {}, true);
});

$.schedule.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
});

$.sponsors.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
});

$.attendees.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
});

$.newsSocial.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
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

/*
 $.logout.button.addEventListener('click', function() {

 Ti.App.fireEvent('toggleMenu');
 });*/
