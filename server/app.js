#!/usr/bin/env node

let ws = require("ws");
let express = require("express");

// setup websocket server
let WebSocketServer = require("ws").Server;
let wss = new WebSocketServer({port: 8888});

// setup serial port
var SerialPort = require("serialport");
var port = new SerialPort("/dev/ttyUSB0", {baudRate: 115200});
port.is_open = false;
port.on("data",  d => console.log("serial_port  data: ", d.toString("utf-8").trim()));
port.on("error", e => console.log("serial_port error: ", e.message));
port.on("open", function() {
    port.is_open = true;
    console.log("serial_port opened...");
});

wss.on("connection", function(ws) {
    ws.on("message", function(msg) {
        try {
            let data = JSON.parse(msg);
            console.log(data);

            set_pan(data.orientation.x);
        } catch(e) {
            console.error(e);
        }
    });
});

Number.prototype.clamp = function(min, max) {
    return Math.min(Math.max(this, min), max);
};

function set_pan(degrees) {
    let buf = new Buffer(1);
    buf[0] = Math.floor(degrees).clamp(0, 180);

    if (port.is_open)
        port.write(buf);
}

function broadcast(data) {
    wss.clients.forEach(function each(client) {
        client.send(data);
    });
}
