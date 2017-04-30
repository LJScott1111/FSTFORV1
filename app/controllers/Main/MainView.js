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

};

nsMainView.openAttendees = function() {

};

nsMainView.openSocial = function() {

};

nsMainView.openRegister = function() {

	Alloy.Globals.openWindow("Misc/WebLinkView", {
		url : "http://festforums.ticketmob.com/event.cfm?cart&id=153670",
	}, true);
};

nsMainView.createBlock = function(block, labelText, callback, side) {

	var leftBlockProp = {
		properties : {
			left : '4dp',
			top : '4dp',
			borderColor : '#000',
			width : blockWidth,
			height : blockWidth,
			// backgroundImage: bgImage
		}
	};

	var rightBlockProp = {
		properties : {
			right : '4dp',
			top : '4dp',
			borderColor : '#000',
			width : blockWidth,
			height : blockWidth,
			// backgroundImage: bgImage
		}
	};

	if (side == 'left') {
		leftBlockProp.text = labelText;
		leftBlockProp.callback = callback;
		block.add(Alloy.createController('Misc/MainNavOptionBlock', leftBlockProp).getView());
	} else {
		rightBlockProp.text = labelText;
		rightBlockProp.callback = callback;
		block.add(Alloy.createController('Misc/MainNavOptionBlock', rightBlockProp).getView());
	}
};

nsMainView.init = function() {
	$.vwMain.addEventListener('postlayout', nsMainView.postlayoutCall);

	nsMainView.createBlock($.blockOne, L('speakers'), nsMainView.openSpeaker, 'left');
	nsMainView.createBlock($.blockOne, L('schedule'), nsMainView.openSchedule, 'right');

	nsMainView.createBlock($.blockTwo, L('mySchedule'), nsMainView.openMySchedule, 'left');
	nsMainView.createBlock($.blockTwo, L('chat'), nsMainView.openChat, 'right');

	nsMainView.createBlock($.blockThree, L('sponsors'), nsMainView.openSponsors, 'left');
	nsMainView.createBlock($.blockThree, L('attendees'), nsMainView.openAttendees, 'right');

	nsMainView.createBlock($.blockFour, L('social'), nsMainView.openSocial, 'left');
	nsMainView.createBlock($.blockFour, L('register'), nsMainView.openRegister, 'right');

}();
