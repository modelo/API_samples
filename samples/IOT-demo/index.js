const modelId = "Q8PDnO8k";
const appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUzLCJ1c2VybmFtZSI6Ik1vZGVsbyIsImlzUGVybWFuZW50Ijp0cnVlLCJpYXQiOjE1Njc1NjI0MTksImV4cCI6MzMxMDM1NjI0MTl9.EbW_cSPca4kWLedgNtfrGguog_o-3CCM5WhM7fFi0GA"
let activeIndex = 0;
let modeloPanelList = [];
let panels = [];
let comments = [];
let ribbonGroups = {};
let heatmaps = [];
let volume = null;

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });
const viewer = new Modelo.View.Viewer3DDark("model", {
    stencil: true,
    isMobile: isMobile()
});
viewer.addInput(new Modelo.View.Input.Mouse(viewer)); // Add mouse to control camera.
viewer.addInput(new Modelo.View.Input.Touch(viewer));
viewer.setEffectEnabled("Highlight", true);
viewer.setEffectParameter("Highlight", "intensity", 1.0);
viewer.setLazyRenderingEnabled(false);

viewer.loadModel(modelId, progress => {
    updateProgress(progress);
}).then( async () => {
    viewer.getCamera().transformToPerspective();
    initController();
    initModeloPanels();
});

// 渲染顶部控制按钮
async function initController() {
    const container = document.getElementById('controller');
    container.innerHTML = ControlList.map((control, index) => {
        return `
            <div class="MonitorController__item ${index !== 0 ? '' : 'MonitorController__item--active'}" data-index="${index}">
                <div class="MonitorController__itemTitle">${control.title}</div>
                <img src="${control.icon}" alt="" class="MonitorController__itemImage" />
            </div>
        `
        // return `<iot-controller-item title="${control.title}" icon="${control.icon}"></iot-controller-item>`
    }).join('');
    initAction(0, -1);

    // 顶部导航按钮事件
    $('.MonitorController__item').on('click', async function () {
        // 选中导航样式，高亮当前导航下元素
        $(this).addClass('MonitorController__item--active').siblings().removeClass('MonitorController__item--active');
        initAction(Number($(this).attr('data-index')), activeIndex)
    });
}

const initAction = async (selected, prevActiveIndex) => {
    activeIndex = selected;
    prevActiveIndex >= 0 && highlightElements(getHighlightElements(prevActiveIndex), null);
    highlightElements(getHighlightElements(activeIndex), [169 / 255, 215 / 255, 56 / 255]);
    gotoView(ModelCommentsData[ControlList[activeIndex].view])
    switch(activeIndex) {
        case 0: {
            removeHeatmaps();
            removeVolume(volume);
            await renderRibbons();
            break;
        }
        case 2: {
            removeHeatmaps();
            removeRibbons();

            volume = renderVolume();
            break;
        }
        case 5: {
            removeRibbons();
            removeVolume(volume);

            renderHeatmaps();
            break;
        }
        default: {
            removeHeatmaps();
            removeVolume(volume);
            removeRibbons();
        }
    }
}

function getHighlightElements(id) {
  const elements = ControlList[id].panelElements;
  if (elements.length === 0) return [];
  if (elements.length === 1) {
    if (typeof elements[0] === 'string') {
      return elements;
    } else {
      return elements[0];
    }
  }
  return elements.reduce((arr, current) => {
    if (typeof arr === 'string') {
      arr = [arr];
    }
    if (typeof current === 'string') {
      return [].concat(...arr, [current]);
    } else {
      return arr.concat(...current);
    }
  });
}


/**
 * 高亮元素
 * @param {Array<string>} elements 
 * @param {Array<number>} color 
 */
function highlightElements(elements, color) {
    if (elements.length === 0 ) return;
    if (color) {
        viewer
            .getRenderScene()
            .getEffect('Highlight')
            .addElements(elements, {
                emissiveColor: color
            });
    } else {
        viewer
            .getRenderScene()
            .getEffect('Highlight')
            .removeElements(elements);
    }
}

/**
 * 转换视角（也可以调用 Modelo.Comment.activate(commentId)来实现视角切换效果，需要为模型设置comment）
 * @param {*} view 
 */
