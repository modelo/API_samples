Modelo.init({ "endpoint": "https://build-portal.modeloapp.com" });

var modelId = "93rjxWY4";
var appToken = 'c2FtcGxlcyxtb2RlbG9TQU1QTEVT'; // A sample app token

Modelo.Auth.signIn(appToken,
    function () {
        var c = document.getElementById("model");

        var w = c.clientWidth;
        var h = c.clientHeight;
        var viewer = new Modelo.View.Viewer3D(c, false, w, h);

        window.addEventListener("resize", function () {
            var c = document.getElementById("model");
            var w = c.clientWidth;
            var h = c.clientHeight;
            viewer.resize(w, h);
        });

        var addComment = true;

        viewer.loadModel(modelId, // Load the model into the viewer.
            null,
            function () {
                var mouse = new Modelo.View.Input.Mouse(c);
                viewer.addInput(mouse); // Add mouse to control camera.
                var addNewComment = document.getElementById("addNewComment");
                // add a new comment
                addNewComment.onclick = function () {
                    c.style.cursor = "crosshair";
                    addComment = true;
                    mouse.addMouseUpListener(function (mouse) {
                        if (addComment) {
                            if (!mouse.moved) {
                                Modelo.Model.createComment(
                                    modelId,
                                    "test",
                                    "new comment",
                                    "",
                                    function (commentId1) {
                                        commentId = commentId1;
                                        console.log("comment created");
                                        c.style.cursor = "default";
                                        // create success then reget refeshed comments
                                        Modelo.Model.getComments(
                                            modelId,
                                            function onSuccess(comments) {
                                                // add commentsInfo success remove old comments
                                                for(var i = 0; i<comments.length; i++){
                                                    var parentWrapper = document.getElementsByClassName("wrapper")[0];
                                                    var childCommentsInfo = document.getElementById(comments[i].id);
                                                    if(childCommentsInfo !== null){
                                                        parentWrapper.removeChild(childCommentsInfo);
                                                    }else{
                                                        continue;
                                                    }
                                                }
                                                // reAdd new commentsInfo
                                                for (let i = 0; i < comments.length; i++) {
                                                    var divUiMessage = document.createElement("div");
                                                    divUiMessage.id = comments[i].id;
                                                    divUiMessage.className = "ui message";
                                                    divUiMessage.style.marginTop = "5px";
                                                    divUiMessage.style.marginBottom = "5px";
                                                    divUiMessage.onclick = function () {
                                                        activateComment(comments[i]);
                                                    }
                                                    var divHeader = document.createElement("div");
                                                    divHeader.className = "header";
                                                    divHeader.innerHTML = "ID:" + comments[i].id;
                                                    var divUiList = document.createElement("div");
                                                    divUiList.className = "ui list";
                                                    var itemSubject = document.createElement("div");
                                                    itemSubject.className = "item";
                                                    itemSubject.innerHTML = "Subject:";
                                                    var inputSubjectWrapper = document.createElement("div");
                                                    inputSubjectWrapper.className = "ui mini input";
                                                    inputSubjectWrapper.style.fontSize = "1rem";
                                                    var inputSubject = document.createElement("input");
                                                    inputSubject.value = comments[i].subject;
                                                    var itemMessage = document.createElement("div");
                                                    itemMessage.className = "item";
                                                    itemMessage.innerHTML = "Message:";
                                                    var inputMessageWrapper = document.createElement("div");
                                                    inputMessageWrapper.className = "ui mini input";
                                                    inputMessageWrapper.style.fontSize = "1rem";
                                                    var inputMessage = document.createElement("input");
                                                    inputMessage.value = comments[i].message;
                                                    var itemCreateAt = document.createElement("div");
                                                    itemCreateAt.style.marginTop = "10px";
                                                    itemCreateAt.className = "item";
                                                    var stopIndex = comments[i].createdAt.indexOf("GMT");
                                                    itemCreateAt.innerHTML = "CreatedAt: " + comments[i].createdAt.substring(0, stopIndex - 9);
                                                    var deleteBtn = document.createElement("button");
                                                    deleteBtn.className = "mini ui red button";
                                                    deleteBtn.innerHTML = "Delete";
                                                    deleteBtn.onclick = function () {
                                                        var currentCommentId = comments[i].id;
                                                        deleteComment(currentCommentId);
                                                    }
                                                    var updateBtn = document.createElement("button");
                                                    updateBtn.className = "mini ui blue button";
                                                    updateBtn.innerHTML = "Update";
                                                    updateBtn.style.marginLeft = "74px";
                                                    updateBtn.onclick = function () {
                                                        var currentCommentId = comments[i].id;
                                                        var currentSubject = this.parentNode.childNodes[1].childNodes[1].firstElementChild.value;;
                                                        var currentMessage = this.parentNode.childNodes[1].childNodes[3].firstElementChild.value;
                                                        updateComment(currentCommentId, currentSubject, currentMessage);
                                                    }
                                                    parentWrapper.appendChild(divUiMessage);
                                                    divUiMessage.appendChild(divHeader);
                                                    divUiMessage.appendChild(divUiList);
                                                    divUiList.appendChild(itemSubject);
                                                    divUiList.appendChild(inputSubjectWrapper);
                                                    inputSubjectWrapper.appendChild(inputSubject);
                                                    inputSubjectWrapper.style.width = "100%";
                                                    divUiList.appendChild(itemMessage);
                                                    divUiList.appendChild(inputMessageWrapper);
                                                    inputMessageWrapper.appendChild(inputMessage);
                                                    inputMessageWrapper.style.width = "100%";
                                                    divUiList.appendChild(itemCreateAt);
                                                    divUiMessage.appendChild(deleteBtn);
                                                    divUiMessage.appendChild(updateBtn);
                                                }
                                                console.log(comments);
                                            },
                                            function onFail(errmsg) {
                                                console.log('getCommentsErr: ' + errmsg);
                                            });
                                    },
                                    function (errmsg) {
                                        console.log(errmsg);
                                        c.style.cursor = "default";
                                    },
                                    viewer,
                                    mouse.x,
                                    mouse.y
                                );
                                addComment = false;
                            }
                        }
                    });
                }

                var keyboard = new Modelo.View.Input.Keyboard(c); // Add keyboard callback.
                viewer.addInput(keyboard);

                var parentWrapper = document.getElementsByClassName("wrapper")[0];
                // get comments to display
                Modelo.Model.getComments(
                    modelId,
                    function onSuccess(comments) {
                        for (let i = 0; i < comments.length; i++) {
                            var divUiMessage = document.createElement("div");
                            divUiMessage.id = comments[i].id;
                            divUiMessage.className = "ui message";
                            divUiMessage.style.marginTop = "5px";
                            divUiMessage.style.marginBottom = "5px";
                            divUiMessage.onclick = function () {
                                activateComment(comments[i]);
                            }
                            var divHeader = document.createElement("div");
                            divHeader.className = "header";
                            divHeader.innerHTML = "ID:" + comments[i].id;
                            var divUiList = document.createElement("div");
                            divUiList.className = "ui list";
                            var itemSubject = document.createElement("div");
                            itemSubject.className = "item";
                            itemSubject.innerHTML = "Subject:";
                            var inputSubjectWrapper = document.createElement("div");
                            inputSubjectWrapper.className = "ui mini input";
                            inputSubjectWrapper.style.fontSize = "1rem";
                            var inputSubject = document.createElement("input");
                            inputSubject.value = comments[i].subject;
                            var itemMessage = document.createElement("div");
                            itemMessage.className = "item";
                            itemMessage.innerHTML = "Message:";
                            var inputMessageWrapper = document.createElement("div");
                            inputMessageWrapper.className = "ui mini input";
                            inputMessageWrapper.style.fontSize = "1rem";
                            var inputMessage = document.createElement("input");
                            inputMessage.value = comments[i].message;
                            var itemCreateAt = document.createElement("div");
                            itemCreateAt.style.marginTop = "10px";
                            itemCreateAt.className = "item";
                            var stopIndex = comments[i].createdAt.indexOf("GMT");
                            itemCreateAt.innerHTML = "CreatedAt: " + comments[i].createdAt.substring(0, stopIndex - 9);
                            var deleteBtn = document.createElement("button");
                            deleteBtn.className = "mini ui red button";
                            deleteBtn.innerHTML = "Delete";
                            deleteBtn.onclick = function () {
                                var currentCommentId = comments[i].id;
                                deleteComment(currentCommentId);
                            }
                            var updateBtn = document.createElement("button");
                            updateBtn.className = "mini ui blue button";
                            updateBtn.innerHTML = "Update";
                            updateBtn.style.marginLeft = "74px";
                            updateBtn.onclick = function () {
                                var currentCommentId = comments[i].id;
                                var currentSubject = this.parentNode.childNodes[1].childNodes[1].firstElementChild.value;;
                                var currentMessage = this.parentNode.childNodes[1].childNodes[3].firstElementChild.value;
                                updateComment(currentCommentId, currentSubject, currentMessage);
                            }
                            parentWrapper.appendChild(divUiMessage);
                            divUiMessage.appendChild(divHeader);
                            divUiMessage.appendChild(divUiList);
                            divUiList.appendChild(itemSubject);
                            divUiList.appendChild(inputSubjectWrapper);
                            inputSubjectWrapper.appendChild(inputSubject);
                            inputSubjectWrapper.style.width = "100%";
                            divUiList.appendChild(itemMessage);
                            divUiList.appendChild(inputMessageWrapper);
                            inputMessageWrapper.appendChild(inputMessage);
                            inputMessageWrapper.style.width = "100%";
                            divUiList.appendChild(itemCreateAt);
                            divUiMessage.appendChild(deleteBtn);
                            divUiMessage.appendChild(updateBtn);
                        }
                        console.log(comments);
                    },
                    function onFail(errmsg) {
                        console.log('getCommentsErr: ' + errmsg);
                    });
                // update comment
                function updateComment(commentId, subject, message) {
                    Modelo.Model.updateComment(
                        commentId,
                        subject,
                        message,
                        function (commentId) {
                            console.log(commentId + "comment updated");
                        },
                        function (errmsg) {
                            console.log("updateErr:" + errmsg);
                        },
                    );
                }
                // delete comment
                function deleteComment(commentId) {
                    Modelo.Model.deleteComment(
                        commentId,
                        function (commentId) {
                            var parentWrapper = document.getElementsByClassName("wrapper")[0];
                            var currentComment = document.getElementById(commentId);
                            parentWrapper.removeChild(currentComment);
                            console.log(commentId + "comment deleted");
                        },
                        function (errmsg) {
                            console.log('DeleteErr: ' + errmsg);
                        },
                    );
                }
                // activate comment
                function activateComment(comment) {
                    Modelo.Model.activateComment(comment, viewer);
                }
                // keyboard.addKeyUpListener(function (keyboard) {
                //     switch (keyboard.key) {
                //         case 65: //'a'
                //             addComment = true;
                //             break;
                //         case 66: //'b'
                //             Modelo.Model.deleteComment(commentId,
                //                 function (commentId) { console.log("comment deleted"); },
                //                 function (errmsg) { console.log(errmsg); },
                //             );
                //             break;
                //         case 67: //'c'
                //             Modelo.Model.updateComment(commentId,
                //                 "test2", "new test comment",
                //                 function (commentId) { console.log("comment updated"); },
                //                 function (errmsg) { console.log(errmsg); },
                //             );
                //             break;
                //         case 69: //'e'
                //             Modelo.Model.activateComment(comment, viewer);
                //             break;
                //     }
                // });
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

