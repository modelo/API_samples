Modelo.init({ endpoint: "https://build-portal.modeloapp.com" });

const modelId = "93rjxWY4";
const appToken = "c2FtcGxlcyx0ZVNhbXBsZVBhc3M1NDE="; // A sample app token

function updateProgress(progress) {
    const c = document.getElementById("progress");
    c.innerHTML = "Loading: " + Math.round(progress * 100) + "%";
}

Modelo.Auth.signIn(appToken)
    .then(() => {
        const viewer = new Modelo.View.Viewer3D("model");

        viewer.addInput(new Modelo.View.Input.Mouse(viewer)); // Add mouse to control camera.

        const rulers = [
            new Modelo.View.Tool.MeasureLines(viewer),
            new Modelo.View.Tool.MeasureLine(viewer),
            new Modelo.View.Tool.MeasureLineStrip(viewer),
            new Modelo.View.Tool.MeasureLineFan(viewer),
            new Modelo.View.Tool.MeasureAngle(viewer),
            new Modelo.View.Tool.MeasureArea(viewer)
        ];

        viewer.addTool(rulers[0]);
        viewer.addTool(rulers[1]);
        viewer.addTool(rulers[2]);
        viewer.addTool(rulers[3]);
        viewer.addTool(rulers[4]);
        viewer.addTool(rulers[5]);

        let currentRulerType = -1;

        rulers[0].setEnabled(false);
        rulers[1].setEnabled(false);
        rulers[2].setEnabled(false);
        rulers[3].setEnabled(false);
        rulers[4].setEnabled(false);
        rulers[5].setEnabled(false);

        document.getElementById("rulertype").onchange = function() {
            const t = document.getElementById("rulertype").value;
            if (t === "Type") {
                for (const i = 0; i < rulers.length; i++) {
                    rulers[i].setEnabled(false);
                }
                document.getElementById("unit").setAttribute("disabled", "");
                return;
            }
            // Note that only one ruler should be enabled at the same time.
            for (let i = 0; i < rulers.length; i++) {
                rulers[i].setEnabled(false);
            }
            rulers[t].setEnabled(true);
            viewer.invalidate();
            currentRulerType = t;
            document.getElementById("unit").removeAttribute("disabled");
        };

        document.getElementById("unit").onchange = function() {
            if (currentRulerType < 0) {
                return;
            }
            const unit = document.getElementById("unit").value;
            switch (unit) {
                case "0":
                    rulers[currentRulerType].setUnit("m");
                    break;
                case "1":
                    rulers[currentRulerType].setUnit("cm");
                    break;
                case "2":
                    rulers[currentRulerType].setUnit("feet");
                    break;
                case "3":
                    rulers[currentRulerType].setUnit("inches");
                    break;
                default:
                    rulers[currentRulerType].setUnit("m");
                    break;
            }
        };

        viewer.loadModel(modelId, updateProgress).then(() => {
            // success
            console.log("loading done");

            viewer.getEventEmitter().on("Measure-Update", args => {
                document.getElementById("result").innerHTML = JSON.stringify(args);
            });
            // Update the current cursor coordinate.
            viewer.getEventEmitter().on("Measure-DotUpdate", args => {
                //console.log(args); // contains snapTo, snapPos
            });
        });
    })
    .catch(e => console.log(e.message));
