
exports.validateEmail = function(emailValue) {
	var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return emailRegex.test(emailValue);
};

exports.validatePassword = function(passValue) {
	var passRegex = /^[A-Za-z]\w{5,14}$/;
	return passRegex.test(passValue);
};

exports.validateZeroLength = function(string) {
	return (string.trim().length != 0);
};

exports.getDateFormatted = function(date) {
	var momentjs = require("alloy/moment");
	var dateObj = momentjs(date);
	var dateString = "";
	dateString = momentjs(date).format('YYYY-MM-DD');
	return dateString;
};
