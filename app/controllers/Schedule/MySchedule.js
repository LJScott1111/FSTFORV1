var nsMySchedule = {};
var utils = Alloy.Globals.UTILS;
var api = Alloy.Globals.API;
var fullSchedule;
var momentjs = require("alloy/moment");
var thusdaySchedule;
var fridaySchedule;
var firstload = true;

function toggleStar(e) {

	var item = e.section.getItemAt(e.itemIndex);
	item.star.text = '\uf006';

	api.deleteUserSchedule(item.properties.schedule, function() {
		item.star.text = '\uf006';
		e.section.deleteItemsAt(e.itemIndex, 1);
	});

};

function openScheduleLink(e) {

	var item = e.section.getItemAt(e.itemIndex);

	Alloy.Globals.openWindow("Misc/WebLinkView", {
		url : item.properties.url,
	}, true);
};

nsMySchedule.showSchedule = function(schedule) {

	var scheduleList = [];

	for (var i in schedule) {

		var start = new Date(schedule[i].start_time * 1000);
		var startDate = momentjs(start).format('dddd, MMM Do');
		var startTime = momentjs(start).format('hh:mm');
		// console.log('date ', startDate, startTime);

		var end = new Date(schedule[i].end_time * 1000);
		var endTime = momentjs(end).format('hh:mm a');
		// console.log('end date ', schedule[i].end_time, end, endTime);

		scheduleList.push({
			session : {
				text : schedule[i].Session
			},
			time : {
				text : startTime + ' - ' + endTime
			},
			star : {
				text : '\uf005'
			},
			properties : {
				url : schedule[i].redirect_link,
				height : Titanium.UI.SIZE,
				schedule : schedule[i]
			}
		});
	}

	$.scheduleListView.sections[0].setItems(scheduleList);
};

nsMySchedule.filterSchedule = function() {

	fullSchedule = Titanium.App.Properties.getObject('userSchedule');
	fullSchedule.sort(utils.sortArray('start_time'));
	thusdaySchedule = [];
	fridaySchedule = [];

	for (var i in fullSchedule) {

		var day = utils.getDay(fullSchedule[i].start_time);
		// console.log('day ', day);
		if (day.toLowerCase() == 'thursday') {
			thusdaySchedule.push(fullSchedule[i]);
		} else {
			fridaySchedule.push(fullSchedule[i]);
		}
	}

	// console.log('thusdaySchedule ', JSON.stringify(thusdaySchedule));
	// console.log('fridaySchedule ', JSON.stringify(fridaySchedule));

	if (firstload) {
		nsMySchedule.showSchedule(thusdaySchedule);
		firstload = false;
	}
};

$.thursdayView.addEventListener('click', function() {

	$.thursdaySelected.backgroundColor = Alloy.Globals.globalValues.colors.theme;
	$.fridaySelected.backgroundColor = 'transparent';
	nsMySchedule.filterSchedule();
	nsMySchedule.showSchedule(thusdaySchedule);
});

$.fridayView.addEventListener('click', function() {

	$.fridaySelected.backgroundColor = Alloy.Globals.globalValues.colors.theme;
	$.thursdaySelected.backgroundColor = 'transparent';
	nsMySchedule.filterSchedule();
	nsMySchedule.showSchedule(fridaySchedule);
});

nsMySchedule.init = function() {

	// Filter Schedule
	nsMySchedule.filterSchedule();
}();
