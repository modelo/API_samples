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
            const keyboard = new Modelo.View.Input.Keyboard(viewer); // Add keyboard callback.
            viewer.addInput(keyboard);
            keyboard.addKeyUpListener(function(keyboard) {
                if (keyboard.key === 27) {
                    viewer.destroy();
                }
            });
            console.log("done");
        });

        const { ViewAngle } = Modelo.View;

        document.getElementById("top").addEventListener("click", function() {
            viewer.getCamera().switchToView(ViewAngle.TOP);
        });
        document.getElementById("bottom").addEventListener("click", function() {
            viewer.getCamera().switchToView(ViewAngle.BOTTOM);
        });
        document.getElementById("front").addEventListener("click", function() {
            viewer.getCamera().switchToView(ViewAngle.FRONT);
        });
        document.getElementById("back").addEventListener("click", function() {
            viewer.getCamera().switchToView(ViewAngle.BACK);
        });
        document.getElementById("left").addEventListener("click", function() {
            viewer.getCamera().switchToView(ViewAngle.LEFT);
        });
        document.getElementById("right").addEventListener("click", function() {
            viewer.getCamera().switchToView(ViewAngle.RIGHT);
        });

        document.getElementById("default").addEventListener("click", function() {
            viewer.getCamera().switchToView(ViewAngle.WORLD);
        });
    })
    .catch(e => console.log(e.message));
