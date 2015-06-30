# SoccerBowl

## Server API
Soccerbowl uses an Socket.IO connection to sending commands.

### API Commands

#### Client => Server
##### RequestPhotos

Client requests photos from other clients.
Callback function is called for every photo which arrives.

Arguments:

    - Nothing

Returns:

    - Nothing

##### SetPixelIndex

Indicates that the client should set one pixel

Arguments:

    - Integer index
    - Color color
        - Byte red
        - Byte green
        - Byte blue

Returns:

    - Nothing

##### Fill
Client has filled its complete viewport with one color

Arguments:

    - Color color
        - Byte red
        - Byte green
        - Byte blue

Returns:

    - Nothing

##### GetMatrix
Sends the whole matrix at once

Arguments:

    - Nothing

Returns:

    - Array matrix
        - Color color
            - Byte red
            - Byte green
            - Byte blue

#### Server => Client
##### SetPixelIndex
Indicates that the client should set one pixel

Arguments:

    - Integer index
    - Color color
        - Byte red
        - Byte green
        - Byte blue

Returns:

    - Nothing

##### SwapBuffers
Swaps front and back buffer

Arguments:
    
    - Nothing

Returns:

    - Nothing

##### Fill
Indicates that the client should fill its whole viewport with one color

Arguments:

    - Color color
        - Byte red
        - Byte green
        - Byte blue

Returns:

    - Nothing

##### ReloadMatrix
Indicates that the client should reload the matrix data.
Should also trigger a swap of buffers

Arguments:

    - Array matrix
        - Color color
            - Byte red
            - Byte green
            - Byte blue

Returns:

    - Nothing

##### MakePhoto
Server requests client to make a photo and send base64 data

Arguments:

    - Nothing

Returns:

    - Base64 String photoData