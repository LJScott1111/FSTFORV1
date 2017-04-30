var nsOptionBlock = {};

nsOptionBlock.init = function() {

	$.optionBlock.applyProperties($.args.properties);
	$.optionLabel.text = $.args.text.toUpperCase();
	$.optionBlock.addEventListener('click', $.args.callback);
}();
