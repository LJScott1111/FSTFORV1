var nsSchedule = {};
var utils = Alloy.Globals.UTILS;
var api = Alloy.Globals.API;
var fullSchedule;
var momentjs = require("alloy/moment");
var thusdaySchedule;
var fridaySchedule;
var firstload = true;

nsSchedule.setBanner = function() {

	var banner = Alloy.createController('Misc/BannerView').getView();
	$.vwMainList.add(banner);
	$.scheduleListView.bottom = '80dp';
};

function toggleStar(e) {

	var item = e.section.getItemAt(e.itemIndex);
	// console.log('item ', item);
	if (item.properties.addedToSchedule) {
		//delete from userschedule
		api.deleteUserSchedule(item.properties.schedule, function() {
			item.star.text = '\uf006';
		});
	} else {
		// add into userschedule
		api.saveUserSchedule(item.properties.schedule, function() {
			item.star.text = '\uf005';
		});
	}

	item.properties.addedToSchedule = !item.properties.addedToSchedule;
	e.section.updateItemAt(e.itemIndex, item);
};

function openScheduleLink(e) {

	var item = e.section.getItemAt(e.itemIndex);

	Alloy.Globals.openWindow("Misc/WebLinkView", {
		url : item.properties.url
	}, true);
};

nsSchedule.showSchedule = function(schedule) {

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
				text : (schedule[i].start_time) ? startTime + ' - ' + endTime : ''
			},
			star : {
				text : (schedule[i].addedToSchedule) ? '\uf005' : '\uf006'
			},
			addToSchedule : {
				text : L('addTo') + '\n' + L('mySchedule2')
			},
			properties : {
				url : schedule[i].redirect_link,
				height : Titanium.UI.SIZE,
				addedToSchedule : schedule[i].addedToSchedule || false,
				schedule : schedule[i]
			}
		});
	}

	$.scheduleListView.sections[0].setItems(scheduleList);
};

nsSchedule.filterSchedule = function() {

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
		nsSchedule.showSchedule(thusdaySchedule);
		firstload = false;
	}
};

$.thursdayView.addEventListener('click', function() {

	$.thursdaySelected.backgroundColor = Alloy.Globals.globalValues.colors.theme;
	$.fridaySelected.backgroundColor = 'transparent';
	nsSchedule.init();
	nsSchedule.showSchedule(thusdaySchedule);
});

$.fridayView.addEventListener('click', function() {

	$.fridaySelected.backgroundColor = Alloy.Globals.globalValues.colors.theme;
	$.thursdaySelected.backgroundColor = 'transparent';
	nsSchedule.init();
	nsSchedule.showSchedule(fridaySchedule);
});

nsSchedule.init = function() {

	thusdaySchedule = [];
	fridaySchedule = [];

	fullSchedule = Titanium.App.Properties.getObject('appdata').schedule;
	fullSchedule.sort(utils.sortArray('start_time'));

	// Matching Userschedule to schedule
	var userSchedule = Titanium.App.Properties.getObject('userSchedule');
	userSchedule.sort(utils.sortArray('start_time'));

	for (var i in userSchedule) {

		for (var j in fullSchedule) {
			if (userSchedule[i]._id == fullSchedule[j]._id) {
				fullSchedule[j].addedToSchedule = true;
				break;
			};
		}
	}

	if ($.args.banner == true) {

		nsSchedule.setBanner();
	};

	// Filter Schedule
	nsSchedule.filterSchedule();
};

nsSchedule.init();
