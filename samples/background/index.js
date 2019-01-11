Modelo.init({ endpoint: "https://build-portal.modeloapp.com" });

let bgcolor = [1, 1, 1];
const modelId = "NLYVx7rk";
const appToken = "c2FtcGxlcyx0ZVNhbXBsZVBhc3M1NDE=";

const cubemapImages = [
    document.getElementById("negx"),
    document.getElementById("negy"),
    document.getElementById("negz"),
    document.getElementById("posx"),
    document.getElementById("posy"),
    document.getElementById("posz")
];
const image = document.getElementById("image1e");
const mode = document.getElementById("bgmode");

function updateProgress(progress) {
    const c = document.getElementById("progress");
    c.innerHTML = "Loading: " + Math.round(progress * 100) + "%";
}

Modelo.Auth.signIn(appToken)
    .then(() => {
        const viewer = new Modelo.View.Viewer3D("model");

        viewer.addInput(new Modelo.View.Input.Mouse(viewer)); // Add mouse to control camera.

        viewer.loadModel(modelId, updateProgress).then(() => {
            mode.onchange = function() {
                const m = parseInt(mode.value);
                const { ViewBackground } = Modelo.View;

                switch (m) {
                    case ViewBackground.SOLIDCOLOR:
                        viewer.setBackgroundMode(ViewBackground.SOLIDCOLOR);
                        viewer.setBackgroundColor(bgcolor);
                        break;
                    case ViewBackground.WALLPAPER:
                        viewer.setBackgroundMode(ViewBackground.WALLPAPER);
                        viewer.setBackgroundImage(image);
                        break;
                    case ViewBackground.EQUIRECTANGLE:
                        viewer.setBackgroundMode(ViewBackground.EQUIRECTANGLE);
                        viewer.setBackgroundImage(image);
                        break;
                    case ViewBackground.CUBEMAP:
                        viewer.setBackgroundMode(ViewBackground.CUBEMAP);
                        viewer.setBackgroundImage(cubemapImages);
                        break;
                    case ViewBackground.WALLPAPER_TILED:
                        viewer.setBackgroundMode(ViewBackground.WALLPAPER_TILED);
                        viewer.setBackgroundImage(image);
                        break;
                }
            };

            document.getElementById("default").onclick = function() {
                bgcolor = [1, 1, 1];
                viewer.setBackgroundColor(bgcolor);
            };
            document.getElementById("red").onclick = function() {
                bgcolor = [1, 0, 0];
                viewer.setBackgroundColor(bgcolor);
            };
            document.getElementById("blue").onclick = function() {
                bgcolor = [0, 0, 1];
                viewer.setBackgroundColor(bgcolor);
            };
            document.getElementById("green").onclick = function() {
                bgcolor = [0, 1, 0];
                viewer.setBackgroundColor(bgcolor);
            };

            document.getElementById("image1w").onclick = function() {
                const i = document.getElementById("image1w");
                viewer.setBackgroundImage(i);
            };

            document.getElementById("image2w").onclick = function() {
                const i = document.getElementById("image2w");
                viewer.setBackgroundImage(i);
            };

            document.getElementById("image1e").onclick = function() {
                const i = document.getElementById("image1e");
                viewer.setBackgroundImage(i);
            };

            document.getElementById("image2e").onclick = function() {
                const i = document.getElementById("image2e");
                viewer.setBackgroundImage(i);
            };

            document.getElementById("image1t").onclick = function() {
                const i = document.getElementById("image1t");
                viewer.setBackgroundImage(i);
            };

            document.getElementById("image2t").onclick = function() {
                const i = document.getElementById("image2t");
                viewer.setBackgroundImage(i);
            };
        });
    })
    .catch(e => console.log(e.message));
