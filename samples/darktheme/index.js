var modelId = "xrazwp1m";
//var modelId = "x1qp4jrW";
var appToken =
    " eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsInVzZXJuYW1lIjoic2FtcGxlcyIsImlhdCI6MTU0ODE0NjI3NywiZXhwIjozMzA4NDE0NjI3N30.XoUmS8836nUVm0mASqL6qiaXgg34Xn4lyieaPtrn5mE";

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

var viewer = new Modelo.View.Viewer3D("model");

viewer
    .loadModel(modelId, progress => {
        // second parameter is an optional progress callback
        var c = document.getElementById("progress");
        c.innerHTML = "Loading: " + Math.round(progress * 100) + "%";
    })
    .then(() => {
        viewer.addInput(new Modelo.View.Input.Mouse(viewer));

        // Overrided the common rendering shader.
        //var shader = viewer.getResourceManager().getShader("dark", []);
        //if (!shader.ready) {
        //var shaderSource = ShaderLibrary["dark"];
        //    shader.createFromShaderSource(shaderSource, []);
        //}
        //viewer.getRenderScene().setOverridedShaders(shader);
                        
        viewer.setSpecularEnabled(true);
                        
        viewer.setBackgroundColor([26.0 / 255.0, 26.0 / 255.0, 55.0 / 255.0, 1.0]);

        viewer.setEffectEnabled("Sketch", true);
        viewer.setEffectParameter("Sketch", "color", [81.0 / 255.0, 185.0 / 255.0, 1.0]);
        viewer.setEffectParameter("Sketch", "colored", true);
        //viewer.setEffectParameter("Sketch", "surfaceColor", [51.0 / 255.0, 145.0 / 255.0, 1.0, 0.2]);
        viewer.setEffectParameter("Sketch", "transparents", true);
                        
        // Turn on SSAO effect
        viewer.setEffectEnabled("SSAO", true);
        viewer.setEffectParameter("SSAO", "transparents", true);
    });
