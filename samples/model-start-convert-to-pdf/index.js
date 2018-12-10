window.onload = function () {
    // Initialize the API and specify the backend service URL
    // Modelo.initialize("https://build-portal.modeloapp.com");
    // devAPI
    Modelo.init({"endpoint": "https://bim-portal-dev.modeloapp.com"});
    var appToken = 'VHlsaW4sbW9kZWxvQkk1NjA='; // A sample app token
    Modelo.Auth.signIn(
        appToken,
        function () {
            var sendBtn = document.getElementById("button");
            sendBtn.onclick = function () {
                var modelIdInputValue = document.getElementById("input").value;
                if (!modelIdInputValue) {
                    document.getElementById("pdfId").innerHTML = 'Please enter modelId!';
                    return '';
                }
                Modelo.Model.modelConvertToPdf(modelIdInputValue, function (pdfId) {
                    document.getElementById("pdfId").innerHTML = 'PDFId is : ' + '<span>' + pdfId + '</span>';
                });
            }
        },
        function (errMsg) {
            console.log('signInErr: ' + errMsg);
        },
    );
};
