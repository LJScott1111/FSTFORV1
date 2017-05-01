var nsNewsSocial = {};
nsNewsSocial.social_links = null;

nsNewsSocial.postLayout = function() {

	$.twitterUnderline.width = $.twitter.rect.width;
	$.fbUnderline.width = $.fb.rect.width;
	$.instaUnderline.width = $.insta.rect.width;

	$.vwMain.removeEventListener('postlayout', nsNewsSocial.postLayout);
};

$.fbView.addEventListener('click', function() {
	$.wvWebView.setUrl('https://www.facebook.com/festforums');
	$.twitterUnderline.visible = false;
	$.fbUnderline.visible = true;
	$.instaUnderline.visible = false;
});

$.twitterView.addEventListener('click', function() {
	$.wvWebView.setUrl('https://twitter.com/festforums');
	$.twitterUnderline.visible = true;
	$.fbUnderline.visible = false;
	$.instaUnderline.visible = false;
});

$.instaView.addEventListener('click', function() {
	$.wvWebView.setUrl('https://www.instagram.com/festforums/');
	$.twitterUnderline.visible = false;
	$.fbUnderline.visible = false;
	$.instaUnderline.visible = true;
});

nsNewsSocial.init = function() {

	$.vwMain.addEventListener('postlayout', nsNewsSocial.postLayout);

	// Init webview
	$.wvWebView.setUrl('https://twitter.com/festforums');
	$.twitterUnderline.visible = true;
}();
