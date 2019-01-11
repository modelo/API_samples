// Initialize the API and specify the backend service URL
Modelo.init({ "endpoint": "https://build-portal.modeloapp.com" });

const searchValue = document.getElementById("searchValue");
const searchBtn = document.getElementById("searchBtn");
const show = document.getElementById("bimTree-show");

const appToken = 'c2FtcGxlcyx0ZVNhbXBsZVBhc3M1NDE='; // A sample app token  

Modelo.Auth.signIn(appToken).then(() => {
    searchBtn.onclick = () => {
        searchBtn.className = "ui loading button";
        show.innerHTML = "";
        const searchId = searchValue.value || searchValue.placeholder;
        Modelo.BIM.getTreeInfo(searchId).then((bimTree) => {
            const bimTreeData = JSON.stringify(bimTree, null, 2);
            show.innerHTML = bimTreeData;
            searchBtn.className = "ui button";
        }).catch(e => {
            show.innerHTML = "No BIM Tree";
            searchBtn.className = "ui button";
            console.log('getBIMTreeErr: ' + e);
        });
    }
}).catch(e => console.log('signInErr: ' + e));

