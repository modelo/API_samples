const modelId = "localmodel";
const appToken = " eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsInVzZXJuYW1lIjoic2FtcGxlcyIsImlhdCI6MTU0ODE0NjI3NywiZXhwIjozMzA4NDE0NjI3N30.XoUmS8836nUVm0mASqL6qiaXgg34Xn4lyieaPtrn5mE";

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

const viewer = new Modelo.View.Viewer3D("model");

// Create ground geometry
var ground = new Modelo.Scene3D.Pawn("ground", viewer.getResourceManager(), viewer.getMaterialManager());
ground.createSolidCube();
ground.setScaling(25, 25, 0.25);
viewer.getScene().addPawn(ground);

viewer.loadTileset("../../tileset/tileset.json", progress => {
    // second parameter is an optional progress callback
    const c = document.getElementById("progress");
    c.innerHTML = "Loading: " + Math.round(progress * 100) + "%";
});

document.getElementById("get-guid").onclick = function() {
    console.log(viewer.getScene().getElementGuid("localmodel+0/176804"));
}

document.getElementById("get-element-name").onclick = function() {
    console.log(viewer.getScene().getElementNameByGuid("203cff26-4c9d-4eb4-93e5-28d28a0340f2"));
}