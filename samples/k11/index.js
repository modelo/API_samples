
var splitted = window.location.href.split('?'); // Get model ID from URL

var modelId = splitted[1] || "q1x6408J";
var appToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjUsInVzZXJuYW1lIjoiZnFsIiwiaWF0IjoxNTQ4Mjk4NDIxLCJleHAiOjMzMDg0Mjk4NDIxfQ.-ZNOLrw1W9OOf9iG8QkgZuFJR5JUJmHDZvkZLsdR15Y";

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

var viewer = new Modelo.View.Viewer3DK11("model");

viewer
    .loadModel(modelId, progress => {
        // second parameter is an optional progress callback
        var c = document.getElementById("progress");
        c.innerHTML = "Loading: " + Math.round(progress * 100) + "%";

    })
    .then(() => {
        viewer.addInput(new Modelo.View.Input.Mouse(viewer));
    });

