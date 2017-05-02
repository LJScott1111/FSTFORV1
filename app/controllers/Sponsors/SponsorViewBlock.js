var nsSponsorView = {};

nsSponsorView.setDimensions = function() {
	console.log($.sponsorImage.rect.width);

	var imageWidth = $.sponsorImage.rect.width;
	var deviceWidth = Ti.Platform.displayCaps.platformWidth;

	if (imageWidth > deviceWidth) {
		$.sponsorImage.width = deviceWidth / 1.5;
		$.sponsorImage.height = Titanium.UI.SIZE;
	};

	$.sponsorImage.removeEventListener('postlayout', nsSponsorView.setDimensions);
};

nsSponsorView.init = function() {
	$.sponsorImage.image = $.args.image;
	$.sponsorImage.addEventListener('postlayout', nsSponsorView.setDimensions);
}();
