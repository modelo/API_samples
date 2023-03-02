let modelId = "NrMB9MG1";
let appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzMxLCJ1c2VybmFtZSI6ImxtIiwiaXNQZXJtYW5lbnQiOnRydWUsImlhdCI6MTYzNDYxMjQ2NSwiZXhwIjozMzE3MDYxMjQ2NX0.Q8IHwhg90aatmTeZChUthyhyt4KVAgKgf7LFMTgL0Ao"
Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

let viewer = new Modelo.View.Viewer3D("model", { isMobile: isMobile(), useWebGL2: true });
viewer.setShadowEnabled(true);
viewer.setEffectEnabled("SSAO", true);
var categoriesSelector = document.getElementById('Categories');

viewer.loadModel(modelId
    , progress => {
        let c = document.getElementById("progress"); c.innerHTML = "Loading: " + Math.round(progress * 100) + "%";
    }
).then(() => {
    viewer.addInput(new Modelo.View.Input.Mouse(viewer));
    viewer.addInput(new Modelo.View.Input.Keyboard(viewer));
    viewer.addInput(new Modelo.View.Input.Touch(viewer));

    pipeMap = extractPipeData();

    let types = Array.from(pipeMap.keys());
    types.forEach((type, index) => {
        categoriesSelector.add(new Option(type, index));
    });

    document.getElementById("growAnimation").onclick = function () {
        allPipes.map(pipe => pipe.stop());

        let type = categoriesSelector.options[categoriesSelector.selectedIndex].text;
        let pipes = pipeMap.get(type);
        pipes.map(pipe => pipe.grow());//触发管线生长的方法
    };
        
    document.getElementById("flowAnimation").onclick = function () {
            
        allPipes.map(pipe => pipe.stop());

        let type = categoriesSelector.options[categoriesSelector.selectedIndex].text;
        let pipes = pipeMap.get(type);
        pipes.map(pipe => pipe.flow());//触发管线流体动画的方法
    };

    document.getElementById("stop").onclick = function () {
        viewer.showLayers(modelId, [4, 5]);
        viewer.showLayers(modelId, [7, 8]);
        allPipes.map(pipe => pipe.stop());//触发管线停止动画播放的方法
    };
});

let pipeMap;
let allPipes = [];
let rm = viewer.getRenderScene().getResourceManager();
let Pipe = Modelo.View.Visualize.Pipe;
let PipeCircleProfile = Modelo.View.Visualize.PipeCircleProfile;
let PipeRectProfile = Modelo.View.Visualize.PipeRectProfile;
/**
 * 流体管线对象定义，也可以根据自己的业务需求定义，这里定义三个对象
 * pathList：规定管线的路径，一个路径上可能有多个管线（pipe），满足一个管线生长完再生长下一个的需求
 * pipeList: 规定管线的属性，如生长速度，流动速度
 * edgeList：管线的具体几何数据，如关键节点，截面的几何属性
 */
