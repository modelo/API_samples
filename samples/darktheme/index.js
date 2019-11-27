var modelId = "RYQGxxrx";
const appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAwLCJ1c2VybmFtZSI6Im1lbmdndW95b25nIiwiaXNQZXJtYW5lbnQiOnRydWUsImlhdCI6MTU3NDgyNDQ5OSwiZXhwIjozMzExMDgyNDQ5OX0.6KOvsp-3GjuY2rGsrXNazBioU0jiS8osQ1h1tGw8EZU";

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

var viewer = new Modelo.View.Viewer3DDark("model");

viewer
    .loadModel(modelId, progress => {
        // second parameter is an optional progress callback
        var c = document.getElementById("progress");
        c.innerHTML = "Loading: " + Math.round(progress * 100) + "%";

        viewer.setBackgroundColor([0, 0, 0, 1]);
    })
    .then(() => {
        viewer.addInput(new Modelo.View.Input.Mouse(viewer));
    });
