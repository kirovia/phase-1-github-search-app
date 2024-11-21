
// GLOBAL VARIABLES

const form = document.querySelector('#github-form');
const input = document.querySelector('#search');
const submit = document.querySelector('#submit');
const container = document.querySelector('#github-container');
const userList = document.querySelector('#user-list');
const reposList = document.querySelector('#repos-list');

// FORM FUNCTIONALITY

form.addEventListener('submit', formSubmit)

function formSubmit(e) {
    e.preventDefault();
    const userInput = input.value;
    
    fetch(`https://api.github.com/search/users?q=${userInput}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.github.v3+json'
        }
    })
        .then(resp => resp.json())
        .then(data => {
            data.items.forEach(i => {
                const userLi = document.createElement('li');
                const userName = document.createElement('p');
                userName.innerText = i.login;
                const userImg = document.createElement('img');
                userImg.src = `${i['avatar_url']}`;
                userImg.addEventListener('click', () => {
                    fetch(`https://api.github.com/users/${i.login}/repos`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/vnd.github.v3+json'
                        }
                    })
                        .then(resp => resp.json())
                        .then(data => {
                            reposList.innerHTML = '';
                            data.forEach(i => {
                                const li = document.createElement('li');
                                li.innerText = `${i.name}`;
                                reposList.append(li);
                            })
                        })
                });
                const userLink = document.createElement('a');
                userLink.href = `${i['html_url']}`;
                userLink.innerText = `visit ${i.login}'s page`;
                userLi.append(userName, userImg, userLink);
                userList.append(userLi);
            })
        });
};

function grabRepos(user) {
    fetch(``)
}