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

        viewer.loadModel(modelId, updateProgress).then(() => {
            viewer.addInput(new Modelo.View.Input.Mouse(viewer)); // Add mouse to control camera.

            const magnifyGlass = new Modelo.View.Tool.MagnifyGlass(viewer);
            viewer.addTool(magnifyGlass);

            // We should cancel magnify glass when it is used. Otherwise it
            // will intercept the mouse events always and make the camera
            // rotation disabled.
            viewer.getEventEmitter().on("MagnifyGlass-Selected", function() {
                magnifyGlass.setEnabled(false);
                document.getElementById("magnifyGlass").checked = false;
            });

            document.getElementById("magnifyGlass").onchange = function() {
                const checked = document.getElementById("magnifyGlass").checked;
                magnifyGlass.setEnabled(checked);
            };

            console.log("done");
        });
    })
    .catch(e => console.log(e.message));
