Alloy.Globals.jolicode = {};
Alloy.Globals.jolicode.pageflow = {};
Alloy.Globals.jolicode.pageflow.height = Ti.Platform.displayCaps.platformHeight;
Alloy.Globals.jolicode.pageflow.width = Ti.Platform.displayCaps.platformWidth;

if (OS_ANDROID) {
	Alloy.Globals.jolicode.pageflow.height = Ti.Platform.displayCaps.platformHeight / Ti.Platform.displayCaps.logicalDensityFactor;
	Alloy.Globals.jolicode.pageflow.width = Ti.Platform.displayCaps.platformWidth / Ti.Platform.displayCaps.logicalDensityFactor;
}

/* ------------------------------------------ Defining Alloy variables ----------------------------------------------- */
Alloy.Globals.globalValues = {

	colors : {
		theme : '#304158',
		button : '#F3702B',
		red : '#cc0000',
		gray : '#898989'
	}
};

Alloy.Globals.loading = Alloy.createWidget('nl.fokkezb.loading');
Alloy.Globals.UTILS = require('Utils');
// Alloy.Globals.API = require('Api');

// Set userdata
if (!Titanium.App.Properties.getObject('userdata')) {
	Titanium.App.Properties.setObject('userdata', {});
};

/* ------------------------------------------ Defining Alloy variables ----------------------------------------------- */

Alloy.Globals.openWindow = function(controller, arguments, newOne, titleText, centerView, rightView, leftView) {

	if (Alloy.Globals.pageflow.getCurrentPage() == null || newOne === true) {

		Alloy.Globals.pageflow.addChild({
			arguments : arguments,
			controller : controller,
			backButton : {
				tintColor : '#ffffff',
				title : '\uf060',
				width : '55dp',
				height : '35dp',
				left : 0,
				backgroundColor : 'transparent',
				borderColor : 'transparent',
				font : {
					fontSize : '16dp',
					fontFamily : "FontAwesome"
				},
				hidden : newOne === true ? false : true
			},
			navBar : {
				// backgroundColor : Alloy.Globals.globalValues.colors.theme,
				left : leftView,
				// right : 'Misc/NavRightMenu',
				title : titleText,
				center : centerView,
				titleOptions : {
					color : '#fff',
					font : {
						fontSize : '15dp'
					},
					width : Titanium.UI.SIZE
				}
			},
			direction : {
				top : 0,
				left : 1
			}
		});

		if (!newOne) {

			currentPage = controller;
		}
	} else if (currentPage != controller) {

		Alloy.Globals.pageflow.replacePage(0, {
			arguments : arguments,
			controller : controller,
			backButton : {
				hidden : true
			},
			navBar : {
				backgroundColor : '#000000',
				left : leftView,
				right : rightView,
				title : titleText,
				center : centerView,
				titleOptions : {
					color : '#fff',
					font : {
						fontSize : '15dp'
					},
					width : Titanium.UI.SIZE
				}
			},
			direction : {
				top : 0,
				left : 1
			}
		});
		currentPage = controller;
	}
};
