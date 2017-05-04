/**
 * Chat.js
 */

var nsChat = {};

// constants
var applicationKey = "ulcgPu";
var applicationPrivateKey = "fu4FByIrpiSK";
var channelName = "festForums";

var moment = require('alloy/moment');

var ortc = require('co.realtime.ortc');

ortc.addEventListener('onException', function(e) {
    // addRowToEvents('Exception: '+e.info);
    console.log('Exception: '+e.info);
});

ortc.addEventListener('onConnected', function(e) {
    console.log('Connected');
     // Subscribe to the channel
    ortc.subscribe(channelName, true);
});

ortc.addEventListener('onDisconnected', function(e) {
    console.log('Disconnected');
});

ortc.addEventListener('onSubscribed', function(e) {
    console.log('Subscribed to channel: '+e.channel);
});

ortc.addEventListener('onUnsubscribed', function(e) {
    console.log('Unsubscribed from: '+e.channel);
});

ortc.addEventListener('onMessage', function(e) {
    console.log('(Channel: '+e.channel+') Message received: '+e.message);
    nsChat.addRowToMessages(e.message);
});

ortc.addEventListener('onPresence', function(e) {
    if (e.error != ""){
        console.log('(Channel: '+e.channel+') Presence error: ' + e.error);
    } else {
        console.log('(Channel: '+e.channel+') Presence: '+e.result);
    }
});

/**
 * Event listener set in constructor to be called when the keyboard shows or
 * hides so we can resize the container of both the ListView and TextField.
 */
nsChat.onKeyboardframechanged = function(e) {

    // FIXME: Kind of tricky since this might change in future iOS but did not
    // find a way to get the Tab Bar height from some proxy.
    var tabsHeight = 0;

    // Full screen height minus keyboard start (from top) minus tabs height
    // If the keyboard is down this will be -50, so at least do 0
    $.chatWindow.bottom = Math.max(0, Ti.Platform.displayCaps.platformHeight - e.keyboardFrame.y - tabsHeight);
}


nsChat.hideKeyboard = function(e) {
    $.textField.blur();
}

nsChat.connectToChannel = function() {
    // Connect to server
    ortc.connectionMetadata = 'Titanium example';
    ortc.clusterUrl = 'http://ortc-developers.realtime.co/server/2.1';
    ortc.connect(applicationKey, applicationPrivateKey);
}

// Event handlers

nsChat.sendMessage = function(e) {

    // $.chat.value += "me: " + $.input.value + "\n";
    ortc.send(channelName, $.input.value);
    $.input.value = "";

}

nsChat.addRowToMessages = function(msg) {
    var now = new Date();
    var h = now.getHours();
    var m = now.getMinutes();
    var s = now.getSeconds();
    if(h<10) h = '0' + h;
    if(m<10) m = '0' + m;
    if(s<10) s = '0' + s;
    var time = h+':'+m+':'+s;

    $.chat.value += time + ": " + msg + "\n";
}

nsChat.init = function() {

    nsChat.connectToChannel();

     // Resize the container when the keyboards shows/hides
    Ti.App.addEventListener('keyboardframechanged', nsChat.onKeyboardframechanged);

}();