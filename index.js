let users = JSON.parse(localStorage.getItem('users')) || [];
let posts = JSON.parse(localStorage.getItem('posts')) || [];
let currentUser = null;
function renderSignUpForm() {
    document.getElementById('sign-up-form').classList.add('show');
    document.getElementById('log-in-form').classList.remove('show');
}

function renderLogInForm() {
    document.getElementById('log-in-form').classList.add('show');
    document.getElementById('sign-up-form').classList.remove('show');
}

function handleSignUp(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (username && password) {
        const user = { username, password };
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        renderLogInForm();
        document.getElementById('sign-up-form').reset();
    }
}

function handleLogIn(event) {
    event.preventDefault();
    const username = document.getElementById('log-in-username').value;
    const password = document.getElementById('log-in-password').value;
    if (username && password) {
        const user = users.find((user) => user.username === username && user.password === password);
        if (user) {
            currentUser = user;
            document.getElementById('container').style.display = 'none';
            document.getElementById('post-container').style.display = 'block';
            renderPosts();
        }
    }
}

function renderPosts() {
    const postsContainer = document.getElementById('posts-container');
    postsContainer.innerHTML = '';
    posts.forEach((post, index) => {
        const postHTML = `
            <div class="post">
                <h2>${post.title}</h2>
                <p>${post.content}</p>
                <button class="edit-btn" data-index="${index}">Edit</button>
                <button class="delete-btn" data-index="${index}">Delete</button>
            </div>
        `;
        postsContainer.insertAdjacentHTML('beforeend', postHTML);
    });
}

function handleSubmit(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    if (title && content) {
        const newPost = { title, content, user: currentUser.username };
        posts.push(newPost);
        localStorage.setItem('posts', JSON.stringify(posts));
        renderPosts();
        document.getElementById('post-form').reset();
    }
}

function handleEditPost(index) {
    const post = posts[index];
    const title = prompt('Enter new title:', post.title);
    const content = prompt('Enter new content:', post.content);
    if (title && content) {
        post.title = title;
        post.content = content;
        localStorage.setItem('posts', JSON.stringify(posts));
        renderPosts();
    }
}

function handleDeletePost(index) {
    posts.splice(index, 1);
    localStorage.setItem('posts', JSON.stringify(posts));
    renderPosts();
}

document.getElementById('sign-up-btn').addEventListener('click', handleSignUp);
document.getElementById('log-in-btn').addEventListener('click', handleLogIn);
document.getElementById('submit-btn').addEventListener('click', handleSubmit);

document.addEventListener('click', (event) => {
    if (event.target.classList.contains('edit-btn')) {
        const index = event.target.dataset.index;
        handleEditPost(index);
    } else if (event.target.classList.contains('delete-btn')) {
        const index = event.target.dataset.index;
        handleDeletePost(index);
    }
});
renderSignUpForm();