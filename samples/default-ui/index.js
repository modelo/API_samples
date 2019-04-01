window.onload = function () {
    const destroyBtn = document.getElementById('destroyBtn');
    let modelApp;

    destroyBtn.addEventListener('click', function () {
        if (modelApp) {
            modelApp.destroy();
        }
    });

    const modelId = "91BOWMYo";
    const appToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTIsInVzZXJuYW1lIjoiZW5uZWFkIiwiaXNQZXJtYW5lbnQiOnRydWUsImlhdCI6MTU1MjI5MjQxNiwiZXhwIjozMzA4ODI5MjQxNn0.ismoQ_424YAY7xTgbb9rZ7Ze7y59vJnMNAnu6UmfB5M';

    Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

    modelApp = new Modelo.WebApp({
        modelId,
        containerId: "modelContainer",
        useDefaultFavicon: true
    });

};
