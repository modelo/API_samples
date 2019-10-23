
var splitted = window.location.href.split('?'); // Get model ID from URL

var modelId = splitted[1] || "WrKxWQ1X";
var appToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUzLCJ1c2VybmFtZSI6Ik1vZGVsbyIsImlzUGVybWFuZW50Ijp0cnVlLCJpYXQiOjE1Njc1NjI0MTksImV4cCI6MzMxMDM1NjI0MTl9.EbW_cSPca4kWLedgNtfrGguog_o-3CCM5WhM7fFi0GA";

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

var viewer = new Modelo.View.Viewer3DPingAn("model");

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

