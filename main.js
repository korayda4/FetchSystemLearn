const posts = document.querySelector(".posts")
const stats = document.querySelector(".stats")
const columnMenu = document.querySelector(".columnMenu")



fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(json => {
        json.forEach(element => {
            posts.innerHTML += `<div class="post">
            <div class="title">
                ${element.title}
            </div>
            <div class="id">
                ${element.userId}
            </div>
                
            <div class="stats">
                Bilgileri getir
            </div>
          </div>`
        });
      })

let newUser;
let newStats; 

posts.addEventListener("click",getStats)

function getStats(a) {
    if(a.target.className === "stats"){
       let myId  = a.target.parentElement.children[1].textContent.trim()
      fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(json => {
        newUser = json.find((x) => x.id == myId)
        
    }) 
    fetch('https://jsonplaceholder.typicode.com/comments')
      .then(response => response.json())
      .then(json => {
        newStats = json.find((x) => x.id == myId)
        stats(newUser.name,newUser.email,newUser.phone,newStats.body)
    }) 
    }

const stats = (name,email,phone,body) => {
    columnMenu.innerHTML = `<div class="user">
            <div class="name">
                Name: ${name}
            </div>
            <div class="userContainer">
                <div class="email">
                    Email: ${email}
                </div>
                <div class="phone">
                   Number: ${phone}
                </div>
                
            </div>
            
            <div class="bodyStats"> 
                <div class="ustdiv">
                    Comments
                </div>
                ${body}
            </div>
        </div>`
}
        
    
};
