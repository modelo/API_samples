let bgcolor = [1, 1, 1];
var modelId = "j1mXXDrb";
var appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUzLCJ1c2VybmFtZSI6Ik1vZGVsbyIsImlzUGVybWFuZW50Ijp0cnVlLCJpYXQiOjE1Njc1NjI0MTksImV4cCI6MzMxMDM1NjI0MTl9.EbW_cSPca4kWLedgNtfrGguog_o-3CCM5WhM7fFi0GA"
var container = document.getElementById("model");
document.body.appendChild(container);

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

function updateProgress(progress) {
    var c = document.getElementById("progress");
    c.innerHTML = "Loading: " + Math.round(progress * 100) + "%";
}

$("#range1").range({
    min: 1.0,
    max: 100.0,
    start: 1.0,
    step: 1.0,
    onChange: function(value) {
      return;
    }
  });
$("#range2").range({
    min: 1.0,
    max: 100.0,
    start: 30.0,
    step: 1.0,
    onChange: function(value) {
        return;
    }
});
var viewer = new Modelo.View.Viewer3D("model", {   isMobile: isMobile() });

viewer.addInput(new Modelo.View.Input.Mouse(viewer)); // Add mouse to control camera.
viewer.addInput(new Modelo.View.Input.Touch(viewer));

viewer.loadModel(modelId, updateProgress).then(() => {
    document.getElementById("light").onclick = function () {
        bgcolor = [1, 1, 1];
        viewer.setBackgroundColor(bgcolor);
        $("#light").addClass('active').siblings().removeClass('active');
    };
    document.getElementById("black").onclick = function () {
        $("#black").addClass('active').siblings().removeClass('active');
        bgcolor = [0, 0, 0];
        viewer.setBackgroundColor(bgcolor);
    };


      // set details and contrast
      document.getElementById("sketch").onchange = function(evt) {
        var checked = document.getElementById("sketch").checked;
        viewer.setEffectEnabled("Sketch", checked);
        viewer.setEffectParameter("Sketch", "transparents", true);
        viewer.setEffectParameter("Sketch", "colored", true);
        $("#range1").range({
          min: 1.0,
          max: 100.0,
          start: 1.0,
          step: 1.0,
          onChange: function(value) {
            viewer.setEffectParameter("Sketch", "detail", value);
          }
        });
        $("#range2").range({
          min: 1.0,
          max: 100.0,
          start: 30.0,
          step: 1.0,
          onChange: function(value) {
            viewer.setEffectParameter("Sketch", "contrast", value);
          }
        });
        if (checked) {
          document.getElementById("Sketchcolor0").onclick = function(evt) {
            viewer.setEffectParameter("Sketch", "color", [0, 0, 0]);
          };
          document.getElementById("Sketchcolor128").onclick = function(evt) {
            viewer.setEffectParameter("Sketch", "color", [0.5, 0.5, 0.5]);
          };
          document.getElementById("Sketchcolor248").onclick = function(evt) {
            viewer.setEffectParameter("Sketch", "color", [1, 1, 1]);
          };
        }
      };
});

