const modelId = "q1xqW2YJ";
const appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUzLCJ1c2VybmFtZSI6Ik1vZGVsbyIsImlzUGVybWFuZW50Ijp0cnVlLCJpYXQiOjE1Njc1NjI0MTksImV4cCI6MzMxMDM1NjI0MTl9.EbW_cSPca4kWLedgNtfrGguog_o-3CCM5WhM7fFi0GA"

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });
const viewer = new Modelo.View.Viewer3D("model");
viewer.addInput(new Modelo.View.Input.Mouse(viewer)); // Add mouse to control camera.
viewer.addInput(new Modelo.View.Input.Touch(viewer));

// viewer.loadModel(modelId, progress => {
//     updateProgress(progress);
// }).then(() => {
//     setDarkTheme(viewer);
//     // initController();
//     // initModeloPanels();
// });


// let activeIndex = 0;
// let modeloPanelList = [];
// let panels = [];
// // 渲染顶部控制按钮
// function initController() {
//     const container = document.getElementById('controller');
//     container.innerHTML = ControlList.map((control, index) => {
//         return `
//             <div class="MonitorController__item ${index !== 0 ? '' : 'MonitorController__item--active'}" data-index="${index}">
//                 <div class="MonitorController__itemTitle">${control.title}</div>
//                 <img src="${control.icon}" alt="" class="MonitorController__itemImage" />
//             </div>
//         `
//     });

//     $('.MonitorController__item').on('click', function () {
//         activeIndex = $(this).attr('data-index');
//         $(this).addClass('MonitorController__item--active').siblings().removeClass('MonitorController__item--active');
//     });
// }

// function highlightElements(elements, color) {
//     if (color) {
//         viewer
//             .getRenderScene()
//             .getEffect('Highlight')
//             .addElements(elements, {
//                 emissiveColor: color
//             });
//     } else {
//         viewer
//             .getRenderScene()
//             .getEffect('Highlight')
//             .removeElements(elements);
//     }
// }

// function initModeloPanels() {
//     viewer.setUpdateCallback(() => {
//         panels = ControlList[activeIndex].panelElements.map(item => {
//             const bbox = viewer.getScene().getElementsBBox(typeof item === 'string' ? [item] : item);
//             const center2D = viewer.getCamera().project([
//                 (bbox[0] + bbox[3]) / 2,
//                 (bbox[1] + bbox[4]) / 2,
//                 (bbox[2] + bbox[5]) / 2
//             ]);
//             const allPointsDistance = [
//                 [bbox[0], bbox[1], bbox[2]],
//                 [bbox[0], bbox[1], bbox[5]],
//                 [bbox[3], bbox[1], bbox[2]],
//                 [bbox[3], bbox[1], bbox[5]],
//                 [bbox[3], bbox[4], bbox[5]],
//                 [bbox[3], bbox[4], bbox[2]],
//                 [bbox[0], bbox[4], bbox[5]],
//                 [bbox[0], bbox[4], bbox[2]]
//             ].map(p => {
//                 const point2D = viewer.getCamera().project(p);
//                 const dx = Math.abs(point2D[0] - center2D[0]);
//                 const dy = Math.abs(point2D[1] - center2D[1]);
//                 const distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
//                 return distance;
//             });
//             return {
//                 radius: Math.max(...allPointsDistance),
//                 center: center2D
//             }
//         });

//         formatPanelData();
//         renderPanels();
//     });
// }

// function formatPanelData() {
//     if (ControlList[activeIndex].noCircle) {
//         modeloPanelList = [
//             {
//                 circleConfig: {
//                     lineLength: 50,
//                     noCircle: ControlList[activeIndex].noCircle
//                 },
//                 lineDirection: 'left',
//                 panelContent: ControlList[activeIndex].panelData[0]
//                     ? ControlList[activeIndex].panelData[0].panelContent
//                     : null
//             }
//         ];
//     }
//     panels.forEach((panel, index) => {
//         const lineDirection = ControlList[activeIndex].panelData[index]
//             ? ControlList[activeIndex].panelData[index].lineDirection
//             : 'top';
//         const panelContent = ControlList[activeIndex].panelData[index]
//             ? ControlList[activeIndex].panelData[index].panelContent
//             : null;
//         modeloPanelList.push({
//             circleConfig: {
//                 lineLength: 50,
//                 radius: panels.length > 0 && activeIndex !== 4 ? panel.radius : 50,
//                 centerPoint: panels.length > 0 ? panel.center : [300, 600],
//                 noCircle: ControlList[activeIndex].noCircle
//             },
//             lineDirection: lineDirection,
//             panelContent: panelContent
//         });
//     });
// }

// function renderPanels() {
//     const container = $('#ElementsPanel');
//     const divContent = modeloPanelList.map(item => {
//         if (!item.panelContent) {
//             return '<div></div>';
//         }

//         let styles = {
//             width: item.panelContent.width ? item.panelContent.width : 100,
//             height: item.panelContent.height ? item.panelContent.height : 150
//         };

