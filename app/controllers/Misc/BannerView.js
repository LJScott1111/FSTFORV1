var nsBanner = {};
var utils = Alloy.Globals.UTILS;
var Kinvey = Alloy.Globals.Kinvey;

nsBanner.init = function() {

	var banner = utils.getRandomBanner();
	$.bannerImage.image = banner.image;

	$.bannerView.addEventListener('click', function() {
		Alloy.Globals.openWindow('Misc/WebViewWithoutBanner', {
			url : banner.link
		}, true);
	});
}();
