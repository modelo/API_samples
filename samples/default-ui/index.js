window.onload = function() {
    Modelo.init({ endpoint: "https://build-portal.modeloapp.com" });

    var modelId = "ag8lxB8y";
    var container = document.querySelector("#modelContainer");
    var appToken = 'c2FtcGxlcyxtb2RlbG9TQU1QTEVT'; // A sample app token

    Modelo.Auth.signIn(
        appToken,
        function() {
            const modelApp = new Modelo.WebApp({
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
