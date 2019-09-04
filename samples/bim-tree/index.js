var searchValue = document.getElementById("searchValue");
var searchBtn = document.getElementById("searchBtn");
var show = document.getElementById("bimTree-show");

var appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUzLCJ1c2VybmFtZSI6Ik1vZGVsbyIsImlzUGVybWFuZW50Ijp0cnVlLCJpYXQiOjE1Njc1NjI0MTksImV4cCI6MzMxMDM1NjI0MTl9.EbW_cSPca4kWLedgNtfrGguog_o-3CCM5WhM7fFi0GA" // A sample app token
Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

searchBtn.onclick = () => {
  searchBtn.className = "ui loading button";
  show.innerHTML = "";
  var searchId = searchValue.value || searchValue.placeholder;
  Modelo.BIM.getTreeInfo(searchId)
    .then(bimTree => {
      var bimTreeData = JSON.stringify(bimTree, null, 2);
      show.innerHTML = bimTreeData;
      searchBtn.className = "ui button";
    })
    .catch(e => {
      show.innerHTML = "No BIM Tree";
      searchBtn.className = "ui button";
      console.log("getBIMTreeErr: " + e);
    });
};
