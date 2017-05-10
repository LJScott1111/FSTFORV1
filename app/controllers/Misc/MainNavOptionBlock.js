var nsOptionBlock = {};

nsOptionBlock.setBlockHeight = function() {
	$.optionBlock.height = $.optionBlock.rect.width;
	$.optionBlock.removeEventListener('postlayout', nsOptionBlock.setBlockHeight);
};

nsOptionBlock.init = function() {

	$.optionBlock.applyProperties($.args.properties);
	$.optionLabel.text = $.args.text.toUpperCase();
	$.optionBlock.addEventListener('click', $.args.callback);

	if (OS_ANDROID) {
		$.optionBlock.addEventListener('postlayout', nsOptionBlock.setBlockHeight);
	}
}();
