var nsSponsors = {};
var utils = Alloy.Globals.UTILS;

nsSponsors.displaySponsors = function() {

	var sponsors = Titanium.App.Properties.getObject('appdata').sponsors;
	sponsors.sort(utils.sortArray('Tier'));
	console.log('sponsors!!! ', JSON.stringify(sponsors));

	var object = [];
	var result = [];
	var l = '',
	    lastL = sponsors[0].Tier.substr(0, 1);

	for (var i in sponsors) {

		l = sponsors[i].Tier.substr(0, 1);
		if (l == lastL) {

			object.push(sponsors[i]);
			if (i == sponsors.length - 1) {
				console.log('LAST!!');
				result.push(object);
				object = [];
			};
		} else {

			result.push(object);
			object = [];
			object.push(sponsors[i]);
		}

		lastL = l;
	}

	var finalSponsorsArray = [{
		label : 'Presenting Sponsors',
		sponsors : result[0]
	}, {
		label : 'Producing Sponsors',
		sponsors : result[1]
	}, {
		label : 'Our generous partners',
		sponsors : result[2]
	}, {
		label : 'Our media partners',
		sponsors : result[3]
	}];

	for (var i in finalSponsorsArray) {
		console.log('Here!!! ');

		var label = finalSponsorsArray[i].label;

		for (var j in finalSponsorsArray[i].sponsors) {
			var sponsors = finalSponsorsArray[i].sponsors;
			var data = {
				sponsor : JSON.parse(JSON.stringify(sponsors[j]))
			};
			if (j == 0) {
				data.label = label;
			};

			if (i == 0 && j == 0) {
				data.height = Titanium.UI.SIZE;
			};

			$.vwMain.add(Alloy.createController('Sponsors/SponsorViewBlock', data).getView());
		}
	}
};

nsSponsors.init = function() {

	nsSponsors.displaySponsors();
}();
