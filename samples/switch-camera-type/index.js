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

        document.getElementById("toggleCamera").onchange = function() {
            if (document.getElementById("toggleCamera").checked) {
                viewer.getCamera().transformToOrthogonal();
            } else {
                viewer.getCamera().transformToPerspective();
            }
            viewer.invalidate();
        };

        viewer.loadModel(modelId, updateProgress).then(() => {
            viewer.addInput(new Modelo.View.Input.Mouse(viewer)); // Add mouse to control camera.
            const keyboard = new Modelo.View.Input.Keyboard(viewer); // Add keyboard callback.
            viewer.addInput(keyboard);
            console.log("done");
        });
    })
    .catch(e => console.log(e.message));
