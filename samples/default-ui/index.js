window.onload = function() {
    var destroyBtn = document.getElementById('destroyBtn');
    var modelApp;

    destroyBtn.addEventListener('click', function() {
        if (modelApp) {
            modelApp.destroy();
        }
    });

    Modelo.init({ endpoint: "https://build-portal.modeloapp.com" });

    var modelId = "NLYVx7rk";
    var container = document.querySelector("#modelContainer");
    var appToken = 'c2FtcGxlcyx0ZVNhbXBsZVBhc3M1NDE='; // A sample app token

    Modelo.Auth.signIn(
        appToken,
        function() {
            modelApp = new Modelo.WebApp({
                modelId,
                containerId: "modelContainer",
                useDefaultFavicon: true
            });
        },
        function(e) {
            console.error(e);
        }
    );
};
