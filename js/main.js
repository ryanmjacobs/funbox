// Enumerate the VRDisplays
navigator.getVRDisplays().then(function (displays) {
    var display = displays[0];
    display.resetPose();

    setInterval(function() {
      //var pose = display.getPose();
        var pose = display.getImmediatePose();

        var graph = "\n\n";
        for (var key in pose.orientation)
            graph += key + " " + bar(pose.orientation[key]) + "\n";

        set_text(pose);
        append_text(graph);
    }, 50);
});

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

function set_text(obj) {
    document.getElementById("data").innerHTML = "";
    append_text(obj);
}

function append_text(obj) {
    if (typeof obj == "string")
        document.getElementById("data").innerHTML += obj;
    else
        document.getElementById("data").innerHTML += JSON.stringify(obj, null, 2);
}
