var nsSponsors = {};
var utils = Alloy.Globals.UTILS;

nsSponsors.displaySponsors = function() {

	var sponsors = Titanium.App.Properties.getObject('appdata').sponsors;
	sponsors.sort(utils.sortArray('Tier'));

	for (var i in sponsors) {

		var data = {
			sponsor : JSON.parse(JSON.stringify(sponsors[i]))
		};

		if (i == 0) {
			data.height = Titanium.UI.SIZE;
		};
		$.vwMain.add(Alloy.createController('Sponsors/SponsorViewBlock', data).getView());
	}
};

nsSponsors.init = function() {

	nsSponsors.displaySponsors();
}();
