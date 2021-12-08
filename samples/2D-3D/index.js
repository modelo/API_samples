var modelId = "x1qLqXrW";
var appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzMxLCJ1c2VybmFtZSI6ImxtIiwiaXNQZXJtYW5lbnQiOnRydWUsImlhdCI6MTYzNDYxMjQ2NSwiZXhwIjozMzE3MDYxMjQ2NX0.Q8IHwhg90aatmTeZChUthyhyt4KVAgKgf7LFMTgL0Ao"

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
    elementid = strs[strs.length - 1];

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

viewer.loadModel(modelId, progress => {
    // second parameter is an optional progress callback
    var c = document.getElementById("progress");
    c.innerHTML = "Loading: " + Math.round(progress * 100) + "%";
}).then(() => {

});

Modelo.Model.get(modelId).then(function (res) {
    $.ajaxSettings.async = false; 
    var viewPlanFiles = [];
    var len = res.attachments.length
    
    var compareAttachmentFileNameAndJsonItemName = (jsonItem, attachmentItem) => {
        var strs = attachmentItem.filename.split("_");
        return strs[strs.length - 1] === jsonItem.file;
    };
    var setViewList = (item, currentItemIndex, divName) => {
        $.get(item.url, function (data) {
            var floorPlans = Object.values(data);
            if (floorPlans.length === 0) {
                return;
            }
            for (const floorPlanItem of floorPlans) {
                var index = viewPlanFiles.findIndex(function (viewPlanItem) {
                    return compareAttachmentFileNameAndJsonItemName(floorPlanItem, viewPlanItem.item);
                });

                var setDiv = (index, itemName) => {                    
                    $(divName).append(`<option value="${index}">${itemName}</option>`);
                }

                if (index !== -1) {
                    var itemName = viewPlanFiles[index].item.filename.split("_")[0];
                    setDiv(viewPlanFiles[index].i, itemName);
                    viewPlanFiles.splice(index, 1);
                } else {
                    for (let j = currentItemIndex + 1; j < len; j++) {
                        const attachmentItem = res.attachments[j];
                        if (!compareAttachmentFileNameAndJsonItemName(floorPlanItem, attachmentItem)) { continue; }

                        var itemName = attachmentItem.filename.split("_")[0];
                        setDiv(j, itemName);
                    }
                }
            }
        }, "json");
    };
    for (let i = 0; i < len; i++) {
        let item = res.attachments[i];
        if (item.filename === "floorPlans.json") {
            $("#viewType").append('<optgroup value="0" id="floorPlans" label="楼层平面视图"> </optgroup>');
            setViewList(item, i, "#floorPlans");
            continue;
        }
        if (item.filename === "elevations.json") {
            $("#viewType").append('<optgroup value="1" id="elevations" label="立面视图"> </optgroup>');
            setViewList(item, i, "#elevations");
            continue;
        }
        if (item.filename === "sections.json") {
            $("#viewType").append('<optgroup value="2" id="sections" label="剖面视图"></optgroup>');
            setViewList(item, i, "#sections");
            continue;
        }
        if (item.filename.substr(item.filename.lastIndexOf('.'))===".svg"){            
            viewPlanFiles.push({ item, i });
        }
    }

    return res
}).then((res) => {
    $.ajaxSettings.async = true; 
    var setView = (url) => {
        $.get(url, function (data) {
            document.getElementById("svg-container").innerHTML = data;

            window.addEventListener('mouseup', (e) => {
                var target = e.target;
                while (target && target.tagName !== "g") {
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
    
    let selectedIndex = parseInt($("select#viewType option:selected").val());
    setView(res.attachments[selectedIndex].url);
    
    $("select#viewType").change(function () {
        var index = parseInt($(this).val());
        setView(res.attachments[index].url);
    });
});