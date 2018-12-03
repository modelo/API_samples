Modelo.init({"endpoint": "https://build-portal.modeloapp.com"});

var modelId = "G2YDEW85";
var appToken = 'VHlsaW4sbW9kZWxvQkk1NjA='; // A sample app token
Modelo.Auth.signIn(appToken,
    function () {
        var viewer = new Modelo.View.Viewer3D("model");
     
        viewer.addInput(new Modelo.View.Input.Mouse(viewer)); // Add mouse to control camera.

        var selectElementTool = new Modelo.View.Tool.SelectElements(viewer);
        viewer.addTool(selectElementTool);
        selectElementTool.setEnabled(true);
        selectElementTool.setMultiselectEnabled(true);
        viewer.loadModel(modelId, // Load the model into the viewer.
            null,
            function () { // success
                console.log("loading done");

                // Save the selected element names here.
                var elementNames = [];
                var clicks = 0;
                viewer.getEventEmitter().on("onElementSelected", (elementNames1) => {
                    clicks ++;
                    if (clicks > 2) {
                        selectElementTool.pick(null);
                        clicks = 0;
                    }
                    else if (clicks == 2 && elementNames1.length > 1) {
                        var pathes = selectElementTool.findElementsInBetween(elementNames1[0], elementNames1[1]);
                        if (pathes) {
                            // var myElements = [];
                            // var elementDic = {};
                            // pathes.forEach(function(path) {
                            //     path.forEach(function(elemntName) {
                            //         if (!elementDic[elemntName]) {
                            //             elementDic[elemntName] = 1;
                            //         }
                            //     })
                            // })
                            // myElements = Object.keys(elementDic);
                            selectElementTool.pick(pathes, true);    
                        }
                        else {
                            alert("not connected");
                        }
                    }
                    else if (clicks == 1) {
                        selectElementTool.pick(elementNames1, true);
                    }
                    // var myElements = selectElementTool.pickElementsInBetween("8888+0/1345741", "8888+0/2565958")
                    // console.log(myElements);
                    // selectElementTool.pick(myElements, true);

                    elementNames = elementNames1;
                    if (elementNames1.length === 0) {
                        document.getElementById('element').innerHTML = 'Select element with left button: N/A';
                    } else {
                        document.getElementById('element').innerHTML = 'Select element with left button: ' + elementNames1[0];
                    }
                });
            },
            function (errmsg) { // fail
                console.error(errmsg);
            },
            function (per) { // on progress
                var c = document.getElementById("progress");
                c.innerHTML = "Loading: " + Math.round(per * 100) + "%";
            })
    },
    function (err) {
        console.log(err);
    });


