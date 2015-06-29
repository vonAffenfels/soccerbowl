jQuery(function () {
    var target = jQuery("#target");
    var socket = io.connect('http://iot.saij.de:11666');
    var initialized = false;
    var currentData = [];
    var leds = null;

    socket.emit("load", function (data) {
        update(data, true);
    });

    socket.on("change", function (data) {
	console.log(data);
        update(data, true);
    });

    function update(data, dontSend) {
        currentData = data;
        if(!initialized) {
            initialized = true;
            target.html("");
            for (var i = 0; i < data.length; i++) {
                target.append('<div class="led" style="background-color: #' + data[i] + '"></div>')
            }
            leds = target.children();
        } else {
            for (var i = 0; i < data.length; i++) {
                jQuery(leds[i]).css("background-color", "#" + data[i]);
            }
        }
        if(!dontSend) {
            socket.emit("change", currentData);
        }
    }

    function rgb2hex(rgb) {
        rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
        return (rgb && rgb.length === 4) ? "#" +
            ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
            ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
            ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
    }

    target.delegate(".led", "mousedown", function () {
        var led = jQuery(this);
        var index = led.index();
        var currentBgColor = rgb2hex(led.css("background-color")).replace(/#/, '');
        currentData[index] = getNextColor(currentBgColor);
        update(currentData);
    });

    var globalmousedown = false;
    jQuery("body").bind('mousedown', function(e) {
        e.preventDefault();
        globalmousedown = true;
        return false;
    });
    jQuery("body").bind('mouseup', function(e) {
        e.preventDefault();
        globalmousedown = false;
        return false;
    });

    jQuery('.is_all').bind('click', function() {
        var color = jQuery(this).data("color");
        for(var i = 0; i < currentData.length; i++) {
            currentData[i] = color;
        }
        update(currentData);
    });

    jQuery('.is_animation_1').bind('click', function() {

        var count = currentData.length;
        (function next(i) {
            currentData[i] = getNextColor(currentData[i]);
            update(currentData);

            if(i < count) {
                setTimeout(function() {
                    next(i+1);
                }, 10)
            }
        })(0);
    });

    target.delegate(".led", "mouseenter", function () {
        if(globalmousedown) {
            var led = jQuery(this);
            var index = led.index();
            var currentBgColor = rgb2hex(led.css("background-color")).replace(/#/, '');
            currentData[index] = getNextColor(currentBgColor);
            update(currentData);
        }
    });

    function getNextColor (curr) {
        var colors = [
            "000000",
            "ff0000",
            "00ff00",
            "0000ff",
            "ffffff"
        ];
        var currIndex = colors.indexOf(curr);
        var nextIndex = currIndex + 1;
        return colors[nextIndex] ? colors[nextIndex] : colors[0];
    }

});
