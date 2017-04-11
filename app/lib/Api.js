/***
 Api.js
 
 */

var config = require('Config');
var moment = require('alloy/moment');

var api = {};

/*
 * Function for converting objects to structured querystring (email=example@example.com&password=AdAdw2)
 */
function queryString(data) {
	var self = this;
	for (var key in data) {
		if ( typeof data[key] === 'object' && data[key] !== null) {
			var o = data[key];
			delete data[key];
			for (var k in o) {
				var new_key = key + "[" + k + "]";
				var value = o[k];

				if (value === true) {
					value = 1;
				}

				if (value === false) {
					value = 0;
				}
				data[new_key] = value;
			}
		}
	}
	var arr = [];
	for (key in data)
	arr.push(key + '=' + data[key]);
	return arr.join("&");
};

/*
 * Function for http request
 */
function httpRequest(endpoint, method, data, successFunction, errorFunction, fileType) {

	if (!Ti.Network.online) {

		if (OS_ANDROID) {

			var dialog = Ti.UI.createAlertDialog({
				cancel : 1,
				buttonNames : ['Review Settings', 'Cancel'],
				message : 'No internet connection. Please review your data settings',
				title : 'Bunxious'
			});
			dialog.addEventListener('click', function(e) {

				if (e.index === 0) {

					var intent = Ti.Android.createIntent({
						action : 'android.settings.WIRELESS_SETTINGS'
					});
					Ti.Android.currentActivity.startActivity(intent);
				}
			});
			dialog.show();
		} else {

			alert('No internet connection. Please review your data settings');
		}

		if (errorFunction) {

			errorFunction();
		}
		return;
	}

	var url = config.baseURL + endpoint;

	// if (data && method == 'GET') {
	//
	// url = url + '?' + queryString(data);
	//
	// }

	var xhr = Ti.Network.createHTTPClient();

	var retries = 0;

	xhr.onload = function() {

		Ti.API.info(endpoint, this.responseText);

		if (this.status == '200' || this.status == '201') {

			try {

				var responseJSON = JSON.parse(this.responseText);

				if (responseJSON && !responseJSON.error) {

					if (successFunction) {

						successFunction(responseJSON);
					}
				}
			} catch (e) {

				if (errorFunction) {

					errorFunction(e);
				}
				Ti.API.error(endpoint, e);
			}
		} else {

			if (errorFunction) {

				errorFunction(this.response);
			}
			Ti.API.error(this.response);
		}
	};

	xhr.onerror = function(e) {

		// if (retries < 3) {
		//
		// retries++;
		// doRequest();
		// } else {

		Ti.API.info('Transmission error: ' + endpoint + ' ' + JSON.stringify(this) + this.responseText);

		// alert('There was a communication error. Please check your internet connection and try again.');

		if (errorFunction && this.responseText) {

			errorFunction(this.responseText);

		} else if (errorFunction) {

			errorFunction(e);
		}
		// }
	};

	xhr.timeout = 20000;

	function doRequest() {

		xhr.open(method, url);

		xhr.setRequestHeader('Authorization', 'Bearer ' + Titanium.App.Properties.getString('token'));
		console.log('TOKEN ', 'Bearer ' + Titanium.App.Properties.getString('token'));

		if (fileType === 'media') {
			xhr.setRequestHeader('enctype', 'multipart/form-data');
			Ti.API.info('gonna hit ' + url + ' and gonna send ' + JSON.stringify(data));
			xhr.send(data);

		} else if (fileType == 'urlencoded') {
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			Ti.API.info('gonna hit urlencoded ' + url + ' and gonna send ' + JSON.stringify(queryString(data)));
			xhr.send(queryString(data));
		} else if (data && method == 'POST') {

			xhr.setRequestHeader('Content-Type', 'application/json');
			Ti.API.info('gonna hit ' + url + ' and gonna send ' + JSON.stringify(JSON.stringify(data)));
			xhr.send(JSON.stringify(data));
		} else {

			xhr.setRequestHeader('Content-Type', 'application/json');
			Ti.API.info('gonna hit --> ' + url);
			xhr.send();
		}
	}

	doRequest();

}

module.exports = api;
