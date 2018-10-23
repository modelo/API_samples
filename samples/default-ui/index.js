window.onload = function() {
    Modelo.init({ endpoint: "https://build-portal.modeloapp.com" });

    var modelId = "93rjxWY4";
    var container = document.querySelector("#modelContainer");
    var appToken = 'c2FtcGxlcyxtb2RlbG9TQU1QTEVT'; // A sample app token

    Modelo.Auth.signIn(
        appToken,
        function() {
            const modelApp = new Modelo.WebApp({
                modelId,
                containerId: "modelContainer"
            });
        },
        function(e) {
            console.error(e);
        }
    );
};
