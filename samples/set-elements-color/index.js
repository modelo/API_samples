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

        viewer.addInput(new Modelo.View.Input.Mouse(viewer)); // Add mouse to control camera.

        const selectElementTool = new Modelo.View.Tool.SelectElements(viewer);
        viewer.addTool(selectElementTool);
        selectElementTool.setEnabled(true);

        viewer.loadModel(modelId, updateProgress).then(() => {
            // success
            console.log("loading done");

            // Save the selected element names here.
            let elementNames = [];
            viewer.getEventEmitter().on("onElementSelected", elementNames1 => {
                // Restore the element's colors.
                if (elementNames.length !== 0) {
                    viewer.getScene().setElementsColor(elementNames, null);
                }

                elementNames = elementNames1;
                if (elementNames1.length === 0) {
                    document.getElementById("element").innerHTML = "Select element with left button: N/A";
                } else {
                    document.getElementById("element").innerHTML =
                        "Select element with left button: " + elementNames1[0];
                }
            });

            document.getElementById("default").onclick = function() {
                viewer.getScene().setElementsColor(elementNames, null);
            };
            document.getElementById("red").onclick = function() {
                viewer.getScene().setElementsColor(elementNames, [1, 0, 0]);
            };
            document.getElementById("green").onclick = function() {
                viewer.getScene().setElementsColor(elementNames, [0, 1, 0]);
            };
            document.getElementById("blue").onclick = function() {
                viewer.getScene().setElementsColor(elementNames, [0, 0, 1]);
            };
        });
    })
    .catch(e => console.log(e.message));
