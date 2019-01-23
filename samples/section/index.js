const modelId = "g8l2v51y";
const appToken = " eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsInVzZXJuYW1lIjoic2FtcGxlcyIsImlhdCI6MTU0ODE0NjI3NywiZXhwIjozMzA4NDE0NjI3N30.XoUmS8836nUVm0mASqL6qiaXgg34Xn4lyieaPtrn5mE"; // A sample app token

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

function updateProgress(progress) {
    const c = document.getElementById("progress");
    c.innerHTML = "Loading: " + Math.round(progress * 100) + "%";
}

const viewer = new Modelo.View.Viewer3D("model");

viewer.setSmartCullingEnabled(false);

viewer.addInput(new Modelo.View.Input.Mouse(viewer)); // Add mouse to control camera.

viewer.loadModel(modelId, updateProgress).then(() => {
    // success
    console.log("done");

    // Notice that we should always add the section tool after the model is done loading.
    // Otherwise, it will cause some unexpected errors
    const section = new Modelo.View.Tool.Section(viewer);
    viewer.addTool(section);

    document.getElementById("section").onchange = function (evt) {
        const checked = document.getElementById("section").checked;
        section.setEnabled(checked);
        document.getElementById("interaction").checked = checked;
        section.setInteractive(checked);
        viewer.invalidate();
    };

    document.getElementById("interaction").onchange = function (evt) {
        section.setInteractive(document.getElementById("interaction").checked);
        viewer.invalidate();
    };
    document.getElementById("rotation").onchange = function (evt) {
        section.setRotatable(document.getElementById("rotation").checked);
        viewer.invalidate();
    };
    document.getElementById("resetSectionBox").addEventListener("click", function () {
        section.reset();
        viewer.invalidate();
    });
});

