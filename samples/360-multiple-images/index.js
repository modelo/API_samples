const appToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUzLCJ1c2VybmFtZSI6Ik1vZGVsbyIsImlzUGVybWFuZW50Ijp0cnVlLCJpYXQiOjE1Njc1NjI0MTksImV4cCI6MzMxMDM1NjI0MTl9.EbW_cSPca4kWLedgNtfrGguog_o-3CCM5WhM7fFi0GA";

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

const containerId = "container";
const viewer = new Modelo.View.Viewer360(containerId);

// add mouse to control camera.
viewer.addInput(new Modelo.View.Input.Mouse(viewer));
viewer.addInput(new Modelo.View.Input.Touch(viewer));
// add keyboard callback.
const keyboard = new Modelo.View.Input.Keyboard(viewer);
viewer.addInput(keyboard);
keyboard.addKeyUpListener(keyboard => {
  if (keyboard.key === 27) {
    viewer.destroy();
  }
});

const panoData = {
  panoIds: [597, 598],
  indicators: [
    {
      from: 597,
      to: 598,
      camera: { phi: 0.10791503702709009, theta: 2.0197173127574315, fov: 78.00000000000004 },
      position: [1080.26025390625, 667.6820678710938, -186.8563690185547]
    }
  ]
};

const indicatorElementCache = {};


viewer.loadPanos(panoData, {
  onIndicatorsUpdate: indicators => {
    indicators.forEach((indicator, i) => {
      let ele = indicatorElementCache[indicator.to];
      if (!ele) {
        ele = createIndicatorElement(indicator);
        indicatorElementCache[indicator.to] = ele;
      }

      const position = indicator.position;
      if (indicator.visible) {
        ele.style.display = "block";
        ele.style.transform = `translate(${position[0]}px,${position[1]}px)`;
      } else {
        ele.style.display = "none";
      }
    });
  },
  onProgress: progress => {
    // second parameter is an optional progress callback
    const c = document.getElementById("progress");
    c.innerHTML = "Loading: " + Math.round(progress * 100) + "%";
  }
});

function createIndicatorElement(indicator) {
  const container = document.getElementById("indicators");
  const element = document.createElement("div");
  const icon = document.createElement("div");
  element.classList.add("indicator");
  icon.classList.add("indicator-icon");
  element.appendChild(icon);
  container.appendChild(element);
  element.onclick = () => {
    Object.keys(indicatorElementCache)
      .map(k => indicatorElementCache[k])
      .forEach(ele => {
        ele.style.display = "none";
      });

    viewer.switchPanorama(indicator.to, indicator.camera);
  };

  return element;
}
