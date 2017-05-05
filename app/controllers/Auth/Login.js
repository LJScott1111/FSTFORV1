var nsLogin = {};
var screen = '';
var signupStage = 0;
var api = Alloy.Globals.API;
var utils = Alloy.Globals.UTILS;

nsLogin.getLoginView = function() {
	$.authView.visible = false;
	$.signupView.visible = true;
};

nsLogin.validateName = function() {
	if (!utils.validateName($.name.getValue().trim())) {
		Alloy.Globals.error(L('err_correctName'), {
			zIndex : 999,
			persistent : false,
			view : $.container
		});
		return false;
	}
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

nsLogin.performLogin = function() {
	this.success = function(user) {
		console.log('this.success called ', user);
		utils.downloadAppdata(function(error) {
			Alloy.Globals.error(L('err_dataDownloadFailed'), {
				zIndex : 999,
				persistent : false,
				view : $.container
			});
		}, function(success) {

			// TODO: Ask for required permissions

			var activeUser = Kinvey.User.getActiveUser();
			var promise = Promise.resolve(activeUser);
			if (activeUser !== null) {
				promise = activeUser.me();
			}

			console.debug("ACTIVE USER - activeUser: ", JSON.stringify(activeUser));

			Titanium.App.Properties.removeProperty('defaultUser', false);
			Titanium.App.Properties.setString('userid', user.data._id);
			Titanium.App.Properties.setString('name', user.data.name);
			console.log(Titanium.App.Properties.getString('name'));
			Titanium.App.fireEvent('onLogin');
			$.win.close();
			$.args.callback();
		});
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
		name : $.name.getValue().trim(),
		username : $.email.getValue().trim(),
		password : $.password.getValue().trim()
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
};

$.win.addEventListener('close', function() {
	$.launchVideo = null;
	$.win = null;
	console.log('CLOSING LOGIN!');
});

$.signup.addEventListener('click', function() {
	$.name.visible = true;
	$.email.visible = false;
	nsLogin.getLoginView();
	screen = 'signup';
});

$.login.addEventListener('click', function() {
	$.name.visible = false;
	$.email.visible = true;
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
		console.log(Titanium.App.Properties.getString('name'));
		Titanium.App.fireEvent('onLogin');

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
			$.args.callback();
		});

	} else {
		var data = {
			username : 'festforum@buzzplay.com',
			password : 'festforum'
		};
		api.login(data, function(user) {

			console.debug("Login success - user ", JSON.stringify(user));
			//Titanium.App.Properties.removeProperty('appdata');
			Titanium.App.Properties.setString('userid', user.data._id);
			var randName = user.data.name + Math.floor(Math.random() * 1000);
			Titanium.App.Properties.setString('name', randName);
			console.log(Titanium.App.Properties.getString('name'));

			var activeUser = Kinvey.User.getActiveUser();
			var promise = Promise.resolve(activeUser);
			if (activeUser !== null) {
				promise = activeUser.me();
			}
			console.debug("Active User - activeUser: ", JSON.stringify(activeUser));

			Titanium.App.Properties.setString('defaultUser', true);
			Titanium.App.fireEvent('onLogin');

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
				$.args.callback();
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

		if (signupStage == 0) {

			$.name.visible = true;
			$.email.visible = false;
			// $.email.value = "";
			$.prev.visible = false;
		} else if (signupStage == 1) {

			$.name.visible = false;
			$.email.visible = true;
			$.password.visible = false;
			$.password.value = "";
			// $.prev.visible = true;

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

		if (signupStage == 0) {

			if (nsLogin.validateName() == false) {
				return;
			};

			$.name.visible = false;
			$.email.visible = true;
			$.prev.visible = true;
			signupStage++;

		} else if (signupStage == 1) {

			if (nsLogin.emailValidation() == false) {
				return;
			};

			$.email.visible = false;
			$.email.blur();
			$.password.visible = true;
			// $.prev.visible = true;
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

	var Kinvey = Alloy.Globals.Kinvey;
	var activeUser = Kinvey.User.getActiveUser();
	if (activeUser) {
		api.logout(function(success) {

			nsLogin.performLogin();
		}, function(error) {

			var message = (error.message) ? error.message : L('err_generic');
			console.log('err.Message ', error.message);
			Alloy.Globals.error(message, {
				zIndex : 999,
				persistent : false,
				view : $.container
			});
		});
	} else {
		nsLogin.performLogin();
	}
});

nsLogin.resetPageState = function() {

	screen = '';
	signupStage = 0;

	$.name.setValue("");
	$.email.setValue("");
	$.password.setValue("");
	$.confirmPassword.setValue("");

	$.name.visible = true;
	$.email.visible = false;
	$.password.visible = false;
	$.confirmPassword.visible = false;
	$.prev.visible = false;
	$.next.visible = true;
	$.done.visible = false;
};

nsLogin.init = function() {

	Titanium.App.Properties.setObject('appdata', Alloy.Globals.appData);
	if (!Titanium.App.Properties.getObject('userSchedule')) {
		Titanium.App.Properties.setObject('userSchedule', []);
	}
	if (OS_ANDROID) {
		setInterval(function() {
			$.launchVideo.play();
		}, 8000);
	};

	// Setting blank object
	nsLogin.resetPageState();
}();