//         if (item.circleConfig.noCircle) {
//             styles['left'] = 100;
//             styles['top'] = 300;
//         } else {
//             switch (item.lineDirection) {
//                 case 'top': {
//                     styles['left'] =
//                         item.circleConfig.centerPoint[0] -
//                         (item.panelContent.width ? item.panelContent.width / 2 : 75);
//                     styles['top'] =
//                         item.circleConfig.centerPoint[1] -
//                         item.circleConfig.radius -
//                         item.circleConfig.lineLength -
//                         (item.panelContent.height ? item.panelContent.height : 150);
//                     break;
//                 }
//                 case 'left': {
//                     styles['left'] =
//                         item.circleConfig.centerPoint[0] -
//                         item.circleConfig.radius -
//                         item.circleConfig.lineLength -
//                         (item.panelContent.width ? item.panelContent.width : 150);
//                     styles['top'] =
//                         item.circleConfig.centerPoint[1] -
//                         (item.panelContent.height ? item.panelContent.height / 2 : 150);
//                     break;
//                 }
//             }
//         }

//         let htmlContent;
//         if (item.panelContent.type === 'table') {

//             const styles = {
//                 display: 'grid'
//             };

//             const headerHTML = item.panelContent.data.headers.map(header => {
//                 return `<span>${header.label}</span>`;
//             });

//             const contentHTML = item.panelContent.data.dataList.map(data => {
//                 const dataHTML = item.panelContent.data.headers.map(header => {
//                     let html;
//                     if (header.colType === PanelDataColType.Text) {
//                         html = `<span>${data[header.key]}</span>`;
//                     } else if (header.colType === PanelDataColType.Icon) {
//                         html = `<img src="${data[header.key]}"></img>`;
//                     } else if (header.colType === PanelDataColType.Form) {
//                         html = (
//                             `<span class="form-label">${data[header.key].label}</span>
//                             <span class="form-value">${data[header.key].value}</span>`
//                         );
//                     } else if (header.colType === PanelDataColType.Direction) {
//                         html = `<div class="${data[header.key]}" />`;
//                     }
//                     return html;
//                 })
//                 return `<div class="Panel__tableContentRow">${dataHTML}</div>`;
//             })

//             htmlContent = `
//                 <div class="Panel__table" style=${styles}>
//                 <div class="Panel__tableHeader">${headerHTML}</div>
//                 <div class="Panel__tableContent">${contentHTML}</div>
//                 </div>
//             )`;
//         } else if (item.panelContent.type === 'text') {
//             htmlContent = `<div class="Panel__text"></div>`;
//         } else if (item.panelContent.type === 'image') {
//             htmlContent = `<div class="Panel__image"></div>`;
//         } else {
//             htmlContent = `<div></div>`;
//         }
//         return `<div class="ElementsPanel__contentPanel" style=${styles}>${htmlContent}</div>`;
//     });

//     const svgContent = modeloPanelList.map(item => {
//         if (item.circleConfig.noCircle) {
//             return '';
//         }

//         let lineConfig = {
//             x1: 0,
//             y1: 0,
//             x2: 0,
//             y2: 0
//         };

//         switch (item.lineDirection) {
//             case 'top': {
//                 lineConfig = {
//                     x1: item.circleConfig.centerPoint[0],
//                     y1: item.circleConfig.centerPoint[1] - item.circleConfig.radius,
//                     x2: item.circleConfig.centerPoint[0],
//                     y2:
//                         item.circleConfig.centerPoint[1] -
//                         item.circleConfig.radius -
//                         item.circleConfig.lineLength
//                 };
//                 break;
//             }

//             case 'left': {
//                 lineConfig = {
//                     x1: item.circleConfig.centerPoint[0] - item.circleConfig.radius,
//                     y1: item.circleConfig.centerPoint[1],
//                     x2:
//                         item.circleConfig.centerPoint[0] -
//                         item.circleConfig.radius -
//                         item.circleConfig.lineLength,
//                     y2: item.circleConfig.centerPoint[1]
//                 };
//                 break;
//             }
//         }

//         const dash = (2 * Math.PI * Math.abs(item.circleConfig.radius - 5)) / 10;

//         return `
//             <g key={index}>
//               <circle
//                 cx=${item.circleConfig.centerPoint[0]}
//                 cy=${item.circleConfig.centerPoint[1]}
//                 r=${Math.abs(item.circleConfig.radius - 5)}
//                 strokeDasharray={${dash}, ${10}}
//                 fill="none"
//                 stroke="#E6B644"
//                 strokeWidth="1"
//               >
//                 <animateTransform
//                   attributeName="transform"
//                   attributeType="XML"
//                   begin="0s"
//                   dur="5s"
//                   type="rotate"
//                   from={0 ${item.circleConfig.centerPoint[0]} ${
//             item.circleConfig.centerPoint[1]
//             }}
//                   to={360 ${item.circleConfig.centerPoint[0]} ${
//             item.circleConfig.centerPoint[1]
//             }}
//                   repeatCount="indefinite"
//                 />
//               </circle>

//               <circle
//                 cx=${item.circleConfig.centerPoint[0]}
//                 cy=${item.circleConfig.centerPoint[1]}
//                 r=${item.circleConfig.radius}
//                 fill="none"
//                 stroke="#E6B644"
//                 strokeWidth="2"
//               />
//               <line stroke="#E6B644" strokeWidth="2" ${lineConfig} />
//             </g>`
//     })
//     container.innerHTML = `
//         <div id="ElementsPanel__content">${divContent}</div>
//         <svg id="ElementsPanel__svg" pointer-events="none" width="100%" height="100%">${svgContent}</svg>
//     `;
// }