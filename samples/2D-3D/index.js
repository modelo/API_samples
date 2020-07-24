var modelId = "98yN2lrK";
var appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUzLCJ1c2VybmFtZSI6Ik1vZGVsbyIsImlzUGVybWFuZW50Ijp0cnVlLCJpYXQiOjE1Njc1NjI0MTksImV4cCI6MzMxMDM1NjI0MTl9.EbW_cSPca4kWLedgNtfrGguog_o-3CCM5WhM7fFi0GA"

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

var oldElementName = null;
var oldTarget = null;
const fill = '#00FF00';

var viewer = new Modelo.View.Viewer3D("model", {
  isMobile: isMobile(),
  stencil: true
});
// model loaded successfully
// add mouse to control camera.
viewer.addInput(new Modelo.View.Input.Mouse(viewer));
viewer.addInput(new Modelo.View.Input.Touch(viewer));
var selectElementTool = new Modelo.View.Tool.SelectElements(viewer);
viewer.addTool(selectElementTool);
selectElementTool.setEnabled(true);
viewer.setEffectEnabled("Highlight", true);
viewer.setEffectParameter("Highlight", "intensity", 1.0);
viewer.getEventEmitter().on("onElementSelected", elementNames => {
  const fill = '#00FF00';

  if (oldElementName) {
    viewer.getRenderScene().getEffect("Highlight").removeElements([oldElementName]);
  }

  if (oldTarget) {
    for (var i = 0; i < oldTarget.children.length; i++) {
      var child = oldTarget.children[i];
      child.style.fill = "";
    }
  }

  if (elementNames.length === 0) {
    return;
  }

  var strs = elementNames[0].split("/")
  elementid = strs[strs.length -1];

  viewer.getRenderScene().getEffect("Highlight").addElements([elementNames[0]], {
    emissiveColor: [0.0, 1.0, 0.0]
  });
  oldElementName = elementNames[0];

  var test = $("[elementid=" + elementid + "]" + "[linkid=0]");
  if (test.length > 0) {
    for (var i = 0; i < test[0].children.length; i++) {
      var child = test[0].children[i];
      child.style.fill = fill;
    }
    oldTarget = test[0];
  }
});

viewer
  .loadModel(modelId, progress => {
    // second parameter is an optional progress callback
    var c = document.getElementById("progress");
    c.innerHTML = "Loading: " + Math.round(progress * 100) + "%";
  })
  .then(() => {

  });

  Modelo.Model.get(modelId).then(function(res) {
    var index = res.attachments.findIndex(function(item) { return item.filename === "floorPlans.json"});
    if (index !== -1) {
      // Get uploaded svg files.
      $.get(res.attachments[index].url, function(data) {
        var floorPlans = Object.values(data);
        if (floorPlans.length === 0) {
          return;
        }
        // Get the url of svg file.
        index = res.attachments.findIndex(function(item) {
          var strs = item.filename.split("_");
          return strs[strs.length - 1] === floorPlans[0].file;
        });
        if (index !== -1) {
          $.get(res.attachments[index].url, function(data){
            document.getElementById("svg-container").innerHTML = data;

            window.addEventListener('mouseup', (e) => {
              var target = e.target;
              while(target && target.tagName !== "g") {
                target = target.parentElement;
              } 
              if (!target) {
                return;
              }
              var elementName = modelId + "+" + target.attributes.linkid.nodeValue + "/" + target.attributes.elementid.nodeValue;

              if (oldElementName) {
                viewer.getRenderScene().getEffect("Highlight").removeElements([oldElementName]);
              }
              if (oldTarget) {
                for (var i = 0; i < oldTarget.children.length; i++) {
                  var child = oldTarget.children[i];
                  child.style.fill = "";
                }
              }

              oldElementName = elementName;
              
              selectElementTool.pick([elementName], true);

              viewer.getRenderScene().getEffect("Highlight").addElements([elementName], {
                emissiveColor: [0.0, 1.0, 0.0]
              });

              for (var i = 0; i < target.children.length; i++) {
                var child = target.children[i];
                child.style.fill = fill;
              }
              oldTarget = target;
            })

          }, "text");
        }
      }, "json");
    }
  });
