var modelId = "aYeBJe8M";
var appToken =
  " eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsInVzZXJuYW1lIjoic2FtcGxlcyIsImlhdCI6MTU0ODE0NjI3NywiZXhwIjozMzA4NDE0NjI3N30.XoUmS8836nUVm0mASqL6qiaXgg34Xn4lyieaPtrn5mE";

Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

var viewer = new Modelo.View.Viewer3D("model");
viewer.addInput(new Modelo.View.Input.Mouse(viewer));
// add keyboard callback.
var keyboard = new Modelo.View.Input.Keyboard(viewer);
viewer.addInput(keyboard);
keyboard.addKeyUpListener(keyboard => {
  if (keyboard.key === 27) {
    viewer.destroy();
  }
});

viewer.setRenderingLinesEnabled(true);

var ground = new Modelo.Scene3D.Pawn("ground", viewer.getResourceManager(), viewer.getMaterialManager());
ground.createSolidCube();
ground.setScaling(40, 40, 1.0);
viewer.getScene().addPawn(ground);

// Put pawns on random positions
for (var i = 0; i < 10; i++) {
    var cube = new Modelo.Scene3D.Pawn("cube" + i, viewer.getResourceManager(), viewer.getMaterialManager());
    cube.createSolidCube([1, 1, 1]);

    var x = Math.random() * 80 - 40.0;
    var y = Math.random() * 80 - 40.0;
    cube.setTranslation(x, y, 2.02);
    viewer.getScene().addPawn(cube);
}

var IMAGE = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QBmRXhpZgAATU0AKgAAAAgABgESAAMAAAABAAEAAAMBAAUAAAABAAAAVgMDAAEAAAABAAAAAFEQAAEAAAABAQAAAFERAAQAAAABAAAOxFESAAQAAAABAAAOxAAAAAAAAYagAACxj//bAEMAAgEBAgEBAgICAgICAgIDBQMDAwMDBgQEAwUHBgcHBwYHBwgJCwkICAoIBwcKDQoKCwwMDAwHCQ4PDQwOCwwMDP/bAEMBAgICAwMDBgMDBgwIBwgMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDP/AABEIAQABAAMBIgACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgv/xAC1EAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5+jp6vHy8/T19vf4+fr/xAAfAQADAQEBAQEBAQEBAAAAAAAAAQIDBAUGBwgJCgv/xAC1EQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/AP38ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAoJxRTXOVoAdRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFACBs/nTM5pWPLfnUcjbU/CgCeimg7R6806gAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKbIfl+tADGbv6mq80m0VLO+Pwqjdz43UAaTNlT9KkByKrxSZH+eKmjPGKAHUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFRyP3p0h4x61BO+KAILqTYPwrL1C7xuq1f3GAawdWvtuaAOot59y1aif5R7Vi2N5uStS3lyBQBcBzRUcbfkakoAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAoJxRTJH/IUAMkfjP8AkVTu59oqa4mxmsnUrzYDQBU1W+8tW5rltc1Tbu5q1ruqbVPPauJ8Sa7tLfNQM9G0jVA69fSugsLveo+leY+HdfDqvzfrXZaPqnmKvPagDroZsirCN2rJtLzIHNaEUoYf54oEWKKaj5p1ABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRTXbbQAO3aq802Fp0su0f55rPvLvaKAI7+72Ka5zW9V2A89qsaxqmwNz2riPEviARq3zfrQMq+J9f2K3zV5z4o8TYZvm/WpfF/irAb5q8y8U+K/mb5v1oLPWPCXiveF+avR/DfiISKvzfrXzJ4Q8afd+b0716l4R8YbwvzfrQB75pOrCRV5rdtL3djmvLfDniXzFX5q7HSdZEgXmgg6+KYMKnR+OfzrHs78N396vQXGR/nmgRcoqNJOOPyp6tuoAWiiigAooooAKKKKACiiigAooooAKKKKACiiigAopGbbTHk454FADmf0/OoHn2jimzT4H9KoXl/sDfNQBJd3gUNzWDq2rBFPzU3VtZ2A/N2rjfEficRK3zfrQAeJfEIjVvmrzXxf4twG+b9ad4v8ZBN3zfrXk/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";
var image = new Image();
image.src = IMAGE;
image.onload = function() {
    for (var i = 0; i < 10; i++) {
        var plane = new Modelo.Scene3D.PawnBillboard("plane" + i, viewer.getResourceManager(), viewer.getMaterialManager());
        plane.createTexturedQuad(image);

        var x = Math.random() * 80 - 40.0;
        var y = Math.random() * 80 - 40.0;
        plane.setTranslation(x, y, 2.02);
        viewer.getScene().addPawn(plane);
    }
}


