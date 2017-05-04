var nsSchedule = {};
var utils = Alloy.Globals.UTILS;
var fullSchedule;
var momentjs = require("alloy/moment");
var thusdaySchedule = [];
var fridaySchedule = [];

function toggleStar(e) {

	var item = e.section.getItemAt(e.itemIndex);
	console.log('item ', item);
	console.log('e.source.id ', e.source.id);
	if (item.properties.addedToSchedule) {
		item.star.text = '\uf006';
	} else {
		item.star.text = '\uf005';
	}

	item.properties.addedToSchedule = !item.properties.addedToSchedule;
	e.section.updateItemAt(e.itemIndex, item);
};

function openScheduleLink(e) {

	var item = e.section.getItemAt(e.itemIndex);

	Alloy.Globals.openWindow("Misc/WebLinkView", {
		url : item.properties.url,
	}, true);
};

nsSchedule.showSchedule = function(schedule) {

	var scheduleList = [];

	for (var i in schedule) {

		var start = new Date(schedule[i].start_time * 1000);
		var startDate = momentjs(start).format('dddd, MMM Do');
		var startTime = momentjs(start).format('hh:mm');
		console.log('date ', startDate, startTime);

		var end = new Date(schedule[i].end_time * 1000);
		var endTime = momentjs(end).format('hh:mm a');
		console.log('end date ', schedule[i].end_time, end, endTime);

		scheduleList.push({
			session : {
				text : schedule[i].Session
			},
			time : {
				text : startTime + ' - ' + endTime
			},
			star : {
				text : '\uf006'
			},
			properties : {
				url : schedule[i].redirect_link,
				height : Titanium.UI.SIZE,
				addedToSchedule : false
			}
		});
	}

	$.scheduleListView.sections[0].setItems(scheduleList);
};

nsSchedule.filterSchedule = function() {

	fullSchedule = Titanium.App.Properties.getObject('appdata').schedule;
	fullSchedule.sort(utils.sortArray('start_time'));

	for (var i in fullSchedule) {

		var day = utils.getDay(fullSchedule[i].start_time);
		console.log('day ', day);
		if (day.toLowerCase() == 'thursday') {
			thusdaySchedule.push(fullSchedule[i]);
		} else {
			fridaySchedule.push(fullSchedule[i]);
		}
	}

	console.log('thusdaySchedule ', JSON.stringify(thusdaySchedule));
	console.log('fridaySchedule ', JSON.stringify(fridaySchedule));

	nsSchedule.showSchedule(thusdaySchedule);
};

$.thursdayView.addEventListener('click', function() {

	$.thursdaySelected.backgroundColor = Alloy.Globals.globalValues.colors.theme;
	$.fridaySelected.backgroundColor = 'transparent';
	nsSchedule.showSchedule(thusdaySchedule);
});

$.fridayView.addEventListener('click', function() {

	$.fridaySelected.backgroundColor = Alloy.Globals.globalValues.colors.theme;
	$.thursdaySelected.backgroundColor = 'transparent';
	nsSchedule.showSchedule(fridaySchedule);
});

nsSchedule.init = function() {

	// Filter Schedule
	nsSchedule.filterSchedule();
}();