let pipeData = {
    "pathList": [
        {
            "id": "path-0",//路径类型
            "firstPipe": "pipe-0",//起始的管线
            "allPipeList": [//管线集合
                "pipe-0"
            ],
            "type": "给水" //路径类型
        },
        {
            "id": "path-1",
            "firstPipe": "pipe-1",
            "allPipeList": [
                "pipe-1"
            ],
            "type": "水空调"
        },
        {
            "id": "path-2",
            "firstPipe": "pipe-2",
            "allPipeList": [
                "pipe-2"
            ],
            "type": "水空调"
        },
        {
            "id": "path-3",
            "firstPipe": "pipe-3",
            "allPipeList": [
                "pipe-3"
            ],
            "type": "水空调"
        },
        {
            "id": "path-4",
            "firstPipe": "pipe-4",
            "allPipeList": [
                "pipe-4"
            ],
            "type": "水空调"
        },
        {
            "id": "path-5",
            "firstPipe": "pipe-5",
            "allPipeList": [
                "pipe-5"
            ],
            "type": "水空调"
        },
        {
            "id": "path-6",
            "firstPipe": "pipe-6",
            "allPipeList": [
                "pipe-6"
            ],
            "type": "水空调"
        },
        {
            "id": "path-7",
            "firstPipe": "pipe-7",
            "allPipeList": [
                "pipe-7"
            ],
            "type": "水空调"
        },
        {
            "id": "path-8",
            "firstPipe": "pipe-8",
            "allPipeList": [
                "pipe-8",
                "pipe-9"
            ],
            "type": "水空调"
        }
    ],
    "pipeList": [
        {
            "id": "pipe-0",//管道id
            "edge": "edge-0",//管道几何属性的id
            "growSpeed": 2,//生长速度
            "flowSpeed": 1.5,//流动速度
            "nextPipes": []//当前管道生长完后生长的下一个管道
        },
        {
            "id": "pipe-1",
            "edge": "edge-1",
            "growSpeed": 2,
            "flowSpeed": 1.5,
            "nextPipes": []
        },
        {
            "id": "pipe-2",
            "edge": "edge-2",
            "growSpeed": 2,
            "flowSpeed": 1.5,
            "nextPipes": []
        },
        {
            "id": "pipe-3",
            "edge": "edge-3",
            "growSpeed": 2,
            "flowSpeed": 1.5,
            "nextPipes": []
        },
        {
            "id": "pipe-4",
            "edge": "edge-4",
            "growSpeed": 2,
            "flowSpeed": 1.5,
            "nextPipes": []
        },
        {
            "id": "pipe-5",
            "edge": "edge-5",
            "growSpeed": 2,
            "flowSpeed": 1.5,
            "nextPipes": []
        },
        {
            "id": "pipe-6",
            "edge": "edge-6",
            "growSpeed": 2,
            "flowSpeed": 1.5,
            "nextPipes": []
        },
        {
            "id": "pipe-7",
            "edge": "edge-7",
            "growSpeed": 2,
            "flowSpeed": 1.5,
            "nextPipes": []
        },
        {
            "id": "pipe-8",
            "edge": "edge-8",
            "growSpeed": 2,
            "flowSpeed": 1.5,
            "nextPipes": ["pipe-9"]
        },
        {
            "id": "pipe-9",
            "edge": "edge-9",
            "growSpeed": 2,
            "flowSpeed": 1.5,
            "nextPipes": []
        }
    ],
    "edgeList":[
        {
            "id": "edge-0",//管道几何id
            "keyPoint": [//管道的关键位置节点
                [2.376490234375, 3.638883308046875, 2.521365478515625],
                [2.376490234375, 3.626, 2.521365478515625],
                [2.376490234375, 3.626, 2.65],
                [2.376490234375, 3.586, 2.65],
                [-2.219656982421875, 3.586, 2.65],
                [-2.219656982421875, 3.626, 2.65],
                [-2.219656982421875, 3.626, 1.306],
                [-2.219656982421875, 3.6391535822656254, 1.306]
            ],
            "color": [0, 90, 93, 1],//管道的颜色
            "texture": {
                "textureImage": "8D904D8DC1B5D23770C1EEA382581440.png",//贴图
                "textureScale": [1, 1, 0]//贴图的缩放
            },
            "bendRadius": 0.008333333333333335,//管道弯曲半径
            "profile2d": {//管道截面的信息
                "tp": "circle",//截面类型，圆形：circle；方形：rect
                "radius": 0.0125,//圆形半径，如果是方的就定义width和height
                "slices": 10//圆形的切片数量
            }
        },
        {
            "id": "edge-1",
            "keyPoint": [
                [-3.3581065063476565, -4.343846855163575, 0.4976840019226074],
                [-3.45917350769043, -4.343846855163575, 0.4976840019226074],
                [-3.45917350769043, -4.343846855163575, 2.734240001678467],
                [-3.45917350769043, -2.8853445281982424, 2.734240001678467],
                [0.40700000000000003, -2.8853445281982424, 2.734240001678467]
            ],
            "color": [245, 0, 87, 1],
            "texture": {
                "textureImage": "F07D8BC481B22159757E7324B9DE97B7.png",
                "textureScale": [1, 1, 0]
            },
            "bendRadius": 0.008333333333333335,
            "profile2d": {
                "tp": "circle",
                "radius": 0.0125,
                "slices": 10
            }
        },
        {
            "id": "edge-2",
            "keyPoint": [
                [0.6803599853515625, -3.08689453125, 2.688350000023842],
                [0.6803599853515625, -3.6390000000000002, 2.688350000023842],
                [0.07200000000000001, -3.6390000000000002, 2.688350000023842],
                [0.07200000000000001, -0.7333099975585937, 2.688350000023842],
                [0.386, -0.7333099975585937, 2.688350000023842],
                [0.386, -0.7333099975585937, 2.6867900009155274],
                [0.534, -0.7333099975585937, 2.6867900009155274]
            ],
            "color": [245, 0, 87, 1],
            "texture": {
                "textureImage": "F07D8BC481B22159757E7324B9DE97B7.png",
                "textureScale": [1, 1, 0]
            },
            "bendRadius": 0.008333333333333335,
            "profile2d": {
                "tp": "circle",
                "radius": 0.0125,
                "slices": 10
            }
        },
        {
            "id": "edge-3",
            "keyPoint": [
                [0.447, -2.992234531402588, 2.645279998779297],
                [-3.402604965195506, -2.992234531402588, 2.645279998779297],
                [-3.402604965195506, -4.287278312668651, 2.645279998779297],
                [2.097395034804494, -4.287278312668651, 2.645279998779297],
                [2.097395034804494, -0.7380111694335938, 2.645279998779297],
                [6.697224804878235, -0.7380111694335938, 2.645279998779297],
                [6.697224804878235, -0.7380111694335938, 0.6918525085449219],
                [6.697224804878235, -0.8354761657714844, 0.6918525085449219]
            ],
            "color": [0, 176, 255, 1],
            "texture": {
                "textureImage": "9F06C58FA235435D756C6D50EABA92DD.png",
                "textureScale": [1, 1, 0]
            },
            "bendRadius": 0.008333333333333335,
            "profile2d": {
                "tp": "circle",
                "radius": 0.0125,
                "slices": 10
            }
        },
        {
            "id": "edge-4",
            "keyPoint": [
                [0.534, -0.7331200027465821, 2.6436800003051757],
                [0.386, -0.7331200027465821, 2.6436800003051757],
                [0.386, -0.7331200027465821, 2.644459999084473],
                [0.07200000000000001, -0.7331200027465821, 2.644459999084473],
                [0.07200000000000001, -3.6390000000000002, 2.644459999084473],
                [0.6144299926757812, -3.6390000000000002, 2.644459999084473],
                [0.6144299926757812, -3.08689453125, 2.644459999084473]
            ],
            "color": [0, 176, 255, 1],
            "texture": {
                "textureImage": "9F06C58FA235435D756C6D50EABA92DD.png",
                "textureScale": [1, 1, 0]
            },
            "bendRadius": 0.008333333333333335,
            "profile2d": {
                "tp": "circle",
                "radius": 0.0125,
                "slices": 10
            }
        },
        {
            "id": "edge-5",
            "keyPoint": [
                [6.697834804534912, -0.8424761657714844, 0.8049924926757812],
                [6.697834804534912, -0.7680111694335938, 0.8049924926757812],
                [-3.583, -0.7680111694335938, 0.8049924926757812],
                [-3.583, -2.80535546875, 0.8049924926757812],
                [-4.083, -2.80535546875, 0.8049924926757812],
                [-4.083, -2.80535546875, 0.2516200008392334],
                [-4.083, -2.5799054718017578, 0.2516200008392334]
            ],
            "color": [245, 0, 87, 1],
            "texture": {
                "textureImage": "F07D8BC481B22159757E7324B9DE97B7.png",
                "textureScale": [1, 1, 0]
            },
            "bendRadius": 0.008333333333333335,
            "profile2d": {
                "tp": "circle",
                "radius": 0.0125,
                "slices": 10
            }
        },
        {
            "id": "edge-6",
            "keyPoint": [
                [-4.083, -2.61435546875, 0.11833000183105469],
                [-4.083, -4.639, 0.11833000183105469],
                [-2.8711795196533205, -4.639, 0.11833000183105469],
                [-2.8711795196533205, -4.32252685546875, 0.11833000183105469],
                [-2.8711795196533205, -4.32252685546875, 0.5005740013122558],
                [-2.971176513671875, -4.32252685546875, 0.5005740013122558]
            ],
            "color": [245, 0, 87, 1],
            "texture": {
                "textureImage": "F07D8BC481B22159757E7324B9DE97B7.png",
                "textureScale": [1, 1, 0]
            },
            "bendRadius": 0.008333333333333335,
            "profile2d": {
                "tp": "circle",
                "radius": 0.0125,
                "slices": 10
            }
        },
        {
            "id": "edge-7",
            "keyPoint": [
                [0.522, -3.0944445343017577, 2.5984400024414063],
                [0.292, -3.0944445343017577, 2.5984400024414063],
                [0.292, -3.0944445343017577, 2.5523799972534182],
                [0.242, -3.0944445343017577, 2.5523799972534182],
                [0.242, -2.992234531402588, 2.5523799972534182],
                [0.07200000000000001, -2.992234531402588, 2.5523799972534182]
            ],
            "color": [33, 33, 33, 1],
            "texture": {
                "textureImage": "5A2C4CDB641AC23F4D81EBED841944B8.png",
                "textureScale": [1, 1, 0]
            },
            "bendRadius": 0.008333333333333335,
            "profile2d": {
                "tp": "circle",
                "radius": 0.0125,
                "slices": 10
            }
        },
        {
            "id": "edge-8",
            "keyPoint": [
                [0.526, -0.7335999984741212, 2.5523799972534182],
                [0.386, -0.7335999984741212, 2.5523799972534182],
                [0.386, -0.7331200027465821, 2.5523799972534182],
                [0.07200000000000001, -0.7331200027465821, 2.5523799972534182],
                [0.07200000000000001, -2.992234531402588, 2.5523799972534182]
            ],
            "color": [33, 33, 33, 1],
            "texture": {
                "textureImage": "5A2C4CDB641AC23F4D81EBED841944B8.png",
                "textureScale": [1, 1, 0]
            },
            "bendRadius": 0.008333333333333335,
            "profile2d": {
                "tp": "circle",
                "radius": 0.0125,
                "slices": 10
            }
        },
        {
            "id": "edge-9",
            "keyPoint": [
                [0.07200000000000001, -2.992234531402588, 2.5523799972534182],
                [-3.402604965195506, -2.992234531402588, 2.5523799972534182],
                [-3.402604965195506, -4.287278312668651, 2.5523799972534182],
                [2.097395034804494, -4.287278312668651, 2.5523799972534182],
                [2.097395034804494, -0.6380111694335938, 2.5523799972534182],
                [6.697334804534912, -0.6380111694335938, 2.5523799972534182],
                [6.697334804534912, -0.6380111694335938, 0.5928625030517578],
                [6.697334804534912, -0.8354761657714844, 0.5928625030517578]
            ],
            "color": [33, 33, 33, 1],
            "texture": {
                "textureImage": "5A2C4CDB641AC23F4D81EBED841944B8.png",
                "textureScale": [1, 1, 0]
            },
            "bendRadius": 0.008333333333333335,
            "profile2d": {
                "tp": "circle",
                "radius": 0.0125,
                "slices": 10
            }
        }
    ]
}

