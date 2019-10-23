let lastElement = '';
const modelId = "q8Z27w8a";
const appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUzLCJ1c2VybmFtZSI6Ik1vZGVsbyIsImlzUGVybWFuZW50Ijp0cnVlLCJpYXQiOjE1Njc1NjI0MTksImV4cCI6MzMxMDM1NjI0MTl9.EbW_cSPca4kWLedgNtfrGguog_o-3CCM5WhM7fFi0GA"

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

function updateProgress(progress) {
    var c = document.getElementById("progress");
    c.innerHTML = "Loading: " + Math.round(progress * 100) + "%";
}

const viewer = new Modelo.View.Viewer3D("model", {   isMobile: isMobile() });
viewer.addInput(new Modelo.View.Input.Mouse(viewer)); // Add mouse to control camera.
viewer.addInput(new Modelo.View.Input.Touch(viewer));
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
                    {value:elements.type1.length, name: 'type1'},
                    {value:elements.type2.length, name: 'type2'},
                    {value:elements.type3.length, name: 'type3'},
                    {value:elements.type4.length, name: 'type4'},
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
        viewer.getScene().setElementsColor(elements[lastElement], hexToRGB(params.color));
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