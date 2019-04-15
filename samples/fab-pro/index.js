
var modelId = "gYEODnr5";
var appToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjUsInVzZXJuYW1lIjoiZnFsIiwiaWF0IjoxNTQ4Mjk4NDIxLCJleHAiOjMzMDg0Mjk4NDIxfQ.-ZNOLrw1W9OOf9iG8QkgZuFJR5JUJmHDZvkZLsdR15Y'; // A sample app token
Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });


        var viewer = new Modelo.View.Viewer3D("model");

        viewer.addInput(new Modelo.View.Input.Mouse(viewer)); // Add mouse to control camera.
        var selectElementTool = new Modelo.View.Tool.SelectElements(viewer);
        viewer.addTool(selectElementTool);
        selectElementTool.setEnabled(true);
        selectElementTool.setMultiselectEnabled(true);
        viewer.getEventEmitter().on("onElementSelected", (elementNames1) => {

        });
        
        viewer.loadModel(modelId, // Load the model into the viewer.
            null,
            function () {


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

