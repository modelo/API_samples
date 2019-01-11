Modelo.init({ endpoint: "https://build-portal.modeloapp.com" });

const modelId = "93rjxWY4";
const appToken = "c2FtcGxlcyx0ZVNhbXBsZVBhc3M1NDE="; // A sample app token

function updateProgress(progress) {
    const c = document.getElementById("progress");
    c.innerHTML = "Loading: " + Math.round(progress * 100) + "%";
}

Modelo.Auth.signIn(appToken)
    .then(() => {
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

            document.getElementById("section").onchange = function(evt) {
                const checked = document.getElementById("section").checked;
                section.setEnabled(checked);
                document.getElementById("interaction").checked = checked;
                section.setInteractive(checked);
                viewer.invalidate();
            };

            document.getElementById("interaction").onchange = function(evt) {
                section.setInteractive(document.getElementById("interaction").checked);
                viewer.invalidate();
            };
            document.getElementById("rotation").onchange = function(evt) {
                section.setRotatable(document.getElementById("rotation").checked);
                viewer.invalidate();
            };
            document.getElementById("resetSectionBox").addEventListener("click", function() {
                section.reset();
                viewer.invalidate();
            });
        });
    })
    .catch(e => console.log(e.message));
