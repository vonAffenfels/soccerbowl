# SoccerBowl

## Server API
Soccerbowl uses an Socket.IO connection to sending commands.

### Return objects

    {"success": true/false, "return": retVal, "error": errCode}

retVal can be everything

errCode is the error number if success is false (else it will be omitted)

### API Commands

##### SetPixel

Sets a pixel at the specific position to the specific color

Direction:

    Server => Client

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

Direction:

    Server => Client

Arguments:
    
    - Color color
        - Byte red
        - Byte green
        - Byte blue

Returns:

    - Nothing

##### Clear

Clears all pixels on the display to black

Direction:

    Server => Client

Arguments:

    - Nothing

Returns:

    - Nothing

##### SwapBuffers

Swaps front and back buffer

Direction:
    
    Server => Client

Arguments:
    
    - Nothing

Returns:

    - Nothing

##### GetPhoto

Make a photo with the Raspberry PI camera module and returns the base64 encoded image data.

Direction:

    Server => Client

Arguments:

    - Nothing

Returns:

    - Base64 String

##### SendMatrix

Sends the whole matrix at once

Direction:

    Server => Client

Arguments:

    - Array matrix
        - Color color
            - Byte red
            - Byte green
            - Byte blue

Returns:

    - Nothing