// Enumerate the VRDisplays
navigator.getVRDisplays().then(function (displays) {
    setInterval(function() {
        var display = displays[0];
        var pose = display.getPose();
    }, 100);
});

function set_text(obj) {
    document.getElementById("data").innerHTML = "";
    append_text(obj);
}

function append_text(obj) {
    document.getElementById("data").innerHTML += JSON.stringify(obj, null, 2);
}
