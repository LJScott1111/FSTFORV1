var nsAttendeesList = {};
var utils = Alloy.Globals.UTILS;

nsAttendeesList.displayAttendees = function() {

	var attendees = Titanium.App.Properties.getObject('appdata').attendees;
	attendees.sort(utils.sortArray('name'));

	var sectionArr = [];
	var index = [];
	var list = [];
	for (var i = 0,
	    lastL,
	    l,
	    currSection,
	    len = attendees.length; i < len; i++) {

		if (attendees[i] !== undefined) {

			l = attendees[i].name.substr(0, 1);
			if (lastL != l) {
				// list = [];

				index.push({
					title : l,
					index : i
				});
				var listViewSectionHeader = Titanium.UI.createView({
					width : Titanium.UI.FILL,
					height : '20dp',
					backgroundColor : '#868686'
				});

				var listViewSectionHeaderTitle = Titanium.UI.createLabel({
					text : l,
					left : '20dp',
					color : '#fff',
					font : {
						fontSize : '13dp'
					}
				});
				listViewSectionHeader.add(listViewSectionHeaderTitle);
				currSection = Titanium.UI.createListSection({
					headerView : listViewSectionHeader
				});
				sectionArr.push(currSection);
			}

			var company = '';
			if (attendees[i].title) {
				company += attendees[i].title;
				if (attendees[i].company) {
					company += '\n' + attendees[i].company;
				};
			} else if (attendees[i].company) {
				company += attendees[i].company;
			}

			list.push({

				name : {
					text : attendees[i].name
				},
				titleAndCompany : {
					text : company
				},
				properties : {
					backgroundColor : '#000',
					height : Titanium.UI.SIZE,
					title : attendees[i].name,
					selectionStyle : (OS_IOS) ? Titanium.UI.iPhone.ListViewCellSelectionStyle.NONE : ''
				}
			});

			currSection.appendItems(list);
			list = [];
			lastL = l;
		}
	}
	$.attendeesListView.sections = sectionArr;
};

nsAttendeesList.init = function() {

	nsAttendeesList.displayAttendees();

}();
