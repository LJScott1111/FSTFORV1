var nsLogin = {};
var screen = '';
var signupStage = 1;
var api = Alloy.Globals.API;
var utils = Alloy.Globals.UTILS;

nsLogin.downloadData = function() {
	console.error('DOWNLOADING DATA ');
	api.getSpeakers(function(data) {
		console.log('SPEAKERS DOWNLOADED');
	}, function(error) {
		console.error('SPEAKERS FAILED');
	});
};

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

	// Check if default user is already sightned in, skip this step and download all the data TODO
	if (Titanium.App.Properties.getString('defaultUser') == true) {
		console.debug("User has already signed in using defaultUser");

		var activeUser = Kinvey.User.getActiveUser();
		var promise = Promise.resolve(activeUser);
		if (activeUser !== null) {
			promise = activeUser.me();
		}

		console.debug("Active User - activeUser: ", JSON.stringify(activeUser));

		// TODO: download all the required data
		console.log('Downloading all the required data...');
		utils.downloadAppdata(function(error) {
			Alloy.Globals.error(L('err_dataDownloadFailed'), {
				zIndex : 999,
				persistent : false,
				view : $.container
			});
		}, function(success) {
			// TODO: Ask for required permissions

			$.win.close();
		});

	} else {
		var data = {
			username : 'festforum@buzzplay.com',
			password : 'festforum'
		};
		api.login(data, function(user) {

			console.debug("Login success - user ", JSON.stringify(user));
			//Titanium.App.Properties.removeProperty('appdata');
			Titanium.App.Properties.setString('userid', user._id);

			var activeUser = Kinvey.User.getActiveUser();
			var promise = Promise.resolve(activeUser);
			if (activeUser !== null) {
				promise = activeUser.me();
			}

			console.debug("Active User - activeUser: ", JSON.stringify(activeUser));

			Titanium.App.Properties.setString('defaultUser', true);

			// TODO: download all the required data
			console.log('Downloading all the required data...');
			utils.downloadAppdata(function(error) {
				Alloy.Globals.error(L('err_dataDownloadFailed'), {
					zIndex : 999,
					persistent : false,
					view : $.container
				});
			}, function() {
				// TODO: Ask for required permissions

				$.win.close();
			});

		}, function(error) {
			Alloy.Globals.error(L('err_generic'), {
				zIndex : 999,
				persistent : false,
				view : $.container
			});
		});
	}
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

	// Check if a default user is already signed in - logout from it TODO

	this.success = function(user) {
		console.log('this.success called ', user);
		Titanium.App.Properties.setString('userid', user._id);

		// TODO: download all the required data

		var activeUser = Kinvey.User.getActiveUser();
		Titanium.App.Properties.removeProperty('defaultUser', false);
		$.win.close();
	};

	this.error = function(error) {

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

	Titanium.App.Properties.setObject('appdata', Alloy.Globals.appData);
	if (OS_ANDROID) {
		setInterval(function() {
			$.launchVideo.play();
		}, 8000);
	};

	// Setting blank object
	nsLogin.resetPageState();
}();
