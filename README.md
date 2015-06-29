# SoccerBowl

## WebSocket API

### Command object

    {"cmd": "CommandToExecute", "args": {"arg1": "value1", "arg2": "value2", "argN": "valueN"}}

### Sending commands

    [cmdObject1, cmdObject2, cmdObjectN]

### Return objects

    {"success": true/false, "return": retVal, "error": errCode}

retVal can be everything

errCode is the error number if success is false (else it will be omitted)

### WebSocket Commands

Example:

    [
        {"cmd": "SetPixel", "args": {"x": 0, "y": 0, "red": 255, "green": 0, "blue": 0}},
        {"cmd": "SetPixel", "args": {"x": 0, "y": 1, "red": 0, "green": 255, "blue": 0}},
        {"cmd": "SetPixel", "args": {"x": 0, "y": 2, "red": 0, "green": 0, "blue": 255}},
        {"cmd": "SwapBuffers"}
    ]

##### SetPixel

Sets a pixel at the specific position to the specific color

Arguments:

    - Integer x
    - Integer y
    - Byte red
    - Byte green
    - Byte blue

Returns:

    - None


##### Fill

Fills the complete display with the specific color

Arguments:
    
    - Byte red
    - Byte green
    - Byte blue

Returns:

    - None

##### Clear

Clears all pixels on the display to black

Arguments:

    - None

Returns:

    - None

##### SwapBuffers

Swaps front and back buffer

Arguments:
    
    - None

Returns:

    - None

##### GetPhoto

Make a photo with the Raspberry PI camera module and returns the base64 encoded image data

Arguments:

    - None

Returns:

    - String