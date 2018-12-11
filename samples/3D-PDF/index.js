window.onload = function () {
    // Initialize the API and specify the backend service URL
    // Modelo.initialize("https://build-portal.modeloapp.com");
    // devAPI
    Modelo.init({"endpoint": "https://bim-portal-dev.modeloapp.com"});
    var appToken = 'VHlsaW4sbW9kZWxvQkk1NjA='; // A sample app token
    Modelo.Auth.signIn(
        appToken,
        function () {
            try {
                var sendBtnGenerate3DPDF = document.getElementById("buttonGenerate3DPDF");
                sendBtnGenerate3DPDF.onclick = function () {
                    var modelIdInputValue = document.getElementById("inputGenerate3DPDF").value;
                    if (!modelIdInputValue) {
                        document.getElementById("pdfIdGenerate3DPDF").innerHTML = 'Please enter modelId!';
                    }
                    else {
                        Modelo.Model.generate3DPDF(modelIdInputValue, function (pdfId) {
                            document.getElementById("pdfIdGenerate3DPDF").innerHTML = 'PDF Id is : ' + '<span>' + pdfId + '</span>';
                            document.getElementById("inputGet3DPDFURL").value = pdfId;
                        });
                    }
                };

                var sendBtnGet3DPDFURL = document.getElementById("buttonGet3DPDFURL");
                sendBtnGet3DPDFURL.onclick = function () {
                    var modelIdInputValue = document.getElementById("inputGet3DPDFURL").value;
                    if (!modelIdInputValue) {
                        document.getElementById("pdfIdGet3DPDFURL").innerHTML = 'Please enter PDFId!';
                    }
                    else {
                        Modelo.Model.get3DPDFURL(modelIdInputValue, function (url) {
                            document.getElementById("pdfIdGet3DPDFURL").innerHTML = 'PDF download url: ' + '<a href=' + url + '>' + url + '</a>';
                        });
                    }
                };
            }
            catch (e) {
                console.log(e)
            }
        },
        function (errMsg) {
            console.log('signInErr: ' + errMsg);
        },
    );
};
