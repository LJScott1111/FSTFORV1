var nsMainView = {};

nsMainView.postlayoutCall = function() {
	// if (!Titanium.App.Properties.getString('token')) {
	// TODO: Check if user is logged in - Uncomment the code below to view login screen
/*
	Alloy.createController('Auth/Login', {
		callback : function() {
			console.log('CALLBACK!');
		}
	}).getView().open();*/

	// }
	$.vwMain.removeEventListener('postlayout', nsMainView.postlayoutCall);
	return;
};

nsMainView.init = function() {
	$.vwMain.addEventListener('postlayout', nsMainView.postlayoutCall);
}();
