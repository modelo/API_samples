Modelo.init({ "endpoint": "https://build-portal.modeloapp.com" });

var bgcolor = [1, 1, 1];
var modelId = "93rjxWY4";
var appToken = 'c2FtcGxlcyx0ZVNhbXBsZVBhc3M1NDE='; // A sample app token
Modelo.Auth.signIn(appToken,
    function () {
        
        var viewer = new Modelo.View.Viewer3D("model");

        viewer.addInput(new Modelo.View.Input.Mouse(viewer)); // Add mouse to control camera.

        viewer.loadModel(modelId,
            null,
            function () {
                var cubemapImages = [];
                cubemapImages.push(document.getElementById("negx"));
                cubemapImages.push(document.getElementById("negy"));
                cubemapImages.push(document.getElementById("negz"));
                cubemapImages.push(document.getElementById("posx"));
                cubemapImages.push(document.getElementById("posy"));
                cubemapImages.push(document.getElementById("posz"));

                var image = document.getElementById("image1e");

                var mode = document.getElementById("bgmode");
                mode.onchange = function () {
                    var m = parseInt(mode.value);
                    switch (m) {
                        case Modelo.View.BACKGROUND_SOLIDCOLOR:
                            viewer.setBackgroundMode(Modelo.View.BACKGROUND_SOLIDCOLOR);
                            viewer.setBackgroundColor(bgcolor);
                            break;
                        case Modelo.View.BACKGROUND_WALLPAPER:
                            viewer.setBackgroundMode(Modelo.View.BACKGROUND_WALLPAPER);
                            viewer.setBackgroundImage(image);
                            break;
                        case Modelo.View.BACKGROUND_EQUIRECTANGLE:
                            viewer.setBackgroundMode(Modelo.View.BACKGROUND_EQUIRECTANGLE);
                            viewer.setBackgroundImage(image);
                            break;
                        case Modelo.View.BACKGROUND_CUBEMAP:
                            viewer.setBackgroundMode(Modelo.View.BACKGROUND_CUBEMAP);
                            viewer.setBackgroundImage(cubemapImages);
                            break;
                        case Modelo.View.BACKGROUND_WALLPAPER_TILED:
                            viewer.setBackgroundMode(Modelo.View.BACKGROUND_WALLPAPER_TILED);
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
            },
            function (errmsg) {
                console.log(errmsg);
            },
            function (per) {
                var c = document.getElementById("progress");
                c.innerHTML = "Loading: " + Math.round(per * 100) + "%";
            });
    },
    function (errmsg) {
        console.log(errmsg);
    })


