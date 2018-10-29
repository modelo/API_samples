Modelo.init({"endpoint": "https://build-portal.modeloapp.com"});

var modelId = "93rjxWY4";
var appToken = 'c2FtcGxlcyxtb2RlbG9TQU1QTEVT'; // A sample app token

Modelo.Auth.signIn(appToken,
    function () {
        var c = document.getElementById("model");

        var w = c.clientWidth;
        var h = c.clientHeight;
        var viewer = new Modelo.View.Viewer3D(c, false, w, h);

        window.addEventListener("resize",function() {
            var c = document.getElementById("model");
            var w = c.clientWidth;
            var h = c.clientHeight;
            viewer.resize(w, h);
        });

        var commentId = "";
        var addComment = true;
   
        viewer.loadModel(modelId, // Load the model into the viewer.
            null,
            function () {
                var mouse = new Modelo.View.Input.Mouse(c);
                viewer.addInput(mouse); // Add mouse to control camera.

                mouse.addMouseUpListener(function(mouse) {
                    if (addComment) {
                        if (!mouse.moved) {
                            Modelo.Model.createComment(modelId, 
                                "test", "a test comment", "", 
                                function(commentId1) { commentId = commentId1; console.log("comment created"); },
                                function(errmsg) { console.log(errmsg); },
                                viewer, mouse.x, mouse.y
                            );

                            addComment = false;
                        }
                    }
                });

                var keyboard = new Modelo.View.Input.Keyboard(c); // Add keyboard callback.
                viewer.addInput(keyboard);
                
                var commentId = 93;
                var comment = null;
                            
                Modelo.Model.getComments(modelId, 
                    function onSuccess(comments) {
                        for (var i = 0; i < comments.length; i++) {
                            console.log(comments[i]);
                        }

                        comment = comments[0];
                    },
                    function onFail(errmsg) {
                        console.log(errmsg);
                    });

                keyboard.addKeyUpListener(function (keyboard) {
                    switch (keyboard.key) {
                        case 65: //'a'
                            addComment = true;
                            break;
                        case 66: //'b'
                            Modelo.Model.deleteComment(commentId, 
                                function(commentId) { console.log("comment deleted"); },
                                function(errmsg) { console.log(errmsg); },
                            );
                            break;
                        case 67: //'c'
                            Modelo.Model.updateComment(commentId, 
                                "test1", "another test comment",
                                function(commentId) { console.log("comment updated"); },
                                function(errmsg) { console.log(errmsg); },
                            );
                            break;
                        case 69: //'e'
                            Modelo.Model.activateComment(comment, viewer); 
                            break;
                    }
                }); 
                console.log("done");
            },
            function (errmsg) {
                console.log(errmsg); // The loading error.
            },
            function (per) {
                var c = document.getElementById("progress");
                c.innerHTML = "Loading: " + Math.round(per * 100) + "%";
            });
    },
    function (errmsg) {
        console.log(errmsg); // If there is any sign-inerror.
    });

