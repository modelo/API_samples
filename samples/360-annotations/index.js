var appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjY3LCJ1c2VybmFtZSI6ImZhbmdxaSIsImlzUGVybWFuZW50Ijp0cnVlLCJpYXQiOjE1ODY1MDQyNTQsImV4cCI6MzMxMjI1MDQyNTR9.YTUQKILCwrIPwpY1k4AXvtBkezD-eCzo3INN2THVR3s"

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
  panoIds: [988],
  annotations: [
    {
      from: 988,
      position: [900, 667, -186],
      id: '红星国际生活广场'
    },
    {
      from: 988,
      position: [1000, 1307, -186],
      id: '珠江社区服务中心'
    },
    {
      from: 988,
      position: [500, 1207, -186],
      id: '海德商业广场'
    },
    {
      from: 988,
      position: [800, 3007, -186],
      id: '凯马双语幼儿园'
    },
    {
      from: 988,
      position:  [14.615962207317352, -2.3484932631254196, -2.4203764647245407],
      id: '长江壹号生活广场'
    },
    {
      from: 988,
      position: [14.762240052223206, -2.6573489606380463, -0.12151231057941914],
      id: '新区一中'
    },
    {
      from: 988,
      position: [13.371639847755432, -6.743798106908798, -0.8487768284976482],
      id: '明基医院'
    },
    {
      from: 988,
      position: [20000, -15000, -186],
      id: '新区实小竹园路校区'
    },
    {
      from: 988,
      position: [-5.113048106431961, -12.953808903694153, -5.572753697633743],
      id: '苏科大石湖校区'
    },
    {
      from: 988,
      position: [5.634852200746536, -13.888134062290192, 0.6067782081663609],
      id: '轨道三号线'
    },
    {
      from: 988,
      position: [14.064845144748688, 5.149987041950226, -0.8110329508781433],
      id: '中山东路'
    },
    {
      from: 988,
      position: [7.241590619087219, -13.12024176120758, 0.6470024026930332],
      id: '苏福快速路'
    },
    {
      from: 988,
      position:  [12.895826697349548, 7.401649653911591, 1.9781932979822159],
      id: '木渎南行中学'
    },
    {
      from: 988,
      position: [14.843348264694214, 0.5217694491147995, 2.098277360200882],
      id: '苏州科技大学'
    },
    {
      from: 988,
      position: [12.377722263336182, -8.166557550430298, 2.2581689804792404],
      id: '新旅城幼儿园'
    },
    {
      from: 988,
      position: [8.416450917720795, -11.713692247867584, 4.117374122142792],
      id: '横山公园'
    },
    {
      from: 988,
      position: [6.481514275074005, -13.222037851810455, 2.857917621731758],
      id: '横塘人民医院'
    },
  ]
};

const indicatorElementCache = {};


viewer.loadPanos(panoData, {
  onIndicatorsUpdate: indicators => {
    indicators.forEach((indicator, i) => {
      let ele = indicatorElementCache[indicator.annotation.id];
      if (!ele) {
        ele = createIndicatorElement(indicator);
        indicatorElementCache[indicator.annotation.id] = ele;
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
  const wrapper = document.createElement("div");

  element.classList.add("indicator");
  icon.classList.add("indicator-icon");
  wrapper.classList.add("indicator-wrapper");

  element.appendChild(icon);
  wrapper.appendChild(element);
  container.appendChild(wrapper);

  element.onclick = () => {
    Object.keys(indicatorElementCache)
      .map(k => indicatorElementCache[k])
      .forEach(ele => {
        ele.style.display = "none";
      });
  };

  return element;
}
