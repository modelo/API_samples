function setCommonDark(viewer) {
    viewer.setBackgroundColor([26.0 / 255.0, 26.0 / 255.0, 55.0 / 255.0, 1.0]);
    viewer.setEffectEnabled("Sketch", true);
    viewer.setEffectParameter("Sketch", "color", [0.0 / 255.0, 255.0 / 255.0, 243.0 / 255.0]);
    viewer.setEffectParameter("Sketch", "colored", true);
    viewer.setEffectParameter("Sketch", "transparents", true);
    viewer.setEffectEnabled("SSAO", true);
    viewer.setEffectParameter("SSAO", "transparents", true);
  }

  function updateProgress(progress) {
    const c = document.getElementById("progress");
    c.innerHTML = "Loading: " + Math.round(progress * 100) + "%";
  }