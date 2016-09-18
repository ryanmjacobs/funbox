function buildVRElement(vrDisplay) {
  var frameData = new VRFrameData();

  // Call function indefinitely, to grab data
  function onAnimationFrame () {
    vrDisplay.requestAnimationFrame(onAnimationFrame);

    vrDisplay.getFrameData(frameData);
    console.log(frameData.pose.orientation);
  }
  vrDisplay.requestAnimationFrame(onAnimationFrame);
}

// Enumerate the VRDisplays
navigator.getVRDisplays().then(function (displays) {
    for (var i = 0; i < displays.length; ++i) {
      buildVRElement(displays[i]);
    }
});
