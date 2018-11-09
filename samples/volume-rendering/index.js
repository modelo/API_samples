Modelo.init({"endpoint": "https://build-portal.modeloapp.com"});

var modelId = "93rjxWY4";
var appToken = 'c2FtcGxlcyxtb2RlbG9TQU1QTEVT'; // A sample app token

Modelo.Auth.signIn(appToken,
    function () {
        var c = document.getElementById("model");

        var w = c.clientWidth;
        var h = c.clientHeight;
        var viewer = new Modelo.View.Viewer3D("model", false, w, h);

        window.addEventListener("resize",function() {
            var c = document.getElementById("model");
            var w = c.clientWidth;
            var h = c.clientHeight;
            viewer.resize(w, h);
        });
   
        viewer.loadModel(modelId, // Load the model into the viewer.
            null,
            function () {
                viewer.addInput(new Modelo.View.Input.Mouse(viewer)); // Add mouse to control camera.
                var keyboard = new Modelo.View.Input.Keyboard(viewer); // Add keyboard callback.
                viewer.addInput(keyboard);
                keyboard.addKeyUpListener(function (keyboard) {
                    if (keyboard.key === 27) {
                        viewer.destroy();
                    }
                }); 
                console.log("done");
            },
            function (errmsg) {
                console.log(errmsg); // The loading error.
            },
            function (per) {
                var c = document.getElementById("progress");
                c.innerHTML = "Loading: " + Math.round(per * 100) + "%";
            });


        var guestData = [{ "1": 0, "2": 0, "3": 0 }, { "1": 0, "2": 0, "3": 0 }, {}, { "1": 0 }, { "1": 12 }, { "1": 0, "2": 0 }, { "1": 0, "2": 0 }, {}, { "1": 0, "2": 38 }, { "1": 61 }, { "1": 54 }, {}, {}, { "1": 61 }, { "1": 40 }, { "1": 43 }, { "1": 53 }, { "1": 35 }, {}, { "1": 1 }, {}, { "1": 3, "2": 3, "3": 5, "4": 6, "5": 0, "6": 0 }, { "1": 18, "2": 12, "3": 0 }, { "1": 4, "2": 4, "3": 0, "4": 12, "5": 0, "6": 0, "7": 0, "8": 1 }, { "1": 0 }, { "1": 0 }, { "1": 9 }, { "1": 0 }, { "1": 0 }, { "1": 0 }, { "1": 50 }, { "1": 26, "2": 0, "3": 0, "4": 0 }, { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0 }, { "1": 10, "2": 0, "3": 6, "4": 5, "5": 0, "6": 0, "7": 0, "8": 5 }, { "1": 0, "2": 4, "3": 0, "4": 4, "5": 6, "6": 0, "7": 0, "8": 0 }, { "1": 6 }, {}, { "1": 1, "2": 20, "3": 20, "4": 20, "5": 20, "6": 0, "7": 24, "8": 0 }, {}, { "1": 0 }, { "1": 0 }, { "1": 0 }, { "1": 0 }, { "1": 0 }, {}, { "1": 0 }, { "1": 0 }, { "1": 0 }, { "1": 0 }, { "1": 1 }, { "1": 0 }, { "1": 0 }];
        var employeeData = [{ "1": 0, "2": 0, "3": 0 }, { "1": 0, "2": 0, "3": 0 }, {}, { "1": 0 }, { "1": 448 }, { "1": 0, "2": 0 }, { "1": 0, "2": 0 }, {}, { "1": 19, "2": 38 }, { "1": 196 }, { "1": 68 }, {}, {}, { "1": 4 }, { "1": 236 }, { "1": 2 }, { "1": 3 }, { "1": 347 }, {}, { "1": 48 }, {}, { "1": 5, "2": 45, "3": 8, "4": 24, "5": 0, "6": 0 }, { "1": 40, "2": 6, "3": 0 }, { "1": 7, "2": 6, "3": 0, "4": 10, "5": 0, "6": 0, "7": 0, "8": 4 }, { "1": 0 }, { "1": 0 }, { "1": 4 }, { "1": 0 }, { "1": 0 }, { "1": 0 }, { "1": 87 }, { "1": 4, "2": 0, "3": 0, "4": 0 }, { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0 }, { "1": 26, "2": 0, "3": 7, "4": 9, "5": 6, "6": 0, "7": 0, "8": 3 }, { "1": 1, "2": 17, "3": 0, "4": 4, "5": 5, "6": 0, "7": 0, "8": 0 }, { "1": 0 }, {}, { "1": 7, "2": 15, "3": 15, "4": 15, "5": 15, "6": 0, "7": 17, "8": 0 }, {}, { "1": 0 }, { "1": 0 }, { "1": 0 }, { "1": 0 }, { "1": 0 }, {}, { "1": 0 }, { "1": 0 }, { "1": 0 }, { "1": 0 }, { "1": 3 }, { "1": 0 }, { "1": 3 }];
        var totalData = [{ "1": 0, "2": 0, "3": 0 }, { "1": 0, "2": 0, "3": 0 }, {}, { "1": 0 }, { "1": 448 }, { "1": 0, "2": 0 }, { "1": 0, "2": 0 }, {}, { "1": 19, "2": 38 }, { "1": 196 }, { "1": 68 }, {}, {}, { "1": 4 }, { "1": 236 }, { "1": 2 }, { "1": 3 }, { "1": 347 }, {}, { "1": 48 }, {}, { "1": 5, "2": 45, "3": 8, "4": 24, "5": 0, "6": 0 }, { "1": 40, "2": 6, "3": 0 }, { "1": 7, "2": 6, "3": 0, "4": 10, "5": 0, "6": 0, "7": 0, "8": 4 }, { "1": 0 }, { "1": 0 }, { "1": 4 }, { "1": 0 }, { "1": 0 }, { "1": 0 }, { "1": 87 }, { "1": 4, "2": 0, "3": 0, "4": 0 }, { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0 }, { "1": 26, "2": 0, "3": 7, "4": 9, "5": 6, "6": 0, "7": 0, "8": 3 }, { "1": 1, "2": 17, "3": 0, "4": 4, "5": 5, "6": 0, "7": 0, "8": 0 }, { "1": 0 }, {}, { "1": 7, "2": 15, "3": 15, "4": 15, "5": 15, "6": 0, "7": 17, "8": 0 }, {}, { "1": 0 }, { "1": 0 }, { "1": 0 }, { "1": 0 }, { "1": 0 }, {}, { "1": 0 }, { "1": 0 }, { "1": 0 }, { "1": 0 }, { "1": 3 }, { "1": 0 }, { "1": 3 }];;
        var max = -1;
        employeeData.forEach(function (data, index) {
            for (var key in data) {
                totalData[index][key] = data[key] + guestData[index][key];
            }
        });

        guestData.forEach(function (data) {
            for (var key in data) {
                if (data[key] > max) {
                    max = data[key];
                }
            }
        });
        guestData.forEach(function (data) {
            for (var key in data) {
                data[key] /= max;
                data[key] = Math.log(1.718 * Math.sqrt(data[key]) + 1);
            }
        });

        max = -1;
        employeeData.forEach(function (data) {
            for (var key in data) {
                if (data[key] > max) {
                    max = data[key];
                }
            }
        });
        employeeData.forEach(function (data) {
            for (var key in data) {
                data[key] /= max;
                // data[key] = Math.log(1.718 * Math.sqrt(Math.sqrt(Math.sqrt(data[key]))) + 1);
                data[key] = Math.log(1.718 * Math.sqrt(data[key]) + 1);
            }
        });

        max = -1;
        totalData.forEach(function (data) {
            for (var key in data) {
                if (data[key] > max) {
                    max = data[key];
                }
            }
        });
        totalData.forEach(function (data) {
            for (var key in data) {
                data[key] /= max;
                data[key] = Math.log(1.718 * Math.sqrt(data[key]) + 1);
            }
        });
        
        var matrix = new Float32Array([5, 0, 0, 0, 0, 4, 0, 0, 0, 0, 20, 0, 11, -53, 14, 1]);
        viewer.createVolumeRendering(matrix, "./volumeMap-full-1.png", "./floorMap-full-1.png", "./colormap2.png", employeeData);
        viewer.setVolumeRenderingEnabled(true);

        document.getElementById("employee").onclick = function() {
            viewer.updateVolumeData(employeeData);
        }
        document.getElementById("guest").onclick = function() {
            viewer.updateVolumeData(guestData);
        }
        document.getElementById("total").onclick = function() {
            viewer.updateVolumeData(totalData);
        }
        var volumeEnabled = true;
        document.getElementById("toggle-volume").onclick = function() {
            volumeEnabled = !volumeEnabled;
            viewer.setVolumeRenderingEnabled(volumeEnabled);
        }
    },
    function (errmsg) {
        console.log(errmsg); // If there is any sign-inerror.
    });

