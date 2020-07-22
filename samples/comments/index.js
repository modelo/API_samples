var modelId = "3rjZVNr4";
var appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUzLCJ1c2VybmFtZSI6Ik1vZGVsbyIsImlzUGVybWFuZW50Ijp0cnVlLCJpYXQiOjE1Njc1NjI0MTksImV4cCI6MzMxMDM1NjI0MTl9.EbW_cSPca4kWLedgNtfrGguog_o-3CCM5WhM7fFi0GA" // A sample app token
Modelo.init({ endpoint: "https://build-portal.modeloapp.com", appToken });

var viewer = new Modelo.View.Viewer3D("model", {   isMobile: isMobile() });
let addComment = true;
var c = document.getElementById("model");
viewer
  .loadModel(modelId, progress => {
    var c = document.getElementById("progress");
    c.innerHTML = "Loading: " + Math.round(progress * 100) + "%";
  })
  .then(() => {
    var mouse = new Modelo.View.Input.Mouse(viewer);
    viewer.addInput(mouse);
    var addNewComment = document.getElementById("addNewComment");
    // add a new comment
    addNewComment.onclick = () => {
      c.style.cursor = "crosshair";
      addComment = true;
      mouse.addMouseUpListener(mouse => {
        if (addComment) {
          if (!mouse.moved) {
            Modelo.Comment.create(modelId, { username: "testUser", message: "new comment" })
              .then(commentId1 => {
                commentId = commentId1;
                console.log("comment created");
                c.style.cursor = "default";
                // create success then reget refeshed comments
                Modelo.Comment.get(modelId)
                  .then(comments => {
                    // add commentsInfo success remove old comments
                    for (let i = 0; i < comments.length; i++) {
                      var parentWrapper = document.getElementsByClassName("wrapper")[0];
                      var childCommentsInfo = document.getElementById(comments[i].id);
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
                  })
                  .catch(e => console.log("getCommentsErr: " + e));
              })
              .catch(e => {
                console.log(e);
                c.style.cursor = "default";
              });
            addComment = false;
          }
        }
      });
    };
    var keyboard = new Modelo.View.Input.Keyboard(viewer); // Add keyboard callback.
    viewer.addInput(keyboard);
    var parentWrapper = document.getElementsByClassName("wrapper")[0];
    // get comments to display
    Modelo.Comment.get(modelId)
      .then(comments => {
        for (let i = 0; i < comments.length; i++) {
          generateCard(comments, i);
        }
      })
      .catch(e => console.log("getCommentsErr: " + e));
    console.log("done");
  });

// delete comment
var deleteComment = commentId => {
  Modelo.Comment.remove(commentId)
    .then(commentId => {
      var parentWrapper = document.getElementsByClassName("wrapper")[0];
      var currentComment = document.getElementById(commentId);
      parentWrapper.removeChild(currentComment);
      console.log(commentId + "comment deleted");
    })
    .catch(e => console.log("DeleteErr: " + e));
};
// update comment
var updateComment = (commentId, extData) => {
  Modelo.Comment.update(commentId, extData)
    .then(commentId => {
      console.log(commentId + "comment updated");
    })
    .catch(e => console.log("updateErr:" + e));
};
// activate comment
var activateComment = commentId => {
  Modelo.Comment.activate(commentId);
};
// generate comments card
function generateCard(comments, i) {
  var parentWrapper = document.getElementsByClassName("wrapper")[0];
  var divUiMessage = document.createElement("div");
  divUiMessage.id = comments[i].id;
  divUiMessage.className = "ui message";
  divUiMessage.style.marginTop = "5px";
  divUiMessage.style.marginBottom = "5px";
  divUiMessage.onclick = () => {
    activateComment(comments[i].id);
  };
  var divHeader = document.createElement("div");
  divHeader.className = "header";
  divHeader.innerHTML = "ID:" + comments[i].id;
  var divUiList = document.createElement("div");
  divUiList.className = "ui list";
  var itemMessage = document.createElement("div");
  itemMessage.className = "item";
  itemMessage.innerHTML = "Message:";
  var inputMessageWrapper = document.createElement("div");
  inputMessageWrapper.className = "ui mini input";
  inputMessageWrapper.style.fontSize = "1rem";
  var inputMessage = document.createElement("input");
  inputMessage.value = comments[i].extData.message;
  var itemCreateAt = document.createElement("div");
  itemCreateAt.style.marginTop = "10px";
  itemCreateAt.className = "item";
  var stopIndex = comments[i].createdAt.indexOf("GMT");
  itemCreateAt.innerHTML = "CreatedAt: " + comments[i].createdAt.substring(0, stopIndex - 9);
  var deleteBtn = document.createElement("button");
  deleteBtn.className = "mini ui red button";
  deleteBtn.innerHTML = "Delete";
  deleteBtn.onclick = e => {
    var currentCommentId = comments[i].id;
    deleteComment(currentCommentId);
    e.stopPropagation();
  };
  var updateBtn = document.createElement("button");
  updateBtn.className = "mini ui blue button";
  updateBtn.innerHTML = "Update";
  updateBtn.style.marginLeft = "74px";
  updateBtn.onclick = () => {
    var currentCommentId = comments[i].id;
    var currentMessage = updateBtn.parentNode.childNodes[1].childNodes[1].firstElementChild.value;
    comments[i].extData.message = currentMessage;
    updateComment(currentCommentId, comments[i].extData);
  };
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
