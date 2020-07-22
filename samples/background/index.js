let bgcolor = [1, 1, 1];
var modelId = "3rjZVNr4";
var appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUzLCJ1c2VybmFtZSI6Ik1vZGVsbyIsImlzUGVybWFuZW50Ijp0cnVlLCJpYXQiOjE1Njc1NjI0MTksImV4cCI6MzMxMDM1NjI0MTl9.EbW_cSPca4kWLedgNtfrGguog_o-3CCM5WhM7fFi0GA"

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

var cubemapImages = [
    document.getElementById("negx"),
    document.getElementById("negy"),
    document.getElementById("negz"),
    document.getElementById("posx"),
    document.getElementById("posy"),
    document.getElementById("posz")
];
var image = document.getElementById("image1e");
var mode = document.getElementById("bgmode");

function updateProgress(progress) {
    var c = document.getElementById("progress");
    c.innerHTML = "Loading: " + Math.round(progress * 100) + "%";
}

var viewer = new Modelo.View.Viewer3D("model", {   isMobile: isMobile() });

viewer.addInput(new Modelo.View.Input.Mouse(viewer)); // Add mouse to control camera.
viewer.addInput(new Modelo.View.Input.Touch(viewer));

viewer.loadModel(modelId, updateProgress).then(() => {
    mode.onchange = function () {
        var m = parseInt(mode.value);
        var { ViewBackground } = Modelo.View;

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

    document.getElementById("default").onclick = function () {
        bgcolor = [1, 1, 1];
        viewer.setBackgroundColor(bgcolor);
    };
    document.getElementById("red").onclick = function () {
        bgcolor = [1, 0, 0];
        viewer.setBackgroundColor(bgcolor);
    };
    document.getElementById("blue").onclick = function () {
        bgcolor = [0, 0, 1];
        viewer.setBackgroundColor(bgcolor);
    };
    document.getElementById("green").onclick = function () {
        bgcolor = [0, 1, 0];
        viewer.setBackgroundColor(bgcolor);
    };

    document.getElementById("image1w").onclick = function () {
        var i = document.getElementById("image1w");
        viewer.setBackgroundImage(i);
    };

    document.getElementById("image2w").onclick = function () {
        var i = document.getElementById("image2w");
        viewer.setBackgroundImage(i);
    };

    document.getElementById("image1e").onclick = function () {
        var i = document.getElementById("image1e");
        viewer.setBackgroundImage(i);
    };

    document.getElementById("image2e").onclick = function () {
        var i = document.getElementById("image2e");
        viewer.setBackgroundImage(i);
    };

    document.getElementById("image1t").onclick = function () {
        var i = document.getElementById("image1t");
        viewer.setBackgroundImage(i);
    };

    document.getElementById("image2t").onclick = function () {
        var i = document.getElementById("image2t");
        viewer.setBackgroundImage(i);
    };
});

