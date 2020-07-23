var modelId = "q8ZZZ28a";
var appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUzLCJ1c2VybmFtZSI6Ik1vZGVsbyIsImlzUGVybWFuZW50Ijp0cnVlLCJpYXQiOjE1Njc1NjI0MTksImV4cCI6MzMxMDM1NjI0MTl9.EbW_cSPca4kWLedgNtfrGguog_o-3CCM5WhM7fFi0GA"

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

function updateProgress(progress) {
  var c = document.getElementById("progress");
  c.innerHTML = "Loading: " + Math.round(progress * 100) + "%";
}

var viewer = new Modelo.View.Viewer3D("model", {   isMobile: isMobile() });

viewer.addInput(new Modelo.View.Input.Mouse(viewer)); // Add mouse to control camera.
viewer.addInput(new Modelo.View.Input.Touch(viewer));

var selectElementTool = new Modelo.View.Tool.SelectElements(viewer);
viewer.addTool(selectElementTool);
selectElementTool.setEnabled(true);

viewer.setEffectEnabled("Sketch", true);
viewer.setEffectParameter("Sketch", "colored", true);
viewer.setShadowEnabled(true);
viewer.setEffectEnabled("SSAO", true);

viewer.getEventEmitter().on("onPointPicked", point => {
  console.log(point);
})

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
      document.getElementById("element").innerHTML = "Select element with left button: " + elementNames1[0];
    }
  });

  document.getElementById("random-color").onclick = function() {
    // 获取随机颜色值
    var randomColor = [Math.random(), Math.random(), Math.random()];
    if (elementNames) {
      elementNames.forEach(function(elementName) {
        // 获取elementName对应的材质名称（全局唯一）
        var materialsNames = viewer.getScene().getElementMaterialNames(elementName);
        if (materialsNames) {
          materialsNames.forEach(function(materialName) {
            // 对每个材质名称，设置其颜色值
            viewer.setMaterialParameter(materialName, "color", randomColor);
          });
        }
      });
    }
    if (elementNames.length == 0){
      window.alert("Please select an element first.");
    }
  };

  document.getElementById("reset-texture").onclick = function() {
    if (elementNames) {
      elementNames.forEach(function(elementName) {
        // 获取elementName对应的材质名称（全局唯一）
        var materialNames = viewer.getScene().getElementMaterialNames(elementName);
        if (materialNames) {
          materialNames.forEach(function(materialName) {
            // 对每个材质名称，设置贴图，传入null，表示还原为默认贴图
            viewer.setMaterialParameter(materialName, "colorTexture", null);
          });
          selectElementTool.pick([], false);
        }
      });
    }
    if (elementNames.length == 0){
      window.alert("Please select an element with texture first.");
    }
  }

  document.getElementById("thumbnail1").addEventListener('click',function(event) {
    if (elementNames) {
      elementNames.forEach(function(elementName) {
         // 获取elementName对应的材质名称（全局唯一）
        var materialNames = viewer.getScene().getElementMaterialNames(elementName);
        if (materialNames) {
          materialNames.forEach(function(materialName) {
             // 对每个材质名称，设置贴图, 传入参数为贴图路径
            viewer.setMaterialParameter(materialName, "colorTexture", "./texture.jpg");
          });
          selectElementTool.pick([], false);
        }
      });
    }
    if (elementNames.length == 0){
      window.alert("Please select an element with texture first.");
    }
  });

  document.getElementById("thumbnail2").addEventListener('click',function(event) {
    if (elementNames) {
      elementNames.forEach(function(elementName) {
        // 获取elementName对应的材质名称（全局唯一）
        var materialNames = viewer.getScene().getElementMaterialNames(elementName);
        if (materialNames) {
          materialNames.forEach(function(materialName) {
            // 对每个材质名称，设置贴图, 传入参数为贴图路径
            viewer.setMaterialParameter(materialName, "colorTexture", "./texture 2.jpg");
          });
          selectElementTool.pick([], false);
        }
      });
    }
    if (elementNames.length == 0){
      window.alert("Please select an element with texture first.");
    }
  });

  document.getElementById("thumbnail3").addEventListener('click',function(event) {
    if (elementNames) {
      elementNames.forEach(function(elementName) {
        // 获取elementName对应的材质名称（全局唯一）
        var materialNames = viewer.getScene().getElementMaterialNames(elementName);
        if (materialNames) {
          materialNames.forEach(function(materialName) {
            // 对每个材质名称，设置贴图, 传入参数为贴图路径
            viewer.setMaterialParameter(materialName, "colorTexture", "./texture 3.jpg");
          });
          selectElementTool.pick([], false);
        }
      });
    }
    if (elementNames.length == 0){
      window.alert("Please select an element with texture first.");
    }
  });
});
