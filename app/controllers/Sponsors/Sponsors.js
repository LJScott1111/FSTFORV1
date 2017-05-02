var nsSponsors = {};
var utils = Alloy.Globals.UTILS;

nsSponsors.displaySponsors = function() {

	var sponsors = Titanium.App.Properties.getObject('appdata').sponsors;
	sponsors.sort(utils.sortArray('Tier'));
	console.log('SPONSORS -->', JSON.stringify(sponsors));

	for (var i in sponsors) {
		$.vwMain.add(Alloy.createController('Sponsors/SponsorViewBlock', sponsors[i]).getView());
	}
};

nsSponsors.init = function() {

	nsSponsors.displaySponsors();
}();
