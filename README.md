# SoccerBowl

## Server API
Soccerbowl uses an Socket.IO connection to sending commands.

### Return objects

    {"success": true/false, "return": retVal, "error": errCode}

retVal can be everything

errCode is the error number if success is false (else it will be omitted)

### Server API Commands

##### SetPixel

Sets a pixel at the specific position to the specific color

Arguments:

    - Integer x
    - Integer y
    - Color color
        - Byte red
        - Byte green
        - Byte blue

Returns:

    - Nothing

##### Fill

Fills the complete display with the specific color

Arguments:
    
    - Color color
        - Byte red
        - Byte green
        - Byte blue

Returns:

    - Nothing

##### Clear

Clears all pixels on the display to black

Arguments:

    - Nothing

Returns:

    - Nothing

##### SwapBuffers

Swaps front and back buffer

Arguments:
    
    - Nothing

Returns:

    - Nothing

##### GetPhoto

Make a photo with the Raspberry PI camera module and returns the base64 encoded image data.

Arguments:

    - Nothing

Returns:

    - Base64 String