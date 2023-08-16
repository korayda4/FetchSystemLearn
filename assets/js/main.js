const name = document.querySelector(".name");
const postComment = document.querySelector(".postComment");
const container = document.querySelector(".container");
const activeUserDiv = document.querySelector(".activeUser");
const activeCommentsDiv = document.querySelector(".showComments");

activeCommentsDiv.addEventListener("click", deleteCommentsUser);
activeUserDiv.addEventListener("click", deleteShowUser);

container.addEventListener("click", (e) => {
    if (e.target.className === "userBtn") {
        showUser(e.target.id);
    } else {
        showComments(e);
    }
});

let AllUser;
let AllComments;

fetch('https://jsonplaceholder.typicode.com/comments')
    .then(response => response.json())
    .then(comments => {
        AllComments = comments;
        return fetch('https://jsonplaceholder.typicode.com/users');
    })
    .then(response => response.json())
    .then(users => {
        AllUser = users;
        return fetch('https://jsonplaceholder.typicode.com/posts');
    })
    .then(response => response.json())
    .then(posts => {
        addPost(posts);
    });

function addPost(posts) {
    let valueName;
    let value = 0;

    posts.forEach((element) => {
        const userName = AllUser.find((x) => x.id === element.userId);

        container.innerHTML += `
            <div class="post">
                <div class="name">
                    <h2>${userName.name}</h2>
                </div>
                <div class="postComment">
                    <h4>${element.body}</h4>
                </div>
                <div class="stats">
                    <div class="userStats">
                        <img src="assets/image/icons8-user-32.png" alt="" class="userBtn" id="${userName.name}">
                    </div>
                    <div class="comments">
                        <img src="assets/image/icons8-comments-32.png" class="commentsBtn" id="${element.id}" alt="">
                    </div>
                </div>
            </div>`;

        if (valueName === userName.name) {
            value++;
        }
        valueName = userName.name;
    });
}

function showUser(event) {
    let activeUser = AllUser.find((x) => x.name === event);

    activeUserDiv.innerHTML = `
        <div class="showUser">
            <div class="cancelBtn">✗</div>
            <div class="ustDiv">
                <img src="assets/image/icons8-user-32.png" alt="">
                <div class="userName">
                    Name: <h2>${activeUser.name}</h2>
                </div>
                <div class="userPhone">
                    Phone: <h2>${activeUser.phone}</h2>
                </div>
            </div>
            <div class="altDiv">
                <div class="userAdress">
                    Address: <h2>${activeUser.address.city}</h2>
                </div>
                <div class="userWebsite">
                    WebSite: <h2>${activeUser.website}</h2>
                </div>
            </div>
        </div>`;
}

function deleteShowUser(e) {
    if (e.target.className === "cancelBtn") {
        activeUserDiv.innerHTML = "";
    }
}

function deleteCommentsUser(e) {
    if (e.target.className === "cancelBtn") {
        activeCommentsDiv.innerHTML = "";
    }
}

function showComments(e) {
    console.log(e.target.id);
    let activeComments = AllComments.filter((x) => x.postId == e.target.id);

    let commentsHTML = "";

    activeComments.forEach((x) => {
        commentsHTML += `
            <div class="comment">
                <div class="cancelBtn">✗</div>
                <div class="name">
                    <h3>${x.name}</h3>
                </div>
                <div class="commentBody">
                    <h5>${x.body}</h5>
                </div>
            </div>`;
    });

    activeCommentsDiv.innerHTML = commentsHTML;
}
