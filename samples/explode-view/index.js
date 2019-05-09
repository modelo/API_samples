var modelId = "Z8WqeV1A";
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
    // model loaded successfully
    // add mouse to control camera.
    viewer.addInput(new Modelo.View.Input.Mouse(viewer));
    // add keyboard callback.
    var keyboard = new Modelo.View.Input.Keyboard(viewer);
    viewer.addInput(keyboard);
    keyboard.addKeyUpListener(keyboard => {
      if (keyboard.key === 27) {
        viewer.destroy();
      }
    });
  });

const ceiling = [modelId+"+0/655533", modelId+"+0/933840", modelId+"+0/724430", modelId+"+0/954779"];
const livingRoom = [modelId+"+0/655533", modelId+"+0/933840", modelId+"+0/724430", modelId+"+0/954779", modelId+"+0/736330", modelId+"+0/744525", modelId+"+0/744522", modelId+"+0/744523", modelId+"+0/744524", modelId+"+0/735853", modelId+"+0/736152", modelId+"+0/736223", modelId+"+0/566588", modelId+"+0/701300", modelId+"+0/983306", modelId+"+0/983030", modelId+"+0/983388", modelId+"+0/983156", modelId+"+0/983236", modelId+"+0/982762", modelId+"+0/983164", modelId+"+0/987054", modelId+"+0/987167", modelId+"+0/736435", modelId+"+0/735739", modelId+"+0/981963", modelId+"+0/985756", modelId+"+0/984486", modelId+"+0/512683", modelId+"+0/550255", modelId+"+0/954641", modelId+"+0/909735", modelId+"+0/909737", modelId+"+0/909736", modelId+"+0/909738", modelId+"+0/909754", modelId+"+0/909753", modelId+"+0/909751", modelId+"+0/909752", modelId+"+0/909757", modelId+"+0/909758", modelId+"+0/909756", modelId+"+0/909759", modelId+"+0/909755", modelId+"+0/704053"];
const level1 = [modelId+"+0/427092", modelId+"+0/845266", modelId+"+0/418079", modelId+"+0/198749", modelId+"+0/849032", modelId+"+0/422243", modelId+"+0/425745", modelId+"+0/424922", modelId+"+0/906885", modelId+"+0/493879", modelId+"+0/627064", modelId+"+0/493612", modelId+"+0/628523", modelId+"+0/627729", modelId+"+0/493790", modelId+"+0/493697", modelId+"+0/977133", modelId+"+0/708715", modelId+"+0/414482", modelId+"+0/993091", modelId+"+0/986988", modelId+"+0/677695", modelId+"+0/686184", modelId+"+0/684791", modelId+"+0/679009", modelId+"+0/696998", modelId+"+0/418985", modelId+"+0/554644", modelId+"+0/418977", modelId+"+0/211850", modelId+"+0/936823", modelId+"+0/213811", modelId+"+0/946631", modelId+"+0/946759", modelId+"+0/946708", modelId+"+0/947379", modelId+"+0/947330", modelId+"+0/802782", modelId+"+0/812954", modelId+"+0/997120", modelId+"+0/997118", modelId+"+0/997050", modelId+"+0/997116", modelId+"+0/997032", modelId+"+0/997068", modelId+"+0/994782", modelId+"+0/997114", modelId+"+0/997051", modelId+"+0/997069", modelId+"+0/996881", modelId+"+0/997033", modelId+"+0/997119", modelId+"+0/997121", modelId+"+0/997115", modelId+"+0/997117", modelId+"+0/935747", modelId+"+0/674370", modelId+"+0/680539", modelId+"+0/694796", modelId+"+0/993980", modelId+"+0/989521", modelId+"+0/989344", modelId+"+0/990317", modelId+"+0/990648", modelId+"+0/990645", modelId+"+0/990647", modelId+"+0/990646", modelId+"+0/990620", modelId+"+0/990596", modelId+"+0/990621", modelId+"+0/988128", modelId+"+0/988640", modelId+"+0/988459", modelId+"+0/988462", modelId+"+0/988603", modelId+"+0/988396", modelId+"+0/647908", modelId+"+0/176804", modelId+"+0/495352", modelId+"+0/950367", modelId+"+0/800348", modelId+"+0/800342", modelId+"+0/800350", modelId+"+0/800381", modelId+"+0/800280", modelId+"+0/778316", modelId+"+0/800329", modelId+"+0/800325", modelId+"+0/800391", modelId+"+0/800340", modelId+"+0/800383", modelId+"+0/800389", modelId+"+0/425292", modelId+"+0/422466", modelId+"+0/906937", modelId+"+0/709246", modelId+"+0/423107", modelId+"+0/704276", modelId+"+0/704286", modelId+"+0/977413"];
const foundation = [modelId+"+0/976752", modelId+"+0/512321", modelId+"+0/512475", modelId+"+0/512471", modelId+"+0/512451", modelId+"+0/512396", modelId+"+0/512299", modelId+"+0/512524", modelId+"+0/512528", modelId+"+0/512279", modelId+"+0/512447", modelId+"+0/512522", modelId+"+0/512469", modelId+"+0/512473", modelId+"+0/512449", modelId+"+0/512319", modelId+"+0/512297", modelId+"+0/512277", modelId+"+0/512394", modelId+"+0/512445", modelId+"+0/512526"];
const level2 = [modelId+"+0/498006", modelId+"+0/457542", modelId+"+0/457534", modelId+"+0/706288", modelId+"+0/554383", modelId+"+0/457479", modelId+"+0/485432", modelId+"+0/234869", modelId+"+0/530178", modelId+"+0/428588", modelId+"+0/428745", modelId+"+0/198694", modelId+"+0/746589", modelId+"+0/765620", modelId+"+0/765523", modelId+"+0/599841", modelId+"+0/746235", modelId+"+0/745997", modelId+"+0/746766", modelId+"+0/599951", modelId+"+0/746634", modelId+"+0/497540", modelId+"+0/430412", modelId+"+0/768442", modelId+"+0/506797", modelId+"+0/506386", modelId+"+0/429964", modelId+"+0/937935", modelId+"+0/430318", modelId+"+0/430361", modelId+"+0/938974", modelId+"+0/430859", modelId+"+0/430064", modelId+"+0/939084", modelId+"+0/767156", modelId+"+0/767153", modelId+"+0/766598", modelId+"+0/709725", modelId+"+0/931630", modelId+"+0/567887", modelId+"+0/931377", modelId+"+0/931569", modelId+"+0/932401", modelId+"+0/933811", modelId+"+0/932862", modelId+"+0/698859", modelId+"+0/937573", modelId+"+0/938763", modelId+"+0/778575", modelId+"+0/778420", modelId+"+0/420270", modelId+"+0/937571", modelId+"+0/938761", modelId+"+0/499496", modelId+"+0/764691", modelId+"+0/549031", modelId+"+0/418183", modelId+"+0/955125", modelId+"+0/954992", modelId+"+0/430997", modelId+"+0/431198", modelId+"+0/431064", modelId+"+0/431144", modelId+"+0/485679", modelId+"+0/940221", modelId+"+0/939962", modelId+"+0/505974", modelId+"+0/485452", modelId+"+0/931860", modelId+"+0/485466", modelId+"+0/485467", modelId+"+0/485469", modelId+"+0/485460", modelId+"+0/485462", modelId+"+0/485464", modelId+"+0/931859", modelId+"+0/485468", modelId+"+0/931858", modelId+"+0/931861", modelId+"+0/931878", modelId+"+0/846335", modelId+"+0/846334", modelId+"+0/485493", modelId+"+0/846351", modelId+"+0/931879", modelId+"+0/931880", modelId+"+0/846332", modelId+"+0/931877", modelId+"+0/846333", modelId+"+0/931881", modelId+"+0/931885", modelId+"+0/745035", modelId+"+0/931884", modelId+"+0/931882", modelId+"+0/931883", modelId+"+0/485492", modelId+"+0/485506", modelId+"+0/687037", modelId+"+0/485500", modelId+"+0/485501"];
  
document.getElementById("explode").onclick = function() {
  viewer.enterExplodedView([foundation, level1, livingRoom, level2, ceiling,], [[0, 0, 0], [0, 0, 30], [0, 0, 60], [0, 0, 90], [0, 0, 120]]);
};
document.getElementById("restore").onclick = function() {
  viewer.quitExplodedView();
};
