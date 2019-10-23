
var splitted = window.location.href.split('?'); // Get model ID from URL

var modelId = splitted[1] || "xraxbp8m";
var appToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsInVzZXJuYW1lIjoic2FtcGxlcyIsImlzUGVybWFuZW50Ijp0cnVlLCJpYXQiOjE1NTIwMTIyMTksImV4cCI6MzMwODgwMTIyMTl9.Fb-AKOuaWYxwIMmyu3T6GENkUrbP8J21MffB78IpXU0";

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

var viewer = new Modelo.View.Viewer3D("model", {   isMobile: isMobile() });

viewer.setBackgroundColor([0, 0, 0, 1])
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

viewer.setRenderingLinesEnabled(true);