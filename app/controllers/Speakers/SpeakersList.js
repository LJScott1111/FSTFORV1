var nsSpeakersList = {};
var utils = Alloy.Globals.UTILS;

$.speakersListView.addEventListener('itemclick', function(e) {
	var item = e.section.getItemAt(e.itemIndex);
	console.log('SPEAKER ', item.properties.data);
	Alloy.Globals.openWindow('Speakers/Profile', item.properties.data, true);
});

nsSpeakersList.displaySpeakers = function() {

	var speakers = Titanium.App.Properties.getObject('appdata').speakers;
	speakers.sort(utils.sortArray('name'));

	var sectionArr = [];
	var index = [];
	var list = [];
	for (var i = 0,
	    lastL,
	    l,
	    currSection,
	    len = speakers.length; i < len; i++) {

		if (speakers[i] !== undefined) {

			l = speakers[i].name.substr(0, 1);
			if (lastL != l) {
				list = [];

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

			list.push({
				image : {
					image : speakers[i].image
				},
				name : {
					text : speakers[i].name
				},
				properties : {
					data : speakers[i],
					accessoryType : Titanium.UI.LIST_ACCESSORY_TYPE_DISCLOSURE,
					backgroundColor : '#000',
					height : Titanium.UI.SIZE,
					title : speakers[i].name
				}
			});

			currSection.appendItems(list);
			lastL = l;
		}
	}
	$.speakersListView.sections = sectionArr;
};

nsSpeakersList.init = function() {

	nsSpeakersList.displaySpeakers();

}();
