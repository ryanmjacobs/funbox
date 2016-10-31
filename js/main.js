// Enumerate the VRDisplays
navigator.getVRDisplays().then(function (displays) {
    var display = displays[0];
    display.resetPose();

    setInterval(function() {
        var pose = display.getPose();
        set_text(pose);
    }, 100);
});

function set_text(obj) {
    document.getElementById("data").innerHTML = "";
    append_text(obj);
}

function append_text(obj) {
    document.getElementById("data").innerHTML += JSON.stringify(obj, null, 2);
}
