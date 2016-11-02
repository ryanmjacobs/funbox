var ws = new WebSocket("ws://" + location.hostname + ":8888");

navigator.getVRDisplays().then(function (displays) {
    var cnt = 0;
    var last = null;
    var display = displays[0];
    display.resetPose();

    setInterval(function() {
      //var pose = display.getPose();
        var pose = display.getImmediatePose();

        // read quarternion
        var q = {
            w: pose.orientation[0],
            x: pose.orientation[1],
            y: pose.orientation[2],
            z: pose.orientation[3]
        };

        // convert to euler angles
        {
            var ysq = q.y * q.y;
            var t0 = -2 * (ysq + q.z * q.z) + 1;
            var t1 =  2 * (q.x * q.y - q.w * q.z);
            var t2 = -2 * (q.x * q.z + q.w * q.y);
            var t3 =  2 * (q.y * q.z - q.w * q.x);
            var t4 = -2 * (q.x * q.x + ysq) + 1;

            t2 = t2 >  1 ?  1 : t2;
            t2 = t2 < -1 ? -1 : t2;

            var pitch = (Math.asin(t2)      * 180/Math.PI + 0).toFixed(0);
            var roll  = (Math.atan2(t3, t4) * 180/Math.PI + 0).toFixed(0);
            var yaw   = (Math.atan2(t1, t0) * 180/Math.PI + 0).toFixed(0);

            reset_text();
            append_text(pitch + " " + roll + " " + yaw + "\n");
        }

        // THREE.js method
        {
            var a = new THREE.Euler().fromArray(pose.orientation);
            var b = [a.x, a.y, a.z];

            for (var c in b) {
                b[c] = (b[c] * 360/Math.PI + 90).toFixed(0);
            }

            append_text(b.join(" ") + "\n");
            console.log(b);
        }

        var graph = "\n\n";
        for (var key in pose.orientation)
            graph += key + " " + bar(pose.orientation[key]) + "\n";

      //if (cnt++ % 500) {
      //    if (val != last)
      //        set_pan(val);

      //    last = val;
      //}

        append_text(pose);
        append_text(graph);
    }, 100);
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
