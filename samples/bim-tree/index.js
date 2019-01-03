window.onload = function () {
    // Initialize the API and specify the backend service URL
    Modelo.init({"endpoint": "https://build-portal.modeloapp.com"});

    var appToken = 'c2FtcGxlcyx0ZVNhbXBsZVBhc3M1NDE='; // A sample app token

    Modelo.Auth.signIn(
        appToken,
        function () {
            var searchValue = document.getElementById("searchValue");
            var searchBtn = document.getElementById("searchBtn");
            var show = document.getElementById("bimTree-show");
            searchBtn.onclick = function () {
                searchBtn.className = "ui loading button";
                show.innerHTML = "";
                var searchId = searchValue.value || searchValue.placeholder;
                Modelo.BIM.getBIMTree(
                    searchId,
                    function (bimTree) {
                        var bimTreeData = JSON.stringify(bimTree, null, 2);
                        show.innerHTML = bimTreeData;
                        searchBtn.className = "ui button";
                    },
                    function (errMsg) {
                        show.innerHTML = "No BIM Tree";
                        searchBtn.className = "ui button";
                        console.log('getBIMTreeErr: ' + errMsg);
                    }
                );
            }
        },
        function (errMsg) {
            console.log('signInErr: ' + errMsg);
        }
    );
}
