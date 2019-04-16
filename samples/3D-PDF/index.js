var appToken =
  " eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsInVzZXJuYW1lIjoic2FtcGxlcyIsImlhdCI6MTU0ODE0NjI3NywiZXhwIjozMzA4NDE0NjI3N30.XoUmS8836nUVm0mASqL6qiaXgg34Xn4lyieaPtrn5mE"; // A sample app token
Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

try {
  var sendBtnGenerate3DPDF = document.getElementById("buttonGenerate3DPDF");
  sendBtnGenerate3DPDF.onclick = () => {
    var modelIdInputValue = document.getElementById("inputGenerate3DPDF").value;
    if (!modelIdInputValue) {
      document.getElementById("pdfIdGenerate3DPDF").innerHTML = "Please enter modelId!";
    } else {
      Modelo.Model.generate3DPDF(modelIdInputValue).then(pdfId => {
        document.getElementById("pdfIdGenerate3DPDF").innerHTML = "PDF Id is : " + "<span>" + pdfId + "</span>";
        document.getElementById("inputGet3DPDFURL").value = pdfId;
      });
    }
  };
  var sendBtnGet3DPDFURL = document.getElementById("buttonGet3DPDFURL");
  sendBtnGet3DPDFURL.onclick = () => {
    var modelIdInputValue = document.getElementById("inputGet3DPDFURL").value;
    if (!modelIdInputValue) {
      document.getElementById("pdfIdGet3DPDFURL").innerHTML = "Please enter PDFId!";
    } else {
      Modelo.Model.get3DPDFURL(modelIdInputValue).then(url => {
        document.getElementById("pdfIdGet3DPDFURL").innerHTML =
          "PDF download url: " + "<a href=" + url + ">" + url + "</a>";
      });
    }
  };
} catch (e) {
  console.log(e);
}
