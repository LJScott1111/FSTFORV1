/**
 * Chat.js
 */

var nsChat = {};

// constants
var channelName = "festForums";

var moment = require('alloy/moment');

var pubnub = Alloy.Globals.Pubnub;

// ----------------------------------
// LISTEN FOR MESSAGES
// ----------------------------------
pubnub.subscribe({
    channel  : channelName,
    connect  : function() {
        console.log( "Connected" );
    },
    callback : function(message) {
        console.log( "Received :" + message );
        nsChat.addRowToMessages(message.text);
    },
    error : function() {
        console.log( "Lost Connection..." );
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
};


nsChat.hideKeyboard = function(e) {
    $.input.blur();
};


// Event handlers
// ----------------------------------
// SEND MESSAGE
// ----------------------------------
nsChat.sendMessage = function(e) {

    // $.chat.value += "me: " + $.input.value + "\n";
    console.log('User name :' + Titanium.App.Properties.getString('name'));
    var chatMessage = Titanium.App.Properties.getString('name') + " :" + $.input.value;
    
    pubnub.publish({
        channel  : channelName,
        message  : { text : chatMessage, color : "#111" },
        callback : function(info) {
        	console.log("Publish callback :" + info);
            if (!info[0]) setTimeout(function() {
                nsChat.addRowToMessages(chatMessage);
            }, 2000 );
        }
    });
    
    $.input.value = "";

};

nsChat.addRowToMessages = function(msg) {
    var now = new Date();
    var h = now.getHours();
    var m = now.getMinutes();
    var s = now.getSeconds();
    if(h<10) h = '0' + h;
    if(m<10) m = '0' + m;
    if(s<10) s = '0' + s;
    var time = h+':'+m+':'+s;

    $.chat.value += msg + " (" + time + ")" + "\n";
};

nsChat.cleanup = function() {
    // let Alloy clean up listeners to global collections for data-binding
    // always call it since it'll just be empty if there are none
    $.destroy();

    // disconnect
    ortc.disconnect();
};

nsChat.init = function() {

    // nsChat.connectToChannel();

     // Resize the container when the keyboards shows/hides
    Ti.App.addEventListener('keyboardframechanged', nsChat.onKeyboardframechanged);

    $.chatWindow.addEventListener('destroy', nsChat.cleanup);

}();