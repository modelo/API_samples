Modelo.init({"endpoint": "https://build-portal.modeloapp.com"});

var modelId1 = "p1wMBo8j";
var modelId2 = "5YLQ328Z";
var appToken = 'c2FtcGxlcyx0ZVNhbXBsZVBhc3M1NDE='; // A sample app token
Modelo.Auth.signIn(appToken,
    function () {
        // Modelo.Model.compare(modelId1, modelId2, function (data) {
        //     console.log(data);
        // });
        var that = this;

        var viewer1 = new Modelo.View.Viewer3DCompare("compare-model");
     
        viewer1.addInput(new Modelo.View.Input.Mouse(viewer1)); // Add mouse to control camera.

        var selectElementTool = new Modelo.View.Tool.SelectElements(viewer1);
        // viewer.addTool(selectElementTool);
        selectElementTool.setEnabled(true);
        // viewer.getEventEmitter().on("onElementSelected", function(elementInfos) {
        //     selectElementTool.pick(elementInfos, true);
        // });
        var loadingDone1 = false;
        var loadingDone2 = false;
        
        var setElementsColor = function(data) {
            var elements1 = {};
            var elements2 = {};
            data.newElements1.forEach(function(elementId) {
                if (!elements1[elementId]) {
                    elements1[elementId] = 1;
                }
            });
            data.newElements2.forEach(function(elementId) {
                if (!elements2[elementId]) {
                    elements2[elementId] = 1;
                }
            });
            data.modifiedElements1.forEach(function(elementId) {
                if (!elements1[elementId]) {
                    elements1[elementId] = 1;
                }
            });
            data.modifiedElements2.forEach(function(elementId) {
                if (!elements2[elementId]) {
                    elements2[elementId] = 1;
                }
            });
            var pickElements1 = Object.keys(elements1);
            var pickElements2 = Object.keys(elements2);
            viewer1.focusElementsInViewport(0, pickElements1, false);
            viewer1.focusElementsInViewport(1, pickElements2, false);
            viewer1.getScene().cores[0].setElementsColor(data.newElements1, [1, 0, 0]);
            viewer1.getScene().cores[1].setElementsColor(data.newElements2, [0, 1, 0]);
            viewer1.getScene().cores[0].setElementsColor(data.modifiedElements1, [0, 0, 1]);
            viewer1.getScene().cores[1].setElementsColor(data.modifiedElements2, [1, 1, 0]);
        }

        viewer1.loadModelAtViewport(modelId1, // Load the model into the viewer.
            0,
            null,
            function () { // success
                console.log("model1 loading done");
                if (loadingDone2) {
                    Modelo.Model.compare(modelId1, modelId2, function (data) {
                        console.log(data);
                        setElementsColor(data);
                    });
                }
                loadingDone1 = true;
            },
            function (errmsg) { // fail
                console.error(errmsg);
            },
            function (per) { // on progress
                var c = document.getElementById("progress");
                c.innerHTML = "Loading: " + Math.round(per * 100) + "%";
            })

        
        viewer1.loadModelAtViewport(modelId2, // Load the model into the viewer.
            1,
            null,
            function () { // success
                console.log("model2 loading done");
                if (loadingDone1) {
                    Modelo.Model.compare(modelId1, modelId2, function(data) {
                        setElementsColor(data);
                    });
                }
                loadingDone2 = true;
            },
            function (errmsg) { // fail
                console.error(errmsg);
            },
            function (per) { // on progress
                // var c = document.getElementById("progress");
                // c.innerHTML = "Loading: " + Math.round(per * 100) + "%";
            })


            var viewer2 = null;
            var viewer1Paused = false;
            document.getElementById("toggle-canvas").onclick = function() {
                if (!viewer1Paused) {
                    viewer1.pause();
                    viewer1Paused = true;

                    if (!viewer2) {
                        viewer2 = new Modelo.View.Viewer3D("normal-model");
                        viewer2.addInput(new Modelo.View.Input.Mouse(viewer2)); // Add mouse to control camera
                        viewer2.loadModel(modelId1, // Load the model into the viewer.
                            null,
                            function () {
    
                            },
                            function () {
    
                            },
                            function () {
    
                            });
                    } else {
                        viewer2.resume();
                    }
                } else {
                    viewer2.pause();
                    viewer1.resume();
                    viewer1Paused = false;
                }
            }

            var isHorizontal = true;
            document.getElementById("toggle-split").onclick = function() {
                isHorizontal = !isHorizontal;
                viewer1.getCamera().setSplitHorizontal(isHorizontal);
            }

            var percentage = 0.5;
            document.getElementById("increase-percentage").onclick = function() {
                if (percentage < 0.9) {
                    percentage += 0.1;
                }
                viewer1.getCamera().setSplitPercentage(percentage);
            }
            document.getElementById("decrease-percentage").onclick = function() {
                if (percentage > 0.1) {
                    percentage -= 0.1;
                }
                viewer1.getCamera().setSplitPercentage(percentage);
            }
    },
    function (err) {
        console.log(err);
    });


