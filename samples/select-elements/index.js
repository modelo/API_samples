var modelId = "93rjxWY4";
var appToken = 'c2FtcGxlcyxtb2RlbG9TQU1QTEVT'; // A sample app token
Modelo.Auth.signIn(appToken,
    null,
    function () {
        var canvas = document.getElementById("model");
        var viewer = new Modelo.View.Viewer3D(canvas, false, 1280, 800);

        // Add mouse control.
        var mouse = viewer.addInput(new Modelo.View.Input.Mouse(canvas));

        // Add select element tool.
        var selectElementTool = new Modelo.View.Tool.SelectElements(viewer);
        viewer.addTool(selectElementTool);
        selectElementTool.setEnabled(true);

        // Register the element selected event.
        var elementNames = [];
        viewer.getEventEmitter().on("onElementSelected", function(elementInfos) {
            console.log(elementInfos);
            elementNames = [];
            elementInfos.forEach(function(elementInfo) {
                var elementName = elementInfo.modelId + "+" + elementInfo.fileName + "/" + elementInfo.elementName;
                elementNames.push(elementName);
            })
        });
        
        document.getElementById("region-select").onchange = function(evt) {
            selectElementTool.setRegionSelectEnabled(document.getElementById("region-select").checked);
        };
        
        document.getElementById("select-focus").onchange = function(evt) {
            selectElementTool.setCloseUpEnabled(document.getElementById("select-focus").checked);
        };

        var modelId = "5roeqpYL"; // Check out the model ID in the project page.
        viewer.loadModel(modelId, // Load the model into the viewer.
            null,
            function () { // success
                console.log("loading done");
            },
            function (errmsg) { // fail
                console.error(errmsg);
            },
            function (per) { // on progress
                console.log("download completes " + Math.round(per * 100) + "%");
            });
    },
    function (err) {
        console.log(err);
    });


