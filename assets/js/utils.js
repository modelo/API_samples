function setDarkTheme(viewer) {
  viewer.setBackgroundColor([26.0 / 255.0, 26.0 / 255.0, 55.0 / 255.0, 1.0]);

  viewer.setEffectEnabled("Sketch", true);
  viewer.setEffectParameter("Sketch", "color", [180 / 255.0, 180 / 255.0, 180 / 255.0]);
  viewer.setEffectParameter("Sketch", "colored", true);
  //this.setEffectParameter("Sketch", "surfaceColor", [51.0 / 255.0, 145.0 / 255.0, 1.0, 0.2]);
  viewer.setEffectParameter("Sketch", "transparents", true);

  // Turn on SSAO effect
  viewer.setEffectEnabled("SSAO", true);
  viewer.setEffectParameter("SSAO", "transparents", true);
  }

  function updateProgress(progress) {
    const c = document.getElementById("progress");
    c.innerHTML = "Loading: " + Math.round(progress * 100) + "%";
  }