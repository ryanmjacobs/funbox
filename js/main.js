// Enumerate the VRDisplays
navigator.getVRDisplays().then(function (displays) {
    var frame_data = new VRFrameData();

    setInterval(function() {
        var display = displays[0];
        display.getFrameData(frame_data);
        set_text(frame_data.pose);
    }, 100);
});

function set_text(obj) {
    document.getElementById("data").innerHTML = "";
    append_text(obj);
}

function append_text(obj) {
    document.getElementById("data").innerHTML += JSON.stringify(obj, null, 2);
}
