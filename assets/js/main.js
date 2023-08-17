const name = document.querySelector(".name");
const postComment = document.querySelector(".postComment");
const container = document.querySelector(".container");
const activeUserDiv = document.querySelector(".activeUser");
const activeCommentsDiv = document.querySelector(".showComments");

activeCommentsDiv.addEventListener("click", deleteCommentsUser);
activeUserDiv.addEventListener("click", deleteShowUser);

container.addEventListener("click", (e) => {
    if (e.target.classList.contains("userBtn")) {
        showUser(e.target.id);
    } else {
        showComments(e);
    }
});

let allUsers;
let allComments

async function fetchData(url) {
    const response = await fetch(url);
    return response.json();
}

async function initializeData() {
    try {
        allComments = await fetchData('https://jsonplaceholder.typicode.com/comments');
        allUsers = await fetchData('https://jsonplaceholder.typicode.com/users');
        const posts = await fetchData('https://jsonplaceholder.typicode.com/posts');
        addPost(posts);
    } catch (error) {
        console.error('404 Error Found', error);
    }
}

function addPost(posts) {
    let veriableUserName = "";
    let value = 0;
    posts.forEach((post) => {
        const user = allUsers.find((u) => u.id === post.userId);
        const postElement = document.createElement("div");
        postElement.classList.add("post");
        postElement.innerHTML = `
            <div class="name">
                <h2>${user.name}</h2>
            </div>
            <div class="postComment">
                <h4>${post.body}</h4>
            </div>
            <div class="stats">
                <div class="userStats">
                    <img src="assets/image/icons8-user-32.png" alt="" class="userBtn" id="${user.name}">
                </div>
                <div class="comments">
                    <img src="assets/image/icons8-comments-32.png" class="commentsBtn" id="${post.id}" alt="">
                </div>
            </div>`;

        if (veriableUserName === user.name) {
            value++;
        }
        veriableUserName = user.name;
        container.appendChild(postElement);
    });
}

function showUser(eventName) {
    const activeUser = allUsers.find((user) => user.name === eventName);

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
    if (e.target.classList.contains("cancelBtn")) {
        activeUserDiv.innerHTML = "";
    }
}

function deleteCommentsUser(e) {
    if (e.target.classList.contains("cancelBtn")) {
        activeCommentsDiv.innerHTML = "";
    }
}

function showComments(e) {
    const postId = e.target.id;
    const activeComments = allComments.filter((comment) => comment.postId == postId);

    const commentsHTML = activeComments.map((comment) => `
        <div class="comment">
            <div class="cancelBtn">✗</div>
            <div class="name">
                Name <h4>${comment.name}</h4>
            </div>
            <div class="commentBody">
                Comment <h5>${comment.body}</h5>
            </div>
        </div>`).join('');

    activeCommentsDiv.innerHTML = commentsHTML;
}

initializeData();
