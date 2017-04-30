var nsMainView = {};

nsMainView.postlayoutCall = function() {
	// console.log('CHECK USER = ', Titanium.App.Properties.getString('defaultUser'));
	// if (Titanium.App.Properties.getString('defaultUser') == true) {

	Alloy.Globals.checkUser(function(user) {
		if (!user || user == null) {
			Alloy.createController('Auth/Login', {
				callback : function() {
					console.log('CALLBACK!');
				}
			}).getView().open();
		} else {
			console.log('USER ', user);
			// Save user details TODO
		}
	});

	// }

	$.vwMain.removeEventListener('postlayout', nsMainView.postlayoutCall);
	return;
};

nsMainView.init = function() {
	$.vwMain.addEventListener('postlayout', nsMainView.postlayoutCall);
}();