// 创建管道动画特效
let animatingPipe = new Modelo.View.Visualize.AnimatingPipe(viewer.getRenderScene());

function createPipe(pipeInfo, edgeInfo) {
    const profileType = edgeInfo.profile2d.tp;
    const keyPoints = edgeInfo.keyPoint;
    const center = [...keyPoints[0]];
    let normal = [...keyPoints[1]];
    normal.forEach((_, i) => normal[i] -= center[i]);
    let profile;
    if (profileType == "circle") {
        const radius = edgeInfo.profile2d.radius;
        const slices = edgeInfo.profile2d.slices;
        profile = new PipeCircleProfile(center, normal, radius, slices);//圆形截面的类，需要的参数：圆心，法线，半径，切面数量
    } else if (profileType == "rect") {
        const width = edgeInfo.profile2d.radius;
        const height = edgeInfo.profile2d.radius;
        profile = new PipeRectProfile(center, normal, width, height);//方形截面的类，需要的参数：圆心，法线，宽，高
    }

    const bendRadius = edgeInfo.bendRadius;
    const growSpeed = pipeInfo.growSpeed;
    const flowSpeed = pipeInfo.flowSpeed;
    const pipeColor = edgeInfo.color;
    const image = edgeInfo.texture.textureImage;
    const scale = edgeInfo.texture.textureScale;
    let pipe = new Pipe(rm);//定义一个管道对象
    pipe.setProfile(profile);//设置管道的截面
    pipe.setBendRadius(bendRadius);//设置管道弯头的拐弯半径
    pipe.setGrowSpeed(growSpeed);//设置管道的生长速度
    pipe.setFlowSpeed(flowSpeed);//设置管道的流速
    pipe.setColor(pipeColor);//设置管道的颜色，生长时候使用
    pipe.setTexture(image);//设置管道的流体贴图，播放流体动画的时候使用
    pipe.setTextureScale(scale);//设置流体贴图的缩放
    pipe.setKeyPoints(keyPoints);//设置管道的关键节点
    return pipe;
}

