var nsLogin = {};
var screen = '';
var signupStage = 1;
var api = Alloy.Globals.API;

nsLogin.getLoginView = function() {
	$.authView.visible = false;
	$.signupView.visible = true;
};

$.win.addEventListener('close', function() {
	$.launchVideo = null;
	$.win = null;
	console.log('CLOSING LOGIN!');
});

$.signup.addEventListener('click', function() {
	nsLogin.getLoginView();
	screen = 'signup';
});

$.login.addEventListener('click', function() {
	nsLogin.getLoginView();
	screen = 'login';
});

$.back.addEventListener('click', function() {
	$.authView.visible = true;
	$.signupView.visible = false;
	nsLogin.resetPageState();
});

$.continueAsGuest.addEventListener('click', function() {
	$.win.close();
});

$.prev.addEventListener('click', function() {

	signupStage--;
	if (screen == 'signup') {

		if (signupStage == 1) {

			$.email.visible = true;
			$.password.visible = false;
			$.prev.visible = false;

		} else if (signupStage == 2) {

			$.password.visible = true;
			$.confirmPassword.visible = false;
			$.done.visible = false;
			$.next.visible = true;
		}
	} else {

		$.password.visible = false;
		$.email.visible = true;
		$.prev.visible = false;
		$.done.visible = false;
		$.next.visible = true;
	}
});

$.next.addEventListener('click', function() {

	// TODO: validation

	console.log('signupStage ', signupStage);
	signupStage++;
	if (screen == 'signup') {

		if (signupStage == 2) {

			$.email.visible = false;
			$.password.visible = true;
			$.prev.visible = true;
			$.done.visible = false;
			$.next.visible = true;
		} else if (signupStage == 3) {

			$.password.visible = false;
			$.confirmPassword.visible = true;
			$.next.visible = false;
			$.done.visible = true;
		}

	} else {
		$.password.visible = true;
		$.email.visible = false;
		$.prev.visible = true;
		$.done.visible = true;
		$.next.visible = false;

	}
});

$.done.addEventListener('click', function() {

	// TODO: validation

	signupStage++;
	console.log('screen ', screen, 'doneclicked');

	this.success = function(user) {
		console.log('this.success called ', user);
		Titanium.App.Properties.setString('userid', user._id);

		// var thisUser = Kinvey.setActiveUser(user);
		// var activeUser = Kinvey.User.getActiveUser();
		// Titanium.App.Properties.removeProperty('defaultUser', false);
		$.win.close();
	};

	this.error = function(error) {
		signupStage--;

		var message = (error.message) ? error.message : L('err_generic');
		console.log('err.Message ', error.message);
		Alloy.Globals.error(message, {
			zIndex : 999,
			persistent : false,
			view : $.container
		});
	};

	var data = {
		username : $.email.getValue(),
		password : $.password.getValue()
	};

	if (screen == 'signup') {

		api.signup(data, this.success, this.error);
	} else {

		api.login(data, this.success, this.error);
	}
});

nsLogin.resetPageState = function() {

	screen = '';
	signupStage = 1;

	$.email.setValue("");
	$.password.setValue("");
	$.confirmPassword.setValue("");

	$.email.visible = true;
	$.password.visible = false;
	$.confirmPassword.visible = false;
	$.prev.visible = false;
	$.done.visible = false;
};

nsLogin.init = function() {
	// api.logout(); // TODO: remove it and place it in the correct place. Here for testing.

	if (OS_ANDROID) {
		setInterval(function() {
			$.launchVideo.play();
		}, 8000);
	};

	nsLogin.resetPageState();
}();
