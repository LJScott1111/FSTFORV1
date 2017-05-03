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

nsSponsorView.init = function() {

	$.sponsorImage.image = $.args.sponsor.image;
	if ($.args.height) {
		$.sponsorImage.height = $.args.height;
	};
	$.sponsorImage.addEventListener('postlayout', nsSponsorView.setDimensions);
}();
