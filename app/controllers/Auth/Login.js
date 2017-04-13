var nsLogin = {};
var screen = '';
var signupStage = 1;

nsLogin.getLoginView = function() {
	$.authView.visible = false;
	$.signupView.visible = true;
};

$.win.addEventListener('close', function() {
	// $.launchVideo = null;
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

	if (screen == 'signup') {
		signupStage--;
		if (signupStage == 1) {

			$.email.visible = true;
			$.passowrd.visible = false;
			$.prev.visible = false;
		} else if (signupStage == 2) {

			$.passowrd.visible = true;
			$.confirmPassword.visible = false;
			$.next.title = L('next');
		}
	} else {

		$.passowrd.visible = false;
		$.email.visible = true;
		$.prev.visible = false;
		$.next.title = L('next');
	}
});

$.next.addEventListener('click', function() {

	if (screen == 'signup') {
		signupStage++;
		if (signupStage == 2) {

			$.email.visible = false;
			$.passowrd.visible = true;
			$.prev.visible = true;
			$.next.title = L('next');
		} else if (signupStage == 3) {

			$.passowrd.visible = false;
			$.confirmPassword.visible = true;
			$.next.title = L('done');

			// TODO: service call
		}

	} else {
		$.passowrd.visible = true;
		$.email.visible = false;
		$.prev.visible = true;
		$.next.title = L('done');

		// TODO: service call
	}
});

nsLogin.resetPageState = function() {

	screen = '';

	$.email.setValue("");
	$.passowrd.setValue("");
	$.confirmPassword.setValue("");

	$.email.visible = true;
	$.passowrd.visible = false;
	$.confirmPassword.visible = false;
	$.prev.visible = false;
	$.next.title = L('next');
};

nsLogin.init = function() {
	if (OS_ANDROID) {
		setInterval(function() {
			$.launchVideo.play();
		}, 8000);
	};

	nsLogin.resetPageState();
}();
