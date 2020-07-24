let lastElement = '';
const modelId = "3rjZVNr4";
const appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUzLCJ1c2VybmFtZSI6Ik1vZGVsbyIsImlzUGVybWFuZW50Ijp0cnVlLCJpYXQiOjE1Njc1NjI0MTksImV4cCI6MzMxMDM1NjI0MTl9.EbW_cSPca4kWLedgNtfrGguog_o-3CCM5WhM7fFi0GA"

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

function updateProgress(progress) {
    var c = document.getElementById("progress");
    c.innerHTML = "Loading: " + Math.round(progress * 100) + "%";
}

const viewer = new Modelo.View.Viewer3D("model", {   isMobile: isMobile() });
viewer.addInput(new Modelo.View.Input.Mouse(viewer)); // Add mouse to control camera.
viewer.addInput(new Modelo.View.Input.Touch(viewer));

var section = new Modelo.View.Tool.Section(viewer);
viewer.addTool(section);

var selectElementTool = new Modelo.View.Tool.SelectElements(viewer);
viewer.addTool(selectElementTool);
selectElementTool.setEnabled(true);

viewer.loadModel(modelId, updateProgress).then(() => {
    setDarkTheme(viewer);
    chartSetting();
})

const colors = [
    {
        color: 'default',
        value: null
    },
    {
        color: 'red',
        value: [1, 0, 0]
    },
    {
        color: 'green',
        value: [0, 1, 0]
    },
    {
        color: 'blue',
        value: [0, 0, 1]
    }
];



function chartSetting() {
    const myChart = echarts.init(document.getElementById('main'));
    
    option = {
        title: {
            text: '',
            left: 'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            bottom: 0,
            left: 'center',
            data: ['type1', 'type2','type3', 'type4']
        },
        series : [
            {
                type: 'pie',
                radius : '65%',
                center: ['50%', '50%'],
                selectedMode: 'single',
                data:[
                    {value:elements.椅子.length, name: '椅子'},
                    {value:elements.人.length, name: '人'},
                    {value:elements.风车.length, name: '风车'},
                    {value:elements.消除.length, name: '消除'},
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    myChart.setOption(option);
    myChart.on('click',  (params) => {
        if (lastElement !== '') {
            viewer.getScene().setElementsColor(elements[lastElement], null);
        }
        lastElement = params.name;
        
        //在相关饼图被点击时启用某个已被定义好的comments
        if(params.name == "椅子"){
            CameraPickandHighlight(0,elements[lastElement],params);
        }
        else if(params.name == "人"){
            CameraPickandHighlight(1,elements[lastElement],params);
        }
        else if(params.name == "风车"){
            CameraPickandHighlight(2,elements[lastElement],params);
        }
        else{
            //关闭浮窗
            document.getElementById("panelLabel").style.visibility = 'hidden';
            selectElementTool.pick([], false);
        }

    });
}


function CameraPickandHighlight(index,elementID,Parameter){

    //转动照相机
    Modelo.Comment.get(modelId).then(comments => {
        Modelo.Comment.activate(comments[index].id);
    })
    
    //变换构件颜色
    viewer.getScene().setElementsColor(elementID, hexToRGB(Parameter.color));

    //高亮构件
    selectElementTool.pick(elementID, false);

    //打开浮窗
    document.getElementById("panelLabel").style.visibility = 'visible';

    //找到构件BBOX的三维坐标，返回的是两个点，一共六个数
    var position3D = viewer.getScene().getElementsBBox(elementID);

    //用构件BBOX的坐标附上浮窗
    viewer.setUpdateCallback(function() {
        //从三维坐标转换到二维坐标，其中slice(3,6)选的是BBOX的后一个
        var position2D = viewer.getCamera().project(position3D.slice(3, 6));
        document.getElementById("panelLabel").style.left = position2D[0] + "px";
        document.getElementById("panelLabel").style.top = position2D[1] + "px";
    });
}
/**
 * hex to rgb color
 * @param {*} color 
 */
function hexToRGB(color) {
    const sColor = color.toLowerCase();
    const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
            const sColorNew = "#";
            for (let i=1; i<4; i+=1) {
                sColorNew += sColor.slice(i, i+1).concat(sColor.slice(i, i+1));    
            }
            sColor = sColorNew;
        }
        const sColorChange = [];
        for (let i=1; i<7; i+=2) {
            sColorChange.push(parseInt("0x"+sColor.slice(i, i+2)) / 255);    
        }
        return sColorChange;
    } else {
        return [0, 0, 0]
    }
}