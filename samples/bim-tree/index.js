var searchValue = document.getElementById("searchValue");
var searchBtn = document.getElementById("searchBtn");
var show = document.getElementById("bimTree-show");

var appToken =
  " eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsInVzZXJuYW1lIjoic2FtcGxlcyIsImlhdCI6MTU0ODE0NjI3NywiZXhwIjozMzA4NDE0NjI3N30.XoUmS8836nUVm0mASqL6qiaXgg34Xn4lyieaPtrn5mE"; // A sample app token
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
