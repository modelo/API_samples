Modelo.init({ endpoint: "https://build-portal.modeloapp.com" });

const modelId = "93rjxWY4";
// A sample app token
const appToken = "c2FtcGxlcyx0ZVNhbXBsZVBhc3M1NDE=";

Modelo.Auth.signIn(appToken)
    .then(() => {
        const viewer = new Modelo.View.Viewer3D("model");

        viewer
            .loadModel(modelId, progress => {
                // second parameter is an optional progress callback
                const c = document.getElementById("progress");
                c.innerHTML = "Loading: " + Math.round(progress * 100) + "%";
            })
            .then(() => {
                // model loaded successfully

                // add mouse to control camera.
                viewer.addInput(new Modelo.View.Input.Mouse(viewer));
                // add keyboard callback.
                const keyboard = new Modelo.View.Input.Keyboard(viewer);

                viewer.addInput(keyboard);
                keyboard.addKeyUpListener(keyboard => {
                    if (keyboard.key === 27) {
                        viewer.destroy();
                    }
                });
            });
    })
    .catch(e => console.log(e.message));
