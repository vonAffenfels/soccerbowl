jQuery(function () {
    var matrix      = jQuery("#matrix");
    var socket      = io.connect('http://iot.saij.de:11666');
    var matrixData  = [];
    var matrixSize  = 32 * 32;
    var matrixWidth = 32;

    function setPixel(index, color, send) {
        if (color.red == matrixData[index].red && color.green == matrixData[index].green && color.blue == matrixData[index].blue) {
            return;
        }

        jQuery(jQuery('.led')[index]).css('background-color', 'rgb(' + color.red + ',' + color.green + ',' + color.blue + ')');
        matrixData[index] = color;

        if (send) {
            socket.emit('SetPixelIndex', {index: index, color: color});
        }
    }

    function fill(color) {
        socket.emit('Fill', {color: color});
    }

    function reloadMatrix() {
        socket.emit('GetMatrix', function (data) {
            for (var i = 0; i < Math.min(data.length, matrixSize); i++) {
                setPixel(i, data[i], false);
            }
        });
    }

    function hexToRGB(color) {
        var hex = color.match(/^#([\dA-F]{2})([\dA-F]{2})([\dA-F]{2})/i);
        return (hex && hex.length === 4) ? {'red': parseInt(hex[1], 16), 'green': parseInt(hex[2], 16), 'blue': parseInt(hex[3], 16)} : '';
    }

    function getSelectedColor() {
        var color = jQuery('#colorpicker').colorpicker('val');
        return hexToRGB(color);
    }

    socket.on('SetPixelIndex', function (data) {
        setPixel(data.index, data.color, false);
    })

    socket.on('ReloadMatrix', function (data) {
        for (var i = 0; i < Math.min(data.length, matrixSize); i++) {
            setPixel(i, data[i], false);
        }
    })

    for (var i = 0; i < matrixSize; i++) {
        matrix.append('<div class="led" style="background-color: rgb(0,0,0);"><div>');
        matrixData.push({'red': 0, 'green': 0, 'blue': 0});
    }

    var globalmousedown = false;
    jQuery('body').bind('mousedown', function(e) {
        e.preventDefault();
        globalmousedown = true;
        return false;
    });
    jQuery('body').bind('mouseup', function(e) {
        e.preventDefault();
        globalmousedown = false;
        return false;
    });

    matrix.delegate('.led', 'mouseenter', function () {
        if (globalmousedown) {
            var led = jQuery(this);
            var index = led.index();
            setPixel(index, getSelectedColor(), true);
        }
    });

    matrix.delegate('.led', 'mousedown', function () {
        var led = jQuery(this);
        var index = led.index();
        setPixel(index, getSelectedColor(), true);
    });

    jQuery('.is_all').bind('click', function() {
        var color = jQuery(this).data('color');
        if (color == 'picker')
            color = getSelectedColor();
        else
            color = hexToRGB(color);

        for (var i = 0; i < matrixSize; i++) {
            setPixel(i, color, false);
        }
        fill(color);
    });

    jQuery('.is_animation_1').bind('click', function() {
        (function next(i) {
            setPixel(i, getSelectedColor(), true)
            if (i < matrixSize) {
                setTimeout(function() {
                    next(i + 1);
                }, 50)
            }
        })(0);
    });

    jQuery('.reload').bind('click', function () {
        reloadMatrix();
    })

    reloadMatrix();

    jQuery('#colorpicker').colorpicker({
        color: '#000000',
        hideButton: true,
        transparentColor: false
    });
});
