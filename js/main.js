// Enumerate the VRDisplays
navigator.getVRDisplays().then(function (displays) {
    setInterval(function() {
        for (var i = 0; i < displays.length; i++) {
            var display = displays[i];

            var pose = display.getPose();
            document.getElementById("data").innerHTML += JSON.stringify(pose);
        }
    }, 500);
});
