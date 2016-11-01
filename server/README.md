## start control server
`./app.js`

## start stream server
`node stream-server.js pass 8082 8084`

## begin stream
`ffmpeg -s 640x480 -f video4linux2 -i /dev/video0 -f mpeg1video\
 -b 800k -r 30 http://localhost:8082/pass/640/480/`
