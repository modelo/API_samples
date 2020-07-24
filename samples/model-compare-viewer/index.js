const appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUzLCJ1c2VybmFtZSI6Ik1vZGVsbyIsImlzUGVybWFuZW50Ijp0cnVlLCJpYXQiOjE1Njc1NjI0MTksImV4cCI6MzMxMDM1NjI0MTl9.EbW_cSPca4kWLedgNtfrGguog_o-3CCM5WhM7fFi0GA";

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });


var modelId1 = "3rjZVNr4";
var modelId2 = "a8bbbn85";

var that = this;

var viewer1 = new Modelo.View.Viewer3DCompare("compare-model");

viewer1.addInput(new Modelo.View.Input.Mouse(viewer1)); // Add mouse to control camera.

var selectElementTool = new Modelo.View.Tool.SelectElements(viewer1);
selectElementTool.setEnabled(true);
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

// Load base model.
viewer1.loadModelAtViewport(modelId1, 0, null)
    .then(function () { // success
        console.log("model1 loading done");
        if (loadingDone2) {
            return Modelo.Model.compare(modelId1, modelId2);
        }
        loadingDone1 = true;
    })
    .then(function (data) {
        if (data) {
            setElementsColor(data);
        }
    })
    .catch(function(e){ });

// Load comparing model.
viewer1.loadModelAtViewport(modelId2, 1, null)
    .then(function () { // success
        console.log("model2 loading done");
        if (loadingDone1) {
            return Modelo.Model.compare(modelId1, modelId2);
        }
        loadingDone2 = true;
    })
    .then(function(data) {
        if (data) {
            setElementsColor(data);
        }
    })
    .catch(function(e) { });

document.getElementById("horizontal").onchange = function() {
    var isHorizontal = document.getElementById("horizontal").checked;
    viewer1.getCamera().setSplitHorizontal(isHorizontal);
}

$("#split").range({
    min: 0.1,
    max: 0.9,
    start: 0.5,
    step: 0.1,
    onChange: function(value) {
        viewer1.getCamera().setSplitPercentage(value);
    }
});

