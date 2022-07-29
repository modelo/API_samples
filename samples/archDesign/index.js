var modelId = "3rjZVNr4";
var appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUzLCJ1c2VybmFtZSI6Ik1vZGVsbyIsImlzUGVybWFuZW50Ijp0cnVlLCJpYXQiOjE1Njc1NjI0MTksImV4cCI6MzMxMDM1NjI0MTl9.EbW_cSPca4kWLedgNtfrGguog_o-3CCM5WhM7fFi0GA"

var HiddenElements = [];

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

function updateProgress(progress) {
    var c = document.getElementById("progress");
    c.innerHTML = "Loading: " + Math.round(progress * 100) + "%";
}

var mode = document.getElementById("admode");
var viewer = new Modelo.View.Viewer3D("model", { isMobile: isMobile() });
$("#range1").range({
    min: 0.0,
    max: 5.0,
    start: 0.0,
    step: 1.0,
    onChange: function(value) {
      return;
    }
  });

viewer.setSketchEnabled(true);

viewer.addInput(new Modelo.View.Input.Mouse(viewer)); // Add mouse to control camera.
viewer.addInput(new Modelo.View.Input.Keyboard(viewer));
viewer.addInput(new Modelo.View.Input.Touch(viewer));

var archDesignTool = new Modelo.View.Tool.ArchDesign(viewer);
viewer.addTool(archDesignTool);
archDesignTool.setEnabled(true);
archDesignTool.setSelectMode(0);

viewer.loadModel(modelId, updateProgress).then(() => {
    // success
    console.log("loading done");

    let nodesSelected = [];
    viewer.registerEventListener("onNodesSelected", nodesSelected1 => {
        nodesSelected = nodesSelected1;
    }); 
    
    $("#range1").range({
        min: 0.0,
        max: 5.0,
        start: 0.0,
        step: 1.0,
        onChange: function(value) {
        //   viewer.setEffectParameter("Sketch", "detail", value);
            archDesignTool.outlineCurrentSelectedNodes(value);
        }
      });

    mode.onchange = function () {
        var m = parseInt(mode.value);
        archDesignTool.setSelectMode(m);
    };

    document.getElementById("red").onclick = function () {
        archDesignTool.overrideCurrentSelectedNodesWith([255, 0, 0, 1]);
    };
    document.getElementById("green").onclick = function () {
        archDesignTool.overrideCurrentSelectedNodesWith([0, 255, 0, 1]);
    };
    document.getElementById("blue").onclick = function () {
        archDesignTool.overrideCurrentSelectedNodesWith([0, 0, 255, 1]);
    };
    document.getElementById("reset").onclick = function () {
        archDesignTool.unFloodCurrentSelectedNodes();
    };
    
    document.getElementById("selectedRed").onclick = function () {
        archDesignTool.setColorOfSelectedOutline([255, 0, 0, 1]);
    };
    document.getElementById("selectedGreen").onclick = function () {
        archDesignTool.setColorOfSelectedOutline([0, 255, 0, 1]);
    };
    document.getElementById("selectedBlue").onclick = function () {
        archDesignTool.setColorOfSelectedOutline([0, 0, 255, 1]);
    };
    
    document.getElementById("hoveringRed").onclick = function () {
        archDesignTool.setColorOfHoveringOutline([255, 0, 0, 1]);
    };
    document.getElementById("hoveringGreen").onclick = function () {
        archDesignTool.setColorOfHoveringOutline([0, 255, 0, 1]);
    };
    document.getElementById("hoveringBlue").onclick = function () {
        archDesignTool.setColorOfHoveringOutline([0, 0, 255, 1]);
    };
});
