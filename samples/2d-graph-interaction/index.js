let lastElement = '';
const modelId = "p1wbbNrj";
const appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUzLCJ1c2VybmFtZSI6Ik1vZGVsbyIsImlzUGVybWFuZW50Ijp0cnVlLCJpYXQiOjE1Njc1NjI0MTksImV4cCI6MzMxMDM1NjI0MTl9.EbW_cSPca4kWLedgNtfrGguog_o-3CCM5WhM7fFi0GA"

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

function updateProgress(progress) {
    var c = document.getElementById("progress");
    c.innerHTML = "Loading: " + Math.round(progress * 100) + "%";
}

const viewer = new Modelo.View.Viewer3D("model");
viewer.addInput(new Modelo.View.Input.Mouse(viewer)); // Add mouse to control camera.
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
viewer.loadModel(modelId, updateProgress).then(() => {
    setDarkTheme(viewer);
    chartSetting();
})


function chartSetting() {
    const myChart = echarts.init(document.getElementById('main'));
    
    option = {
        title: {
            text: '天气情况统计',
            left: 'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            // orient: 'vertical',
            // top: 'middle',
            bottom: 0,
            left: 'center',
            data: ['structure', 'electromechanical','building', 'rooms']
        },
        series : [
            {
                type: 'pie',
                radius : '65%',
                center: ['50%', '50%'],
                selectedMode: 'single',
                data:[
                    {value:elements.structure.length,name: 'structure'},
                    {value:elements.electromechanical.length, name: 'electromechanical'},
                    {value:elements.building.length, name: 'building'},
                    {value:elements.rooms.length, name: 'rooms'},
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
        viewer.getScene().setElementsColor(elements[lastElement], params.color);
    });
}