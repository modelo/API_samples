var fileInput = document.getElementById("myFile");
var uploadBtn = document.getElementById("uploadBtn");
var showFileName = document.getElementById("showFileName");
var progress = document.getElementById("progress");
var progressShow = document.getElementById("progressShow");
var $progress = $("#progress");
var modelFile = null;

var appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUzLCJ1c2VybmFtZSI6Ik1vZGVsbyIsImlzUGVybWFuZW50Ijp0cnVlLCJpYXQiOjE1Njc1NjI0MTksImV4cCI6MzMxMDM1NjI0MTl9.EbW_cSPca4kWLedgNtfrGguog_o-3CCM5WhM7fFi0GA" // A sample app token
Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });
uploadBtn.onclick = () => {
  fileInput.click();
  fileInput.onchange = () => {
    modelFile = fileInput.files[0];
    $progress.progress("reset");
    // Upload a model. Params: folderId file
    Modelo.Model.upload(modelFile, percentage => {
      var percentage = Math.ceil(percentage * 100);
      var currentProgressValue = $progress.progress("get value");
      fileInput.disabled = "disabled";
      uploadBtn.className = "ui primary loading button";
      for (var i = currentProgressValue; i < percentage; i++) {
        $progress.progress("increment");
      }
      console.log("progress: " + percentage);
    })
      .then(modelId => {
        showFileName.innerHTML = modelFile.name;
        fileInput.disabled = "";
        uploadBtn.className = "ui primary button";
        console.log(modelId);
      })
      .catch(e => {
        fileInput.disabled = "";
        uploadBtn.className = "ui primary button";
        progress.className = "ui small progress error";
        progressShow.innerHTML = "Uploading Error";
        console.log("uploadErr: " + e);
      });
  };
};
