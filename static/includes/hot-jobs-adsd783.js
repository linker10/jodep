(function (QUANTUM, $, undefined) {
    "use strict";
    QUANTUM.HotJobs = (function () {

        var _localization = {
        };
        
        var _init = function () {
            $.notify.addStyle('hot-jobs', {
                  html: 
                    "<div>" +
                      "<div class='clearfix'>" +
                        "<div class='notifyjs-hot-jobs-title' data-notify-html='title'/> <br />" +
                        "<div class='clearfix notifyjs-hot-jobs-content' data-notify-html='content'>" +                
                      "</div>" +
                    "</div>",
                classes: {
                    base: {
                        "white-space": "nowrap",
                        "width": "400px",                    
                    },
                    title: {
                        "width": "100%",
                        "float": "left",
                        "background-color": "#000", /*quantum green 90ae2c*/
                        "color": "#FFFFFF",
                        "top":"0",
                        "padding": "5px 0px 5px 0px",
                        "font-size": "1.3em"
                    },
                    content: {
                        "display": "inline",
                        "float": "left"
                    },
                    img: {
                        "width": "400px", 
                        "height": "250px"
                    },
                    close: {
                        "-webkit-appearance": "none",                        
                        "cursor": "pointer",
                        "background": "transparent",
                        "border": "0",
                        "float": "right",
                        "font-size": "21px",
                        "font-weight": "bold",
                        "line-height": "1",
                        "color": "#fff",
                        "text-shadow": "0 1px 0 #fff",
                        "filter": "alpha(opacity=20)",
                        "opacity": ".2"
                    }
                }
            });
        };

        var _buidAd = function(imageName){
            var divTitle = $("<div/>")
                    /*.append("Hot Jobs")*/
                    .append('<button type="button" class="notifyjs-hot-jobs-close"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>');

            var imageSource = 'campaign/' + imageName;
            var divContent = $("<div/>")
                    .append('<img class="notifyjs-hot-jobs-img" src="' + imageSource + '" width="100%" height="100%" alt="" align="middle" />');


            $.notify({
              title: divTitle,
              content: divContent         
            }, { 
              style: 'hot-jobs',
              autoHide: false,
              clickToHide: false,
              position: "globalPosition: 'right bottom'",
              showAnimation: 'slideDown',
              hideAnimation: 'slideUp',
            });
        };
        

        var that = {};
        that.localization = _localization;
        
        that.init = function (imageName) {
            _init();
            _buidAd(imageName);
            //programmatically trigger propogating hide event
            $(document).on('click', '.notifyjs-hot-jobs-base .notifyjs-hot-jobs-close', function() { $(this).trigger('notify-hide'); });
        };
        return that;
    }());

}(window.QUANTUM = window.QUANTUM || {}, jQuery));