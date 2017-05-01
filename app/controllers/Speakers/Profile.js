var nsProfile = {};

nsProfile.init = function() {

	var momentjs = require("alloy/moment");
	var start = new Date($.args.start_time * 1000);
	var startDate = momentjs(start).format('dddd, MMM Do');
	var startTime = momentjs(start).format('hh:mm');
	console.log('date ', startDate, startTime);

	var end = new Date($.args.end_time * 1000);
	var endTime = momentjs(end).format('hh:mm a');
	console.log('end date ', end, endTime);

	$.image.image = $.args.image;
	$.name.text = $.args.name;
	$.date.text = startDate;
	$.time.text = startTime + ' - ' + endTime;
	$.company.text = $.args.company;
	$.title.text = $.args.title;
	$.bio.text = $.args.bio;

}();
