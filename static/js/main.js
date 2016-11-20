var ws = new WebSocket("ws://" + location.hostname + ":8888");

navigator.getVRDisplays().then(function (displays) {
    var last = null;
    var display = displays[0];
    display.resetPose();

    setInterval(function() {
      //var pose = display.getPose();
        var pose = display.getImmediatePose();

        // THREE.js method
        var a = new THREE.Euler().fromArray(pose.orientation);
        var b = [a.x, a.y, a.z];

        // print out pitch, roll, yaw
        for (var c in b)
            b[c] = (b[c] * 360/Math.PI + 90).toFixed(0);

        set_pan(b[0], b[1]);

        reset_text();
        append_text(b.join(" ") + "\n");
        append_text(pose);
    }, 50);
});

function set_pan(x, y) {
    ws.send(JSON.stringify({
        orientation: {x:x, y:y}
    }));
}

function bar(x) {
    var len = 16;
    var cnt = Math.abs(Math.round(x*len));
    var side = repeat(" ", len-cnt) + repeat("*", cnt);

    if (x > 0) {
        str = "<" + side + "|" + repeat(" ", len) + ">";
    } else {
        str = "<" + repeat(" ", len) + "|" + reverse(side) + ">";
    }

    return str;
}

function reverse(s) {
    return s.split("").reverse().join("");
}

function repeat(c, n) {
    var str = "";
    while (n-- > 0)
        str += c;
    return str;
}

function reset_text(obj) {
    document.getElementById("data").innerHTML = "";
}

function append_text(obj) {
    if (typeof obj == "string")
        document.getElementById("data").innerHTML += obj;
    else
        document.getElementById("data").innerHTML += JSON.stringify(obj, null, 2);
}
