const modelId = "j1mXXDrb";
const appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUzLCJ1c2VybmFtZSI6Ik1vZGVsbyIsImlzUGVybWFuZW50Ijp0cnVlLCJpYXQiOjE1Njc1NjI0MTksImV4cCI6MzMxMDM1NjI0MTl9.EbW_cSPca4kWLedgNtfrGguog_o-3CCM5WhM7fFi0GA"

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

function updateProgress(progress) {
    var c = document.getElementById("progress");
    c.innerHTML = "Loading: " + Math.round(progress * 100) + "%";
}

const viewer = new Modelo.View.Viewer3DDark("model");

viewer.addInput(new Modelo.View.Input.Mouse(viewer)); // Add mouse to control camera.
viewer.addInput(new Modelo.View.Input.Touch(viewer));

const selectElementTool = new Modelo.View.Tool.SelectElements(viewer);
viewer.addTool(selectElementTool);
selectElementTool.setEnabled(true);
viewer.getEventEmitter().on("onPointPicked", point => {
  console.log(point);
})

const colors = [
    {
        color: 'default',
        value: null
    },
    {
        color: 'red',
        value: [1, 0, 0]
    },
    {
        color: 'green',
        value: [0, 1, 0]
    },
    {
        color: 'blue',
        value: [0, 0, 1]
    }
];
viewer.loadModel(modelId, progress => {
 // /assets/js/utils.js
  updateProgress(progress);
}).then(() => {
  setDarkTheme(viewer);
    let elementNames = [];
    let elements = [];
    const names = viewer.getScene().getElementsNames();
    viewer.getEventEmitter().on("onElementSelected", elementNames1 => {
        // Restore the element's colors.
        if (elementNames.length !== 0) {
        viewer.getScene().setElementsColor(elementNames, null);
        }
        elementNames = elementNames1;
        if (elementNames1.length === 0) {
        document.getElementById("element").innerHTML = "Select element with left button: N/A";
        } else {
        document.getElementById("element").innerHTML = "Select element with left button: " + elementNames1[0];
        }
    });

    colors.forEach(item => {
        document.getElementById(item.color).onclick = function() {
            viewer.getScene().setElementsColor(elementNames, item.value);
            document.getElementById("element-selected").innerHTML = "Selected Color: " + item.color;
        }
    });
});