function gotoView(view) {
    const { at, distance, fov, phi, theta } = view;
    viewer.getCamera().core.lookTo(at, distance * Math.sin((fov * Math.PI) / 360));
    viewer.getCamera().core.rotateTo(phi, theta);
}

/**
 * 渲染ribbon效果
 */
async function renderRibbons() {
    const plattes = {
        "path0": "./svg/warm.png",
        "path1": "./svg/cold.png"
    }
    Object.keys(gasPath).map(key => {
        let ribbonGroup = null;
        const points = gasPath[key].map(point => [point[0] / 304, point[1] / 304, point[2] / 304]);

        if (ribbonGroups[key]) {
            ribbonGroup = ribbonGroups[key].group;
        } else {
            ribbonGroup = new Modelo.View.Visualize.AnimatingRibbon(viewer.getRenderScene());
            ribbonGroup.setEnabled(true);
            viewer.getScene().addVisualize(ribbonGroup);
            ribbonGroup.setParameter("width", 10);
            ribbonGroup.setParameter("unitLenght", 50);
            ribbonGroup.setParameter("speed", -0.5);
            ribbonGroup.setParameter("platteTexture", plattes[key]);
            ribbonGroups[key] = {
                group: ribbonGroup,
                ribbons: null
            };
        }
        ribbonGroups[key].ribbons = ribbonGroup.addRibbon(points);
    });
}

/**
 * 移除ribbon效果
 * @param {Visualize.AnimatingRibbon} ribbonGroup 渲染Ribbon时的AnimatingRibbon对象
 * @param {*} ribbons
 */
function removeRibbons() {
    ribbonGroups && Object.keys(ribbonGroups).length !== 0 && Object.keys(ribbonGroups).map(key => {
        ribbonGroups[key].group.removeRibbon(ribbonGroups[key].ribbons);
        ribbonGroups[key].ribbons = null;
    });
}

/**
 * 格式化heatmap所需要的数据
 */
function formatHeatmapData() {
    return Object.keys(WaterFlow).map(key => {
        return {
            [key]: {
                outerLoop: WaterFlow[key],
                innerLoop: []
            },
            max: WaterFlowMinMax[key][1],
            min: WaterFlowMinMax[key][0]
        }
    })
}

/**
 * 渲染heatmap效果
 */
function renderHeatmaps() {
    if (heatmaps.length > 0) {
        return;
    }
    heatmaps = [];
    const heatmapConfig = {
        width: 1024,
        height: 256,
        gridSizeX: 8,
        gridSizeY: 3,
        layers: 20
   }
   let randomVolumeData = new Float32Array(heatmapConfig.width * heatmapConfig.height);
   formatHeatmapData().forEach(data => {
        const modeloHeatmap = new ModeloHeatmap(viewer, heatmapConfig, data);
        heatmaps.push(modeloHeatmap.renderModeloHeatmap(randomVolumeData));
   })
}

/**
 * 移除heatmap效果
 */
function removeHeatmaps() {
    heatmaps.forEach(heatmap => {
        viewer.getScene().removeVisualize(heatmap);
    });
    heatmaps = [];
}

/**
 * 渲染Volume效果
 */
function renderVolume() {
    const textureBuffer = new Float32Array(2048 * 2048);
    textureBuffer.fill(1.0)
    const center = [(BoxData.min[0] + BoxData.max[0]) / 2, (BoxData.min[1] + BoxData.max[1]) / 2, (BoxData.min[2] + BoxData.max[2]) / 2];
    const volume = new Modelo.View.Visualize.Volume(viewer.getRenderScene());
    viewer.getScene().addVisualize(volume);
    volume.setParameter("data", { "data": textureBuffer, "width": 2048, "height": 2048} );
    volume.setParameter("platteImage", "./svg/waterTank.png");
    volume.setParameter("gradientImage", "./svg/density.png");
    volume.setScaling([BoxData['max'][0] - BoxData['min'][0], BoxData['max'][1] - BoxData['min'][1], BoxData['max'][2] - BoxData['min'][2]].map(i => i / 304));
    volume.setPosition(center.map(i => i / 304));
    volume.setEnabled(true);
    return volume;
}

