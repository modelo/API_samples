var modelId = "g8l2v51y";
var appToken =
  " eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsInVzZXJuYW1lIjoic2FtcGxlcyIsImlhdCI6MTU0ODE0NjI3NywiZXhwIjozMzA4NDE0NjI3N30.XoUmS8836nUVm0mASqL6qiaXgg34Xn4lyieaPtrn5mE";

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

var viewer = new Modelo.View.Viewer360("model");

const panoData = {
      440: {
        imageUrls: [
          'https://s3.cn-north-1.amazonaws.com.cn/com.modelo.project.asserts.prod/assets/mQ5r-eZkd1550560426051/converted/2048_left_negx.jpg',
          'https://s3.cn-north-1.amazonaws.com.cn/com.modelo.project.asserts.prod/assets/mQ5r-eZkd1550560426051/converted/2048_left_negy.jpg',
          'https://s3.cn-north-1.amazonaws.com.cn/com.modelo.project.asserts.prod/assets/mQ5r-eZkd1550560426051/converted/2048_left_negz.jpg',
          'https://s3.cn-north-1.amazonaws.com.cn/com.modelo.project.asserts.prod/assets/mQ5r-eZkd1550560426051/converted/2048_left_posx.jpg',
          'https://s3.cn-north-1.amazonaws.com.cn/com.modelo.project.asserts.prod/assets/mQ5r-eZkd1550560426051/converted/2048_left_posy.jpg',
          'https://s3.cn-north-1.amazonaws.com.cn/com.modelo.project.asserts.prod/assets/mQ5r-eZkd1550560426051/converted/2048_left_posz.jpg'
        ],
        images: [],
        name: '',
        ready: false,
        toAssets: [],
        type: 'cubemaps'
      }
    };
    
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

viewer
  .load360(panoData, null, () => {}, () => {}, progress => {
    // second parameter is an optional progress callback
    var c = document.getElementById("progress");
    c.innerHTML = "Loading: " + Math.round(progress * 100) + "%";
  });