function extractPipeData() {
    const pathList = pipeData.pathList;
    let pipeMap = new Map();
    pathList.forEach(path => {
        let pathType = path.type;
        if (!pipeMap.has(pathType)) {
            pipeMap.set(pathType, []);
        }
        let pipeList = pipeMap.get(pathType);
        let firstPipeId = path.firstPipe;

        let firstPipeInfo = pipeData.pipeList.find((p) => p.id == firstPipeId);
        let edgeId = firstPipeInfo.edge;
        let edgeInfo = pipeData.edgeList.find((e) => e.id == edgeId);
        let pipe = createPipe(firstPipeInfo, edgeInfo);
        extratcNextPipe(pipe, firstPipeInfo, edgeInfo);
        animatingPipe.addPipe(pipe);// 只有将pipe放入animatingPipe才能实现动画播放
        pipeList.push(pipe);
        allPipes.push(pipe);
    });
    return pipeMap;
}

function extratcNextPipe(parentPipe, pipeInfo) {

    pipeInfo.nextPipes.forEach(pipeId => {
        let childPipeInfo = pipeData.pipeList.find((p) => p.id == pipeId);
        let edgeId = childPipeInfo.edge;
        let childEdgeInfo = pipeData.edgeList.find((e) => e.id == edgeId);
        let childPipe = createPipe(childPipeInfo, childEdgeInfo);
        parentPipe.onFlowingOver(() => childPipe.flow());//定义当前管道流体动画播放完之后的事件，这里定义的是让下面的管道继续播放
        parentPipe.onGrowingOver(() => childPipe.grow());//定义当前管道生长完之后的事件，这里定义的是让下面的管道继续生长
        animatingPipe.addPipe(childPipe);        
        allPipes.push(childPipe);
        
        extratcNextPipe(childPipe, childPipeInfo);
    })
}

let scene = viewer.getScene();
scene.addVisualize(animatingPipe);