/**
 * 移除volume效果
 * @param {*} volume 
 */
function removeVolume(volume) {
    volume && viewer.getScene().removeVisualize(volume);
    volume = null;
}

/**
 * 模型更新时，同步更新所需要绘制的panel的坐标点
 */
function initModeloPanels() {
    viewer.setUpdateCallback(() => {
        const lastPanels = panels;
        panels = ControlList[activeIndex].panelElements.map(item => {
            const bbox = viewer.getScene().getElementsBBox(typeof item === 'string' ? [item] : item);
            const center2D = viewer.getCamera().project([
                (bbox[0] + bbox[3]) / 2,
                (bbox[1] + bbox[4]) / 2,
                (bbox[2] + bbox[5]) / 2
            ]).map(v => v >> 0);
            const allPointsDistance = [
                [bbox[0], bbox[1], bbox[2]],
                [bbox[0], bbox[1], bbox[5]],
                [bbox[3], bbox[1], bbox[2]],
                [bbox[3], bbox[1], bbox[5]],
                [bbox[3], bbox[4], bbox[5]],
                [bbox[3], bbox[4], bbox[2]],
                [bbox[0], bbox[4], bbox[5]],
                [bbox[0], bbox[4], bbox[2]]
            ].map(p => {
                const point2D = viewer.getCamera().project(p);
                const dx = Math.abs(point2D[0] - center2D[0]);
                const dy = Math.abs(point2D[1] - center2D[1]);
                const distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
                return distance >> 0;
            });
            return {
                radius: Math.max(...allPointsDistance),
                center: center2D
            }
        });
        // panel 位置没有更新不需要重新渲染dom
        if (JSON.stringify(lastPanels) === JSON.stringify(panels)) return;

        formatPanelData();
        renderPanels();
    });
}

/**
 * 通过坐标点，动态调整panel位置、大小等属性
 */
function formatPanelData() {
    modeloPanelList = [];
    if (ControlList[activeIndex].noCircle) {
        modeloPanelList = [
            {
                circleConfig: {
                    lineLength: 50,
                    noCircle: ControlList[activeIndex].noCircle
                },
                lineDirection: 'left',
                panelContent: ControlList[activeIndex].panelData[0]
                    ? ControlList[activeIndex].panelData[0].panelContent
                    : null
            }
        ];
    }
    panels.forEach((panel, index) => {
        const lineDirection = ControlList[activeIndex].panelData[index]
            ? ControlList[activeIndex].panelData[index].lineDirection
            : 'top';
        const panelContent = ControlList[activeIndex].panelData[index]
            ? ControlList[activeIndex].panelData[index].panelContent
            : null;
        modeloPanelList.push({
            circleConfig: {
                lineLength: 50,
                radius: Math.min(panels.length > 0 && activeIndex !== 4 ? panel.radius : 50, 80),
                centerPoint: panels.length > 0 ? panel.center : [300, 600],
                noCircle: ControlList[activeIndex].noCircle
            },
            lineDirection: lineDirection,
            panelContent: panelContent
        });
    });
}

/**
 * 渲染panel和相关的元素
 */
