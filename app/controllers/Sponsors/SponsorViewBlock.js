var nsSponsorView = {};

nsSponsorView.setDimensions = function() {
	var imageWidth = $.sponsorImage.rect.width;
	var deviceWidth = Ti.Platform.displayCaps.platformWidth;

	if (imageWidth > deviceWidth) {
		$.sponsorImage.width = deviceWidth / 1.5;
		$.sponsorImage.height = Titanium.UI.SIZE;
	};

	$.sponsorImage.removeEventListener('postlayout', nsSponsorView.setDimensions);
};

nsSponsorView.openSponsorLink = function() {

	Alloy.Globals.openWindow("Misc/WebLinkView", {
		url : $.args.sponsor.Link
	}, true);
};

nsSponsorView.init = function() {

	console.log('args !!! ', $.args);
	$.sponsorImage.image = $.args.sponsor.image;
	if ($.args.height) {
		$.sponsorImage.height = $.args.height;
	};
	if ($.args.label) {
		$.sponsorsType.text = $.args.label.toUpperCase();
	} else {
		$.sponsorView.remove($.sponsorsType);
	}

	$.sponsorImage.addEventListener('postlayout', nsSponsorView.setDimensions);
	$.sponsorImage.addEventListener('click', nsSponsorView.openSponsorLink);
}();
