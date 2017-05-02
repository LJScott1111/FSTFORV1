var nsMainView = {};
// Calculate device width to set half of it as block height and width
var deviceWidth = Ti.Platform.displayCaps.platformWidth;
var blockWidth = deviceWidth * 0.485;

nsMainView.postlayoutCall = function() {
	// console.log('CHECK USER = ', Titanium.App.Properties.getString('defaultUser'));
	// if (Titanium.App.Properties.getString('defaultUser') == true) {

	Alloy.Globals.checkUser(function(user) {
		if (!user || user == null) {
			Alloy.createController('Auth/Login', {
				callback : function() {
					console.log('CALLBACK!');
				}
			}).getView().open();
		} else {
			console.log('USER ', user);
			// Save user details TODO
		}
	});

	// }

	$.vwMain.removeEventListener('postlayout', nsMainView.postlayoutCall);
	return;
};

nsMainView.openSpeaker = function() {

	Alloy.Globals.openWindow('Speakers/Speakers', {}, true);
};

nsMainView.openSchedule = function() {

};

nsMainView.openMySchedule = function() {

};

nsMainView.openChat = function() {

};

nsMainView.openSponsors = function() {

	Alloy.Globals.openWindow('Sponsors/Sponsors', {}, true);
};

nsMainView.openAttendees = function() {

	Alloy.Globals.openWindow('Attendees/AttendeesList', {}, true);
};

nsMainView.openSocial = function() {
	Alloy.Globals.openWindow('MiscScreens/NewsSocial', {}, true);
};

nsMainView.openRegister = function() {

	Alloy.Globals.openWindow("Misc/WebLinkView", {
		url : "http://festforums.ticketmob.com/event.cfm?cart&id=153670",
	}, true);
};

nsMainView.createBlock = function(block, data, callback, side) {

	var leftBlockProp = {
		properties : {
			left : '4dp',
			top : '4dp',
			width : blockWidth,
			height : blockWidth,
			backgroundImage : data.bgImage
		}
	};

	var rightBlockProp = {
		properties : {
			right : '4dp',
			top : '4dp',
			width : blockWidth,
			height : blockWidth,
			backgroundImage : data.bgImage
		}
	};

	if (side == 'left') {
		leftBlockProp.text = data.labelText;
		leftBlockProp.callback = callback;
		block.add(Alloy.createController('Misc/MainNavOptionBlock', leftBlockProp).getView());
	} else {
		rightBlockProp.text = data.labelText;
		rightBlockProp.callback = callback;
		block.add(Alloy.createController('Misc/MainNavOptionBlock', rightBlockProp).getView());
	}
};

nsMainView.init = function() {
	$.vwMain.addEventListener('postlayout', nsMainView.postlayoutCall);

	nsMainView.createBlock($.blockOne, {
		labelText : L('speakers'),
		bgImage : '/graphics/speakers.png'
	}, nsMainView.openSpeaker, 'left');

	nsMainView.createBlock($.blockOne, {
		labelText : L('schedule'),
		bgImage : '/graphics/schedule.png'
	}, nsMainView.openSchedule, 'right');

	nsMainView.createBlock($.blockTwo, {
		labelText : L('mySchedule'),
		bgImage : '/graphics/myschedule.png'
	}, nsMainView.openMySchedule, 'left');

	nsMainView.createBlock($.blockTwo, {
		labelText : L('chat'),
		bgImage : '/graphics/chat.png'
	}, nsMainView.openChat, 'right');

	nsMainView.createBlock($.blockThree, {
		labelText : L('sponsors'),
		bgImage : '/graphics/sponsors.png'
	}, nsMainView.openSponsors, 'left');

	nsMainView.createBlock($.blockThree, {
		labelText : L('attendees'),
		bgImage : '/graphics/attendees.png'
	}, nsMainView.openAttendees, 'right');

	nsMainView.createBlock($.blockFour, {
		labelText : L('social'),
		bgImage : '/graphics/social.png'
	}, nsMainView.openSocial, 'left');

	nsMainView.createBlock($.blockFour, {
		labelText : L('register'),
		bgImage : '/graphics/register.png'
	}, nsMainView.openRegister, 'right');

}();
