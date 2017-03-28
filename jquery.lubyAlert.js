/* ===========================================================
 *
 *  Name:          lubyAlert.min.js
 *  Updated:       2016-07-05
 *  Version:       0.1.1
 *  Created by:    EVAN, Lubycon.co
 *
 *  Copyright (c) 2016 Lubycon.co
 *
 * =========================================================== */

(function($){
	$.fn.lubyAlert = function(option){
        var defaults = {
            width: 170,
            height: 170,
            type: "alert",// alert, prompt
            animation: null, //animated.css
            fadeInTime : 500,
            fadeOutTime: 700,
            stopTime: 500,
            autoDestroy: true,

            icon: null,//font awesome
            iconColor: "#ffffff",
            iconAnimation: null,
            text: null,
            textColor: "#ffffff",

            theme: "black", //black, white
            fontSize: 30,
            okButton: true,
            cancelButton: true,

            okAction: null,
            cancelAction: null,
            destroyAction: null
        },
        d = {},
        pac = {
            create: function (option) {
                return d = $.extend({}, defaults, option), this.each(function () {
                    if (!$(this).hasClass("alertKey")) $.error("lubyAlert : There is no lubyAlert object");
                    else {
                        console.log("LUBYALERT IS READY");
                        var $this = $(this);
                        pac.render.call($this);
                    }
                });
            },
            render: function(){
                var container = new pac.init();

                if(d.animation !== null) container.addClass(d.animation +  " animated");
                container.appendTo("body");

                pac.align.call(container);
                container.fadeIn(d.fadeInTime,function(){
                    if(d.autoDestroy){
                        setTimeout(function(){
                            func.destroy.call(container);
                        },d.stopTime);
                    }
                });
            },
            init: function() {
                var $this = $(this);

                var width = typeof d.width === "number" ? d.width : "auto",
                    height = typeof d.height === "number" ? d.height : "auto",
                    icon = d.icon === null ? "fa-filter" : d.icon,
                    text = d.text === null ? "Alert!" : d.text;

                var container = $("<div/>",{ "class" : "lubyAlert" }),
                    wrapper = $("<div/>",{ "class" : "lubyWrapper"}),
                    InnerWrapper = $("<div/>",{ "class" : "lubyInnerWrapper" }),
                    icon = $("<i/>",{ "class" : "lubyAlertIcon fa " + icon }),
                    text = $("<p/>",{ "class" : "lubyAlertText", "html" : text }),
                    input = d.type === "prompt" ? $("<input/>",{ "type" : "text", "class" : "lubyAlertInput" }) : null,

                    button = $("<div/>",{ "class" : "lubyAlertButton" }).on("click",func.buttonAction),
                    okButton = d.okButton ? button.clone(true).addClass("okButton").data("value","ok").text("OK") : null,
                    cancelButton = d.cancelButton ? button.clone(true).addClass("cancelButton").data("value","cancel").text("CANCEL") : null;

                    icon.css({ "color" : d.iconColor });
                    if(d.iconAnimation !== null) icon.addClass(d.iconAnimation + " animated");
                    text.css({ "color" : d.textColor, "font-size" : d.fontSize });

                var iconWrapper = InnerWrapper.clone().addClass("icon-wrapper").append(icon),
                    textWrapper = InnerWrapper.clone().addClass("text-wrapper").append(text),
                    buttonWrapper = InnerWrapper.clone().addClass("button-wrapper");
                    if(okButton !== null) buttonWrapper.append(okButton);
                    if(cancelButton !== null) buttonWrapper.append(cancelButton);

                iconWrapper.appendTo(wrapper);
                textWrapper.appendTo(wrapper);
                if(d.type !== "alert") buttonWrapper.appendTo(wrapper);
                if(input !== null){
                    var inputWrapper = InnerWrapper.clone()
                                        .addClass("input-wrapper")
                                        .append(input)
                                        .insertBefore(buttonWrapper);
                }

                wrapper.appendTo(container);

                return container;
            },
            align: function(element){
                var $this = $(this);
                    width = $this.outerWidth(),
                    height = $this.outerHeight(),
                    marginTop = height * -1,
                    marginLeft = width * -0.5;
                $this.css({
                    "margin-top" : marginTop,
                    "margin-left" : marginLeft
                });
            }
        },
        func = {
            destroy: function(){
                $(this).fadeOut(d.fadeOutTime,function(){
                    $(this).remove();
                    if(d.destroyAction !== null) d.destroyAction();
                });
            },
            buttonAction: function(){
                var $this = $(this);
                var data = $(this).data("value");
                if(data === "ok") actionEvent(d.okAction);
                else if(data === "cancel") actionEvent(d.cancelAction);
                else $.error("lubyAlert : CALLBACK EVENT ERROR");

                func.destroy.call($(this).parents(".lubyAlert"));

                function actionEvent(action){
                    if(action !== null) action.call($this);
                }
            }
        };
        start = {
            test: function () {
                return this.each(function () {
                    console.log("tested");
                });
            }
        };

        return start[option] ?
        start[option].apply(this, Array.prototype.slice.call(arguments, 1)) :
        "object" != typeof option && option ?
            ($.error('No such method "' + option + '" for the lubyAlert instance'), void 0) :
            pac.create.apply(this, arguments);
    };
})(jQuery);
