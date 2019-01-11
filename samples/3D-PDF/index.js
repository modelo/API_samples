window.onload = function () {
    // Initialize the API and specify the backend service URL
    // Modelo.initialize("https://build-portal.modeloapp.com");
    // devAPI
    Modelo.init({ "endpoint": "https://build-portal.modeloapp.com" });
    const appToken = 'c2FtcGxlcyx0ZVNhbXBsZVBhc3M1NDE='; // A sample app token

    Modelo.Auth.signIn(appToken).then(() => {
        try {
            const sendBtnGenerate3DPDF = document.getElementById("buttonGenerate3DPDF");
            sendBtnGenerate3DPDF.onclick = () => {
                const modelIdInputValue = document.getElementById("inputGenerate3DPDF").value;
                if (!modelIdInputValue) {
                    document.getElementById("pdfIdGenerate3DPDF").innerHTML = 'Please enter modelId!';
                }
                else {
                    Modelo.Model.generate3DPDF(modelIdInputValue).then((pdfId) => {
                        document.getElementById("pdfIdGenerate3DPDF").innerHTML = 'PDF Id is : ' + '<span>' + pdfId + '</span>';
                        document.getElementById("inputGet3DPDFURL").value = pdfId;
                    });
                }
            };
            const sendBtnGet3DPDFURL = document.getElementById("buttonGet3DPDFURL");
            sendBtnGet3DPDFURL.onclick = () => {
                const modelIdInputValue = document.getElementById("inputGet3DPDFURL").value;
                if (!modelIdInputValue) {
                    document.getElementById("pdfIdGet3DPDFURL").innerHTML = 'Please enter PDFId!';
                }
                else {
                    Modelo.Model.get3DPDFURL(modelIdInputValue).then((url) => {
                        document.getElementById("pdfIdGet3DPDFURL").innerHTML = 'PDF download url: ' + '<a href=' + url + '>' + url + '</a>';
                    });
                }
            };
        }
        catch (e) {
            console.log(e)
        }
    }).catch(e => console.log('signInErr: ' + e));
};
