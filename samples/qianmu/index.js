
var splitted = window.location.href.split('?'); // Get model ID from URL

var modelId = splitted[1] || "aYegGlrM";
var appToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUxLCJ1c2VybmFtZSI6IjEwMDBtdSIsImlzUGVybWFuZW50Ijp0cnVlLCJpYXQiOjE1NjU1OTA5NzIsImV4cCI6MzMxMDE1OTA5NzJ9.IIq-Cx1XdS-Ju9hSpI7mqwQOvCLXSGAA-hoZCscom4s";

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

var viewer = new Modelo.View.Viewer3D("model");

viewer
    .loadModel(modelId, progress => {
        // second parameter is an optional progress callback
        var c = document.getElementById("progress");
        c.innerHTML = "Loading: " + Math.round(progress * 100) + "%";

    })
    .then(() => {
        viewer.addInput(new Modelo.View.Input.Mouse(viewer));
        viewer.addInput(new Modelo.View.Input.Touch(viewer));
    });

