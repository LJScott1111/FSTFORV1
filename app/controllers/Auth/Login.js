var nsLogin = {};
var screen = '';
var signupStage = 1;
var api = Alloy.Globals.API;
var utils = Alloy.Globals.UTILS;

nsLogin.getLoginView = function() {
	$.authView.visible = false;
	$.signupView.visible = true;
};

nsLogin.emailValidation = function() {
	if (!utils.validateEmail($.email.getValue().trim())) {
		Alloy.Globals.error(L('err_invalidEmail'), {
			zIndex : 999,
			persistent : false,
			view : $.container
		});
		return false;
	}
};

nsLogin.passwordValidation = function() {
	if (!utils.validatePassword($.password.getValue().trim())) {
		Alloy.Globals.error(L('err_password'), {
			zIndex : 999,
			persistent : false,
			view : $.container
		});
		return false;
	}
};

nsLogin.confirmPasswordValidation = function() {
	if ($.password.getValue().trim() != $.confirmPassword.getValue().trim()) {
		Alloy.Globals.error(L('err_confirmPassword'), {
			zIndex : 999,
			persistent : false,
			view : $.container
		});
		return false;
	};
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
			$.password.value = "";
			$.prev.visible = false;

		} else if (signupStage == 2) {

			$.password.visible = true;
			$.confirmPassword.visible = false;
			$.confirmPassword.value = "";
			$.done.visible = false;
			$.next.visible = true;
		}
	} else {

		$.password.visible = false;
		$.password.value = "";
		$.email.visible = true;
		$.prev.visible = false;
		$.done.visible = false;
		$.next.visible = true;
	}
});

$.next.addEventListener('click', function() {

	console.log('signupStage ', signupStage);

	if (screen == 'signup') {

		if (signupStage == 1) {

			if (nsLogin.emailValidation() == false) {
				return;
			};

			$.email.visible = false;
			$.email.blur();
			$.password.visible = true;
			$.prev.visible = true;
			$.done.visible = false;
			$.next.visible = true;
			signupStage++;
		} else if (signupStage == 2) {

			if (nsLogin.passwordValidation() == false) {
				return;
			};

			$.password.visible = false;
			$.password.blur();
			$.confirmPassword.visible = true;
			$.next.visible = false;
			$.done.visible = true;
			signupStage++;
		}

	} else {

		if (nsLogin.emailValidation() == false) {
			return;
		};

		$.password.visible = true;
		$.email.visible = false;
		$.email.blur();
		$.prev.visible = true;
		$.done.visible = true;
		$.next.visible = false;
		signupStage++;

	}
});

$.done.addEventListener('click', function() {

	// signupStage++;
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
		// signupStage--;

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

		if (nsLogin.confirmPasswordValidation() == false) {
			return;
		};

		$.confirmPassword.blur();

		api.signup(data, this.success, this.error);
	} else {

		if (nsLogin.passwordValidation() == false) {
			return;
		};

		$.password.blur();

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
	$.next.visible = true;
	$.done.visible = false;
};

nsLogin.init = function() {

	if (OS_ANDROID) {
		setInterval(function() {
			$.launchVideo.play();
		}, 8000);
	};

	nsLogin.resetPageState();
}();
