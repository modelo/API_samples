window.onload = function () {
    Modelo.init({ "endpoint": "https://build-portal.modeloapp.com" });

    const modelId = "NLYVx7rk";
    const appToken = 'c2FtcGxlcyx0ZVNhbXBsZVBhc3M1NDE='; // A sample app token

    Modelo.Auth.signIn(appToken).then(() => {
        const viewer = new Modelo.View.Viewer3D("model");
        let addComment = true;
        const c = document.getElementById("model");
        viewer.loadModel(modelId, progress => {
            const c = document.getElementById("progress");
            c.innerHTML = "Loading: " + Math.round(progress * 100) + "%";
        }).then(() => {
            const mouse = new Modelo.View.Input.Mouse(viewer);
            viewer.addInput(mouse);
            const addNewComment = document.getElementById("addNewComment");
            // add a new comment
            addNewComment.onclick = () => {
                c.style.cursor = "crosshair";
                addComment = true;
                mouse.addMouseUpListener((mouse) => {
                    if (addComment) {
                        if (!mouse.moved) {
                            Modelo.Comment.create(modelId, { username: 'testUser', message: 'new comment' }).then((commentId1) => {
                                commentId = commentId1;
                                console.log("comment created");
                                c.style.cursor = "default";
                                // create success then reget refeshed comments
                                Modelo.Comment.get(modelId).then((comments) => {
                                    // add commentsInfo success remove old comments
                                    for (let i = 0; i < comments.length; i++) {
                                        const parentWrapper = document.getElementsByClassName("wrapper")[0];
                                        const childCommentsInfo = document.getElementById(comments[i].id);
                                        if (childCommentsInfo !== null) {
                                            parentWrapper.removeChild(childCommentsInfo);
                                        } else {
                                            continue;
                                        }
                                    }
                                    // reAdd new commentsInfo
                                    for (let i = 0; i < comments.length; i++) {
                                        generateCard(comments, i);
                                    }
                                    console.log(comments);
                                }).catch(e => console.log('getCommentsErr: ' + e));
                            }).catch(e => {
                                console.log(e);
                                c.style.cursor = "default";
                            });
                            addComment = false;
                        }
                    }
                });
            }
            const keyboard = new Modelo.View.Input.Keyboard(viewer); // Add keyboard callback.
            viewer.addInput(keyboard);
            const parentWrapper = document.getElementsByClassName("wrapper")[0];
            // get comments to display
            Modelo.Comment.get(modelId).then((comments) => {
                for (let i = 0; i < comments.length; i++) {
                    generateCard(comments, i);
                }
            }).catch(e => console.log('getCommentsErr: ' + e));
            console.log("done");
        });
    }).catch(e => console.log('signInErr: ' + e));

    // delete comment
    const deleteComment = (commentId) => {
        Modelo.Comment.remove(commentId).then((commentId) => {
            const parentWrapper = document.getElementsByClassName("wrapper")[0];
            const currentComment = document.getElementById(commentId);
            parentWrapper.removeChild(currentComment);
            console.log(commentId + "comment deleted");
        }).catch(e => console.log('DeleteErr: ' + e));
    }
    // update comment
    const updateComment = (commentId, extData) => {
        Modelo.Comment.update(commentId, extData).then((commentId) => {
            console.log(commentId + "comment updated");
        }).catch(e => console.log("updateErr:" + e));
    }
    // activate comment
    const activateComment = (commentId) => {
        Modelo.Comment.activate(commentId);
    }
    // generate comments card
    function generateCard(comments, i) {
        const parentWrapper = document.getElementsByClassName("wrapper")[0];
        const divUiMessage = document.createElement("div");
        divUiMessage.id = comments[i].id;
        divUiMessage.className = "ui message";
        divUiMessage.style.marginTop = "5px";
        divUiMessage.style.marginBottom = "5px";
        divUiMessage.onclick = () => {
            activateComment(comments[i].id);
        }
        const divHeader = document.createElement("div");
        divHeader.className = "header";
        divHeader.innerHTML = "ID:" + comments[i].id;
        const divUiList = document.createElement("div");
        divUiList.className = "ui list";
        const itemMessage = document.createElement("div");
        itemMessage.className = "item";
        itemMessage.innerHTML = "Message:";
        const inputMessageWrapper = document.createElement("div");
        inputMessageWrapper.className = "ui mini input";
        inputMessageWrapper.style.fontSize = "1rem";
        const inputMessage = document.createElement("input");
        inputMessage.value = comments[i].extData.message;
        const itemCreateAt = document.createElement("div");
        itemCreateAt.style.marginTop = "10px";
        itemCreateAt.className = "item";
        const stopIndex = comments[i].createdAt.indexOf("GMT");
        itemCreateAt.innerHTML = "CreatedAt: " + comments[i].createdAt.substring(0, stopIndex - 9);
        const deleteBtn = document.createElement("button");
        deleteBtn.className = "mini ui red button";
        deleteBtn.innerHTML = "Delete";
        deleteBtn.onclick = (e) => {
            const currentCommentId = comments[i].id;
            deleteComment(currentCommentId);
            e.stopPropagation();
        }
        const updateBtn = document.createElement("button");
        updateBtn.className = "mini ui blue button";
        updateBtn.innerHTML = "Update";
        updateBtn.style.marginLeft = "74px";
        updateBtn.onclick = () => {
            const currentCommentId = comments[i].id;
            const currentMessage = updateBtn.parentNode.childNodes[1].childNodes[1].firstElementChild.value;
            comments[i].extData.message = currentMessage
            updateComment(currentCommentId, comments[i].extData);
        }
        parentWrapper.appendChild(divUiMessage);
        divUiMessage.appendChild(divHeader);
        divUiMessage.appendChild(divUiList);
        divUiList.appendChild(itemMessage);
        divUiList.appendChild(inputMessageWrapper);
        inputMessageWrapper.appendChild(inputMessage);
        inputMessageWrapper.style.width = "100%";
        divUiList.appendChild(itemCreateAt);
        divUiMessage.appendChild(deleteBtn);
        divUiMessage.appendChild(updateBtn);
    }
}
