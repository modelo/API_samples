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

        viewer.addInput(new Modelo.View.Input.Mouse(viewer)); // Add mouse to control camera.

        viewer.loadModel(modelId, updateProgress).then(() => {
            document.getElementById("dump").onclick = function() {
                const shot = viewer.dumpScreen(960, 640);
                document.getElementById("screenshot").src = shot;
            };

            console.log("done");
        });
    })
    .catch(e => console.log(e.message));
