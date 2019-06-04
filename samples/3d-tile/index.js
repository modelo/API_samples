const modelId = "localmodel";
const appToken = " eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsInVzZXJuYW1lIjoic2FtcGxlcyIsImlhdCI6MTU0ODE0NjI3NywiZXhwIjozMzA4NDE0NjI3N30.XoUmS8836nUVm0mASqL6qiaXgg34Xn4lyieaPtrn5mE";

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

const viewer = new Modelo.View.Viewer3D("model");

// Create ground geometry
// var ground = new Modelo.Scene3D.Pawn("ground", viewer.getResourceManager(), viewer.getMaterialManager());
// ground.createSolidCube();
// ground.setScaling(25, 25, 0.25);
// viewer.getScene().addPawn(ground);
var mouse = new Modelo.View.Input.Mouse(viewer);
viewer.addInput(mouse);

// Add select element tool.
var selectElementTool = new Modelo.View.Tool.SelectElements(viewer);
viewer.addTool(selectElementTool);
selectElementTool.setEnabled(true);

// Register the element selected event.
var elementNames = [];
viewer.getEventEmitter().on("onElementSelected", function (elementInfos) {
    console.log(elementInfos);
    elementNames = [];
    elementInfos.forEach(function (elementInfo) {
        var elementName = elementInfo.modelId + "+" + elementInfo.fileName + "/" + elementInfo.elementName;
        elementNames.push(elementName);
    });
});

viewer.loadTileset("345", progress => {
    // second parameter is an optional progress callback
    const c = document.getElementById("progress");
    c.innerHTML = "Loading: " + Math.round(progress * 100) + "%";
});

viewer.getRenderScene().setProgressiveRenderingEnabled(false);

viewer.setRenderingLinesEnabled(true);