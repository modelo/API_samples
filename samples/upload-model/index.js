window.onload = function () {
    // Initialize the API and specify the backend service URL
    // Modelo.initialize("https://build-portal.modeloapp.com");
    // devAPI
    Modelo.init({"endpoint": "https://build-portal.modeloapp.com"});
    var appToken = 'c2FtcGxlcyxtb2RlbG9TQU1QTEVT'; // A sample app token
    Modelo.Auth.signIn(
        appToken,
        function () {
            var fileInput = document.getElementById("myFile");
            var uploadBtn = document.getElementById("uploadBtn");
            var showFileName = document.getElementById("showFileName");
            var progress = document.getElementById("progress");
            var progressShow = document.getElementById("progressShow");
            var $progress = $("#progress");
            var modelFile = null;
            uploadBtn.onclick = function () {
                fileInput.click();
                fileInput.onchange = function () {
                    modelFile = fileInput.files[0];
                    $progress.progress('reset');
                    // Upload a model. Params: folderId file
                    Modelo.Model.upload(
                        modelFile,
                        function (modelId) {
                            showFileName.innerHTML = modelFile.name;
                            fileInput.disabled = "";
                            uploadBtn.className = "ui primary button";
                            console.log(modelId);
                        },
                        function (percentage) {
                            var percentage = Math.ceil(percentage * 100);
                            var currentProgressValue = $progress.progress("get value");
                            fileInput.disabled = "disabled";
                            uploadBtn.className = "ui primary loading button";
                            for (var i = currentProgressValue; i < percentage; i++) {
                                $progress.progress("increment");
                            };
                            console.log('progress: ' + percentage);
                        },
                        function (errMsg) {
                            fileInput.disabled = "";
                            uploadBtn.className = "ui primary button";
                            progress.className="ui small progress error";
                            progressShow.innerHTML = "Uploading Error";
                            console.log('uploadErr: ' + errMsg);
                        },
                    );
                }
            }
        },
        function (errMsg) {
            console.log('signInErr: ' + errMsg);
        },
    );
}
