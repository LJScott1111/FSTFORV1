/**
 * Speakers list
 * Speakers.js
 */
var nsSpeakers = {};
var currentCity = $.args.city;
nsSpeakers.propRed = {
	color : '#cc0000',
	touchEnabled : false
};
nsSpeakers.propGrey = {
	color : '#c0c0c0',
	touchEnabled : true
};

nsSpeakers.openSpeakers = function() {

	console.log('nsSpeakers.openSpeakers CALLED!!!');
	$.mainContent.removeAllChildren();
	$.myScheduleIcon.applyProperties(nsSpeakers.propGrey);
	$.myScheduleText.applyProperties(nsSpeakers.propGrey);

	$.speakersIcon.applyProperties(nsSpeakers.propRed);
	$.speakersText.applyProperties(nsSpeakers.propRed);

	$.scheduleIcon.applyProperties(nsSpeakers.propGrey);
	$.scheduleText.applyProperties(nsSpeakers.propGrey);

	var speakersList = Alloy.createController('Speakers/SpeakersList').getView();
	$.mainContent.add(speakersList);
};

nsSpeakers.openMySchedule = function() {

	$.mainContent.removeAllChildren();
	$.myScheduleIcon.applyProperties(nsSpeakers.propRed);
	$.myScheduleText.applyProperties(nsSpeakers.propRed);

	$.speakersIcon.applyProperties(nsSpeakers.propGrey);
	$.speakersText.applyProperties(nsSpeakers.propGrey);

	$.scheduleIcon.applyProperties(nsSpeakers.propGrey);
	$.scheduleText.applyProperties(nsSpeakers.propGrey);
};

nsSpeakers.openSchedule = function() {

	$.mainContent.removeAllChildren();
	$.myScheduleIcon.applyProperties(nsSpeakers.propGrey);
	$.myScheduleText.applyProperties(nsSpeakers.propGrey);

	$.speakersIcon.applyProperties(nsSpeakers.propGrey);
	$.speakersText.applyProperties(nsSpeakers.propGrey);

	$.scheduleIcon.applyProperties(nsSpeakers.propRed);
	$.scheduleText.applyProperties(nsSpeakers.propRed);
	
	var schedule = Alloy.createController('Schedule/Schedule').getView();
	$.mainContent.add(schedule);
};

nsSpeakers.init = function() {

	nsSpeakers.openSpeakers();

	$.mySchedule.addEventListener('click', nsSpeakers.openMySchedule);
	$.schedule.addEventListener('click', nsSpeakers.openSchedule);
	$.speakers.addEventListener('click', nsSpeakers.openSpeakers);
}();