function renderPanels() {
    const container = document.getElementById('ElementsPanel');
    const divContent = modeloPanelList.map(item => {
        if (!item.panelContent) {
            return '<div></div>'
        }

        let styles = {
            width: item.panelContent.width ? item.panelContent.width : 100,
            height: item.panelContent.height ? item.panelContent.height : 150
        };

        if (item.circleConfig.noCircle) {
            styles['left'] = 100;
            styles['top'] = 300;
        } else {
            switch (item.lineDirection) {
                case 'top': {
                    styles['left'] =
                        item.circleConfig.centerPoint[0] -
                        (item.panelContent.width ? item.panelContent.width / 2 : 75);
                    styles['top'] =
                        item.circleConfig.centerPoint[1] -
                        item.circleConfig.radius -
                        item.circleConfig.lineLength -
                        (item.panelContent.height ? item.panelContent.height : 150);
                    break;
                }
                case 'left': {
                    styles['left'] =
                        item.circleConfig.centerPoint[0] -
                        item.circleConfig.radius -
                        item.circleConfig.lineLength -
                        (item.panelContent.width ? item.panelContent.width : 150);
                    styles['top'] =
                        item.circleConfig.centerPoint[1] -
                        (item.panelContent.height ? item.panelContent.height / 2 : 150);
                    break;
                }
            }
        }

        let htmlContent = '';
        if (item.panelContent.type === 'table') {
            const headerHTML = item.panelContent.data.headers.map(header => {
                return `<span>${header.label}</span>`
            }).join('');

            const contentHTML = item.panelContent.data.dataList.map(data => {
                const dataHTML = item.panelContent.data.headers.map(header => {
                    let html;
                    if (header.colType === PanelDataColType.Text) {
                        html = `<span>${data[header.key]}</span>`
                    } else if (header.colType === PanelDataColType.Icon) {
                        html = `<img src="${data[header.key]}"></img>`
                    } else if (header.colType === PanelDataColType.Form) {
                        html = (
                            `<span class="form-label">${data[header.key].label}</span><span class="form-value">${data[header.key].value}</span>`
                        );
                    } else if (header.colType === PanelDataColType.Direction) {
                        html = `<div class="${data[header.key]}"></div>`
                    }
                    return html;
                }).join('')
                return `<div class="Panel__tableContentRow">${dataHTML}</div>`
            }).join('')

            htmlContent = `
                <div class="Panel__table" style="display: grid">
                <div class="Panel__tableHeader">${headerHTML}</div>
                <div class="Panel__tableContent">${contentHTML}</div>
                </div>`
        } else if (item.panelContent.type === 'text') {
            htmlContent = `<div class="Panel__text"></div>`
        } else if (item.panelContent.type === 'image') {
            htmlContent = `<div class="Panel__image"></div>`
        } else {
            htmlContent = `<div></div>`
        }
        return `<div class="ElementsPanel__contentPanel" style="${formatStyles(styles)}">${htmlContent}</div>`;
    });

    const svgContent = modeloPanelList.map(item => {
        if (item.circleConfig.noCircle) {
            return '';
        }

        let lineConfig = {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 0
        };

        switch (item.lineDirection) {
            case 'top': {
                lineConfig = {
                    x1: item.circleConfig.centerPoint[0],
                    y1: item.circleConfig.centerPoint[1] - item.circleConfig.radius,
                    x2: item.circleConfig.centerPoint[0],
                    y2:
                        item.circleConfig.centerPoint[1] -
                        item.circleConfig.radius -
                        item.circleConfig.lineLength
                };
                break;
            }

            case 'left': {
                lineConfig = {
                    x1: item.circleConfig.centerPoint[0] - item.circleConfig.radius,
                    y1: item.circleConfig.centerPoint[1],
                    x2:
                        item.circleConfig.centerPoint[0] -
                        item.circleConfig.radius -
                        item.circleConfig.lineLength,
                    y2: item.circleConfig.centerPoint[1]
                };
                break;
            }
        }

        const dash = (2 * Math.PI * Math.abs(item.circleConfig.radius - 5)) / 10;

        return `
            <g key={index}>
              <circle
                cx=${item.circleConfig.centerPoint[0]}
                cy=${item.circleConfig.centerPoint[1]}
                r=${5}
                fill="#a9d738"
                stroke="#a9d738"
                strokeWidth="2"
              />
              <line stroke="#a9d738" strokeWidth="2" x1="${item.circleConfig.centerPoint[0]}" x2="${lineConfig.x2}" y1="${item.circleConfig.centerPoint[1]}" y2="${lineConfig.y2}" />
            </g>`
    })
    container.innerHTML = `
        <div id="ElementsPanel__content">${divContent.join('')}</div>
        <svg id="ElementsPanel__svg" pointer-events="none" width="100%" height="100%">${svgContent.join('')}</svg>
    `;
}

/**
 * 样式转化
 * @param {object} styles 
 */
function formatStyles(styles) {
    let str = ''
    Object.keys(styles).forEach(key => str+=`${key}: ${styles[key]}px;`);
    return str;
}