// Enumerate the VRDisplays
navigator.getVRDisplays().then(function (displays) {
    var display = displays[0];
    display.resetPose();

    setInterval(function() {
      //var pose = display.getPose();
        var pose = display.getImmediatePose();

        var graph = "\n\n";
        for (var key in pose.orientation)
            graph += bar(pose.orientation[key]) + "\n";

        set_text(pose);
        append_text(graph);
    }, 50);
});

function bar(x) {
    var str = "**********";
    return str.slice(0, Math.round(x*10));
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
