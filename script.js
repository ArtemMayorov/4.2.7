

const listForCards = document.querySelector('.list');
const cardList = document.querySelector('.list');
const searchForm = document.querySelector('.search');
const searchField = document.querySelector('.search__field');

let repositArray = [];

// навесим слушатели на весь блок и будем отсеживать нажатия
// на автодополнения
// searchForm.addEventListener('mouseover', addCard)
// добавление карточки 
searchForm.addEventListener('click', addCard)
function addCard(event) {

    if(event.target.className === 'search__option'){
        let count = 0;
        
        repositArray.forEach(repo => {
            if(repo['name'] === event.target.textContent 
               && count === 0) {
                count++
                listForCards.append(createCard(
                    repo['name'],
                    repo['owner']['login'],
                    repo['stargazers_count']
                    ))
            }

        })   
        count = 0;
    }
}


// получает репозитории и передает в асинхронную функцию createSearchOption
async function getRepos (value) {
    return await fetch(`https://api.github.com/search/repositories?q=${value}&per_page=5`)
    .then(res => {
        return res.json()
    })
    .then((res) => {
        res.items.forEach(elem => {
            createSearchOption(elem)
        })
    })
    .catch(error => {
        console.log(error.message);
    })
}


 function createSearchOption(answer){
     repositArray.push(answer)
    let fragment = new DocumentFragment();
    // <div class="search__option">Redux</div> x 1
        const option = document.createElement('div');
        option.classList.add('search__option');
        option.textContent = `${answer.name}`
        fragment.appendChild(option)
    return searchForm.append(fragment)
}

async function checkSearchStatus(event){
    let evTar = event.target;
    let evType = event.type;
    let evClassName = event.target.className;
    const val = evTar.value;
    if(evTar.value !== '') {
        sendRequest(clearOptions,val)
    }
    if(event.relatedTarget !== null && (evType === 'focusout' || evTar.value === '') ) {
       clearOptions();
    }
}

searchField.addEventListener('focus',checkSearchStatus);
searchField.addEventListener('focusout',checkSearchStatus);
searchField.addEventListener('keyup',checkSearchStatus);
searchField.addEventListener('mouseout',checkSearchStatus);




function clearOptions(){
    repositArray = []
    document.querySelectorAll('.search__option')
    .forEach(elem => elem.remove());
}


const debounce = (fn, ms) => {
    let timeout;
    return function () {
      const fnCall = () => { fn.apply(this, arguments) }
      clearTimeout(timeout);
      timeout = setTimeout(fnCall, ms)
    };
  }
async function sendReq(clearFn, val) {
    clearFn();
    await getRepos(val)
}

const sendRequest = debounce(sendReq,1001);



cardList.addEventListener('click',deleteCard);

function createCard(name, owner, stars){
         // <div class="list__card">
         const lisrCard = document.createElement('div');
         lisrCard.classList.add('list__card');
         // <div class="user">
         const user = document.createElement('div');
         user.classList.add('user');
         // <p class="card__name">Name: react</p>
         const cardName = document.createElement('p');
         cardName.classList.add('card__name');
         cardName.textContent = `Name: ${name}`;
         user.append(cardName);
         //<p class="card__owner">Owner: facebook</p>
         const cardOwner = document.createElement('p');
         cardOwner.classList.add('card__owner');
         cardOwner.textContent = `Owner: ${owner}`;
         user.append(cardOwner);
         //<p class="card__stars">Stars: 12343</p>
         const cardStars = document.createElement('p');
         cardStars.classList.add('card__owner');
         cardStars.textContent = `Stars: ${stars}`;
         user.append(cardStars);
         // <button class="card__close" type="button"></button>
         const btn = document.createElement('button');
         btn.classList.add('card__close');
         btn.setAttribute('type', 'button');
         
         lisrCard.append(user);
         lisrCard.appendChild(btn)
    
         return lisrCard;
    }
    
    function deleteCard(event){
        const closeClick = event.target.className;
        if(closeClick !== 'card__close') return;
        const card = event.target.closest('.list__card');
        card.remove()
    };
    









const test = 
    {
        "total_count": 707561,
        "incomplete_results": false,
        "items": [
          {
            "id": 11730342,
            "node_id": "MDEwOlJlcG9zaXRvcnkxMTczMDM0Mg==",
            "name": "vue",
            "full_name": "vuejs/vue",
            "private": false,
            "owner": {
              "login": "vuejs",
              "id": 6128107,
              "node_id": "MDEyOk9yZ2FuaXphdGlvbjYxMjgxMDc=",
              "avatar_url": "https://avatars.githubusercontent.com/u/6128107?v=4",
              "gravatar_id": "",
              "url": "https://api.github.com/users/vuejs",
              "html_url": "https://github.com/vuejs",
              "followers_url": "https://api.github.com/users/vuejs/followers",
              "following_url": "https://api.github.com/users/vuejs/following{/other_user}",
              "gists_url": "https://api.github.com/users/vuejs/gists{/gist_id}",
              "starred_url": "https://api.github.com/users/vuejs/starred{/owner}{/repo}",
              "subscriptions_url": "https://api.github.com/users/vuejs/subscriptions",
              "organizations_url": "https://api.github.com/users/vuejs/orgs",
              "repos_url": "https://api.github.com/users/vuejs/repos",
              "events_url": "https://api.github.com/users/vuejs/events{/privacy}",
              "received_events_url": "https://api.github.com/users/vuejs/received_events",
              "type": "Organization",
              "site_admin": false
            },
            "html_url": "https://github.com/vuejs/vue",
            "description": "🖖 Vue.js is a progressive, incrementally-adoptable JavaScript framework for building UI on the web.",
            "fork": false,
            "url": "https://api.github.com/repos/vuejs/vue",
            "forks_url": "https://api.github.com/repos/vuejs/vue/forks",
            "keys_url": "https://api.github.com/repos/vuejs/vue/keys{/key_id}",
            "collaborators_url": "https://api.github.com/repos/vuejs/vue/collaborators{/collaborator}",
            "teams_url": "https://api.github.com/repos/vuejs/vue/teams",
            "hooks_url": "https://api.github.com/repos/vuejs/vue/hooks",
            "issue_events_url": "https://api.github.com/repos/vuejs/vue/issues/events{/number}",
            "events_url": "https://api.github.com/repos/vuejs/vue/events",
            "assignees_url": "https://api.github.com/repos/vuejs/vue/assignees{/user}",
            "branches_url": "https://api.github.com/repos/vuejs/vue/branches{/branch}",
            "tags_url": "https://api.github.com/repos/vuejs/vue/tags",
            "blobs_url": "https://api.github.com/repos/vuejs/vue/git/blobs{/sha}",
            "git_tags_url": "https://api.github.com/repos/vuejs/vue/git/tags{/sha}",
            "git_refs_url": "https://api.github.com/repos/vuejs/vue/git/refs{/sha}",
            "trees_url": "https://api.github.com/repos/vuejs/vue/git/trees{/sha}",
            "statuses_url": "https://api.github.com/repos/vuejs/vue/statuses/{sha}",
            "languages_url": "https://api.github.com/repos/vuejs/vue/languages",
            "stargazers_url": "https://api.github.com/repos/vuejs/vue/stargazers",
            "contributors_url": "https://api.github.com/repos/vuejs/vue/contributors",
            "subscribers_url": "https://api.github.com/repos/vuejs/vue/subscribers",
            "subscription_url": "https://api.github.com/repos/vuejs/vue/subscription",
            "commits_url": "https://api.github.com/repos/vuejs/vue/commits{/sha}",
            "git_commits_url": "https://api.github.com/repos/vuejs/vue/git/commits{/sha}",
            "comments_url": "https://api.github.com/repos/vuejs/vue/comments{/number}",
            "issue_comment_url": "https://api.github.com/repos/vuejs/vue/issues/comments{/number}",
            "contents_url": "https://api.github.com/repos/vuejs/vue/contents/{+path}",
            "compare_url": "https://api.github.com/repos/vuejs/vue/compare/{base}...{head}",
            "merges_url": "https://api.github.com/repos/vuejs/vue/merges",
            "archive_url": "https://api.github.com/repos/vuejs/vue/{archive_format}{/ref}",
            "downloads_url": "https://api.github.com/repos/vuejs/vue/downloads",
            "issues_url": "https://api.github.com/repos/vuejs/vue/issues{/number}",
            "pulls_url": "https://api.github.com/repos/vuejs/vue/pulls{/number}",
            "milestones_url": "https://api.github.com/repos/vuejs/vue/milestones{/number}",
            "notifications_url": "https://api.github.com/repos/vuejs/vue/notifications{?since,all,participating}",
            "labels_url": "https://api.github.com/repos/vuejs/vue/labels{/name}",
            "releases_url": "https://api.github.com/repos/vuejs/vue/releases{/id}",
            "deployments_url": "https://api.github.com/repos/vuejs/vue/deployments",
            "created_at": "2013-07-29T03:24:51Z",
            "updated_at": "2022-05-09T15:20:16Z",
            "pushed_at": "2022-05-05T12:39:55Z",
            "git_url": "git://github.com/vuejs/vue.git",
            "ssh_url": "git@github.com:vuejs/vue.git",
            "clone_url": "https://github.com/vuejs/vue.git",
            "svn_url": "https://github.com/vuejs/vue",
            "homepage": "http://vuejs.org",
            "size": 27949,
            "stargazers_count": 195614,
            "watchers_count": 195614,
            "language": "JavaScript",
            "has_issues": true,
            "has_projects": true,
            "has_downloads": true,
            "has_wiki": true,
            "has_pages": false,
            "forks_count": 32076,
            "mirror_url": null,
            "archived": false,
            "disabled": false,
            "open_issues_count": 572,
            "license": {
              "key": "mit",
              "name": "MIT License",
              "spdx_id": "MIT",
              "url": "https://api.github.com/licenses/mit",
              "node_id": "MDc6TGljZW5zZTEz"
            },
            "allow_forking": true,
            "is_template": false,
            "topics": [
              "framework",
              "frontend",
              "javascript",
              "vue"
            ],
            "visibility": "public",
            "forks": 32076,
            "open_issues": 572,
            "watchers": 195614,
            "default_branch": "dev",
            "score": 1.0
          },
          {
            "id": 178124673,
            "node_id": "MDEwOlJlcG9zaXRvcnkxNzgxMjQ2NzM=",
            "name": "vue",
            "full_name": "qq281113270/vue",
            "private": false,
            "owner": {
              "login": "qq281113270",
              "id": 20044598,
              "node_id": "MDQ6VXNlcjIwMDQ0NTk4",
              "avatar_url": "https://avatars.githubusercontent.com/u/20044598?v=4",
              "gravatar_id": "",
              "url": "https://api.github.com/users/qq281113270",
              "html_url": "https://github.com/qq281113270",
              "followers_url": "https://api.github.com/users/qq281113270/followers",
              "following_url": "https://api.github.com/users/qq281113270/following{/other_user}",
              "gists_url": "https://api.github.com/users/qq281113270/gists{/gist_id}",
              "starred_url": "https://api.github.com/users/qq281113270/starred{/owner}{/repo}",
              "subscriptions_url": "https://api.github.com/users/qq281113270/subscriptions",
              "organizations_url": "https://api.github.com/users/qq281113270/orgs",
              "repos_url": "https://api.github.com/users/qq281113270/repos",
              "events_url": "https://api.github.com/users/qq281113270/events{/privacy}",
              "received_events_url": "https://api.github.com/users/qq281113270/received_events",
              "type": "User",
              "site_admin": false
            },
            "html_url": "https://github.com/qq281113270/vue",
            "description": "vue源码逐行注释分析+40多m的vue源码程序流程图思维导图",
            "fork": false,
            "url": "https://api.github.com/repos/qq281113270/vue",
            "forks_url": "https://api.github.com/repos/qq281113270/vue/forks",
            "keys_url": "https://api.github.com/repos/qq281113270/vue/keys{/key_id}",
            "collaborators_url": "https://api.github.com/repos/qq281113270/vue/collaborators{/collaborator}",
            "teams_url": "https://api.github.com/repos/qq281113270/vue/teams",
            "hooks_url": "https://api.github.com/repos/qq281113270/vue/hooks",
            "issue_events_url": "https://api.github.com/repos/qq281113270/vue/issues/events{/number}",
            "events_url": "https://api.github.com/repos/qq281113270/vue/events",
            "assignees_url": "https://api.github.com/repos/qq281113270/vue/assignees{/user}",
            "branches_url": "https://api.github.com/repos/qq281113270/vue/branches{/branch}",
            "tags_url": "https://api.github.com/repos/qq281113270/vue/tags",
            "blobs_url": "https://api.github.com/repos/qq281113270/vue/git/blobs{/sha}",
            "git_tags_url": "https://api.github.com/repos/qq281113270/vue/git/tags{/sha}",
            "git_refs_url": "https://api.github.com/repos/qq281113270/vue/git/refs{/sha}",
            "trees_url": "https://api.github.com/repos/qq281113270/vue/git/trees{/sha}",
            "statuses_url": "https://api.github.com/repos/qq281113270/vue/statuses/{sha}",
            "languages_url": "https://api.github.com/repos/qq281113270/vue/languages",
            "stargazers_url": "https://api.github.com/repos/qq281113270/vue/stargazers",
            "contributors_url": "https://api.github.com/repos/qq281113270/vue/contributors",
            "subscribers_url": "https://api.github.com/repos/qq281113270/vue/subscribers",
            "subscription_url": "https://api.github.com/repos/qq281113270/vue/subscription",
            "commits_url": "https://api.github.com/repos/qq281113270/vue/commits{/sha}",
            "git_commits_url": "https://api.github.com/repos/qq281113270/vue/git/commits{/sha}",
            "comments_url": "https://api.github.com/repos/qq281113270/vue/comments{/number}",
            "issue_comment_url": "https://api.github.com/repos/qq281113270/vue/issues/comments{/number}",
            "contents_url": "https://api.github.com/repos/qq281113270/vue/contents/{+path}",
            "compare_url": "https://api.github.com/repos/qq281113270/vue/compare/{base}...{head}",
            "merges_url": "https://api.github.com/repos/qq281113270/vue/merges",
            "archive_url": "https://api.github.com/repos/qq281113270/vue/{archive_format}{/ref}",
            "downloads_url": "https://api.github.com/repos/qq281113270/vue/downloads",
            "issues_url": "https://api.github.com/repos/qq281113270/vue/issues{/number}",
            "pulls_url": "https://api.github.com/repos/qq281113270/vue/pulls{/number}",
            "milestones_url": "https://api.github.com/repos/qq281113270/vue/milestones{/number}",
            "notifications_url": "https://api.github.com/repos/qq281113270/vue/notifications{?since,all,participating}",
            "labels_url": "https://api.github.com/repos/qq281113270/vue/labels{/name}",
            "releases_url": "https://api.github.com/repos/qq281113270/vue/releases{/id}",
            "deployments_url": "https://api.github.com/repos/qq281113270/vue/deployments",
            "created_at": "2019-03-28T04:12:19Z",
            "updated_at": "2022-05-09T15:16:56Z",
            "pushed_at": "2022-04-20T10:59:32Z",
            "git_url": "git://github.com/qq281113270/vue.git",
            "ssh_url": "git@github.com:qq281113270/vue.git",
            "clone_url": "https://github.com/qq281113270/vue.git",
            "svn_url": "https://github.com/qq281113270/vue",
            "homepage": "",
            "size": 2474,
            "stargazers_count": 4669,
            "watchers_count": 4669,
            "language": "JavaScript",
            "has_issues": true,
            "has_projects": true,
            "has_downloads": true,
            "has_wiki": true,
            "has_pages": false,
            "forks_count": 1405,
            "mirror_url": null,
            "archived": false,
            "disabled": false,
            "open_issues_count": 15,
            "license": null,
            "allow_forking": true,
            "is_template": false,
            "topics": [
      
            ],
            "visibility": "public",
            "forks": 1405,
            "open_issues": 15,
            "watchers": 4669,
            "default_branch": "master",
            "score": 1.0
          },
          {
            "id": 77189043,
            "node_id": "MDEwOlJlcG9zaXRvcnk3NzE4OTA0Mw==",
            "name": "vue2-elm",
            "full_name": "bailicangdu/vue2-elm",
            "private": false,
            "owner": {
              "login": "bailicangdu",
              "id": 20297227,
              "node_id": "MDQ6VXNlcjIwMjk3MjI3",
              "avatar_url": "https://avatars.githubusercontent.com/u/20297227?v=4",
              "gravatar_id": "",
              "url": "https://api.github.com/users/bailicangdu",
              "html_url": "https://github.com/bailicangdu",
              "followers_url": "https://api.github.com/users/bailicangdu/followers",
              "following_url": "https://api.github.com/users/bailicangdu/following{/other_user}",
              "gists_url": "https://api.github.com/users/bailicangdu/gists{/gist_id}",
              "starred_url": "https://api.github.com/users/bailicangdu/starred{/owner}{/repo}",
              "subscriptions_url": "https://api.github.com/users/bailicangdu/subscriptions",
              "organizations_url": "https://api.github.com/users/bailicangdu/orgs",
              "repos_url": "https://api.github.com/users/bailicangdu/repos",
              "events_url": "https://api.github.com/users/bailicangdu/events{/privacy}",
              "received_events_url": "https://api.github.com/users/bailicangdu/received_events",
              "type": "User",
              "site_admin": false
            },
            "html_url": "https://github.com/bailicangdu/vue2-elm",
            "description": "基于 vue2 + vuex 构建一个具有 45 个页面的大型单页面应用",
            "fork": false,
            "url": "https://api.github.com/repos/bailicangdu/vue2-elm",
            "forks_url": "https://api.github.com/repos/bailicangdu/vue2-elm/forks",
            "keys_url": "https://api.github.com/repos/bailicangdu/vue2-elm/keys{/key_id}",
            "collaborators_url": "https://api.github.com/repos/bailicangdu/vue2-elm/collaborators{/collaborator}",
            "teams_url": "https://api.github.com/repos/bailicangdu/vue2-elm/teams",
            "hooks_url": "https://api.github.com/repos/bailicangdu/vue2-elm/hooks",
            "issue_events_url": "https://api.github.com/repos/bailicangdu/vue2-elm/issues/events{/number}",
            "events_url": "https://api.github.com/repos/bailicangdu/vue2-elm/events",
            "assignees_url": "https://api.github.com/repos/bailicangdu/vue2-elm/assignees{/user}",
            "branches_url": "https://api.github.com/repos/bailicangdu/vue2-elm/branches{/branch}",
            "tags_url": "https://api.github.com/repos/bailicangdu/vue2-elm/tags",
            "blobs_url": "https://api.github.com/repos/bailicangdu/vue2-elm/git/blobs{/sha}",
            "git_tags_url": "https://api.github.com/repos/bailicangdu/vue2-elm/git/tags{/sha}",
            "git_refs_url": "https://api.github.com/repos/bailicangdu/vue2-elm/git/refs{/sha}",
            "trees_url": "https://api.github.com/repos/bailicangdu/vue2-elm/git/trees{/sha}",
            "statuses_url": "https://api.github.com/repos/bailicangdu/vue2-elm/statuses/{sha}",
            "languages_url": "https://api.github.com/repos/bailicangdu/vue2-elm/languages",
            "stargazers_url": "https://api.github.com/repos/bailicangdu/vue2-elm/stargazers",
            "contributors_url": "https://api.github.com/repos/bailicangdu/vue2-elm/contributors",
            "subscribers_url": "https://api.github.com/repos/bailicangdu/vue2-elm/subscribers",
            "subscription_url": "https://api.github.com/repos/bailicangdu/vue2-elm/subscription",
            "commits_url": "https://api.github.com/repos/bailicangdu/vue2-elm/commits{/sha}",
            "git_commits_url": "https://api.github.com/repos/bailicangdu/vue2-elm/git/commits{/sha}",
            "comments_url": "https://api.github.com/repos/bailicangdu/vue2-elm/comments{/number}",
            "issue_comment_url": "https://api.github.com/repos/bailicangdu/vue2-elm/issues/comments{/number}",
            "contents_url": "https://api.github.com/repos/bailicangdu/vue2-elm/contents/{+path}",
            "compare_url": "https://api.github.com/repos/bailicangdu/vue2-elm/compare/{base}...{head}",
            "merges_url": "https://api.github.com/repos/bailicangdu/vue2-elm/merges",
            "archive_url": "https://api.github.com/repos/bailicangdu/vue2-elm/{archive_format}{/ref}",
            "downloads_url": "https://api.github.com/repos/bailicangdu/vue2-elm/downloads",
            "issues_url": "https://api.github.com/repos/bailicangdu/vue2-elm/issues{/number}",
            "pulls_url": "https://api.github.com/repos/bailicangdu/vue2-elm/pulls{/number}",
            "milestones_url": "https://api.github.com/repos/bailicangdu/vue2-elm/milestones{/number}",
            "notifications_url": "https://api.github.com/repos/bailicangdu/vue2-elm/notifications{?since,all,participating}",
            "labels_url": "https://api.github.com/repos/bailicangdu/vue2-elm/labels{/name}",
            "releases_url": "https://api.github.com/repos/bailicangdu/vue2-elm/releases{/id}",
            "deployments_url": "https://api.github.com/repos/bailicangdu/vue2-elm/deployments",
            "created_at": "2016-12-23T01:49:20Z",
            "updated_at": "2022-05-09T14:22:59Z",
            "pushed_at": "2022-03-17T05:28:09Z",
            "git_url": "git://github.com/bailicangdu/vue2-elm.git",
            "ssh_url": "git@github.com:bailicangdu/vue2-elm.git",
            "clone_url": "https://github.com/bailicangdu/vue2-elm.git",
            "svn_url": "https://github.com/bailicangdu/vue2-elm",
            "homepage": "",
            "size": 34427,
            "stargazers_count": 37970,
            "watchers_count": 37970,
            "language": "Vue",
            "has_issues": true,
            "has_projects": true,
            "has_downloads": true,
            "has_wiki": true,
            "has_pages": false,
            "forks_count": 12218,
            "mirror_url": null,
            "archived": false,
            "disabled": false,
            "open_issues_count": 95,
            "license": {
              "key": "gpl-2.0",
              "name": "GNU General Public License v2.0",
              "spdx_id": "GPL-2.0",
              "url": "https://api.github.com/licenses/gpl-2.0",
              "node_id": "MDc6TGljZW5zZTg="
            },
            "allow_forking": true,
            "is_template": false,
            "topics": [
              "es2015",
              "flex",
              "sass",
              "vue",
              "vue-router",
              "vuex",
              "webpack"
            ],
            "visibility": "public",
            "forks": 12218,
            "open_issues": 95,
            "watchers": 37970,
            "default_branch": "master",
            "score": 1.0
          },
          {
            "id": 39176269,
            "node_id": "MDEwOlJlcG9zaXRvcnkzOTE3NjI2OQ==",
            "name": "vuex",
            "full_name": "vuejs/vuex",
            "private": false,
            "owner": {
              "login": "vuejs",
              "id": 6128107,
              "node_id": "MDEyOk9yZ2FuaXphdGlvbjYxMjgxMDc=",
              "avatar_url": "https://avatars.githubusercontent.com/u/6128107?v=4",
              "gravatar_id": "",
              "url": "https://api.github.com/users/vuejs",
              "html_url": "https://github.com/vuejs",
              "followers_url": "https://api.github.com/users/vuejs/followers",
              "following_url": "https://api.github.com/users/vuejs/following{/other_user}",
              "gists_url": "https://api.github.com/users/vuejs/gists{/gist_id}",
              "starred_url": "https://api.github.com/users/vuejs/starred{/owner}{/repo}",
              "subscriptions_url": "https://api.github.com/users/vuejs/subscriptions",
              "organizations_url": "https://api.github.com/users/vuejs/orgs",
              "repos_url": "https://api.github.com/users/vuejs/repos",
              "events_url": "https://api.github.com/users/vuejs/events{/privacy}",
              "received_events_url": "https://api.github.com/users/vuejs/received_events",
              "type": "Organization",
              "site_admin": false
            },
            "html_url": "https://github.com/vuejs/vuex",
            "description": "🗃️ Centralized State Management for Vue.js.",
            "fork": false,
            "url": "https://api.github.com/repos/vuejs/vuex",
            "forks_url": "https://api.github.com/repos/vuejs/vuex/forks",
            "keys_url": "https://api.github.com/repos/vuejs/vuex/keys{/key_id}",
            "collaborators_url": "https://api.github.com/repos/vuejs/vuex/collaborators{/collaborator}",
            "teams_url": "https://api.github.com/repos/vuejs/vuex/teams",
            "hooks_url": "https://api.github.com/repos/vuejs/vuex/hooks",
            "issue_events_url": "https://api.github.com/repos/vuejs/vuex/issues/events{/number}",
            "events_url": "https://api.github.com/repos/vuejs/vuex/events",
            "assignees_url": "https://api.github.com/repos/vuejs/vuex/assignees{/user}",
            "branches_url": "https://api.github.com/repos/vuejs/vuex/branches{/branch}",
            "tags_url": "https://api.github.com/repos/vuejs/vuex/tags",
            "blobs_url": "https://api.github.com/repos/vuejs/vuex/git/blobs{/sha}",
            "git_tags_url": "https://api.github.com/repos/vuejs/vuex/git/tags{/sha}",
            "git_refs_url": "https://api.github.com/repos/vuejs/vuex/git/refs{/sha}",
            "trees_url": "https://api.github.com/repos/vuejs/vuex/git/trees{/sha}",
            "statuses_url": "https://api.github.com/repos/vuejs/vuex/statuses/{sha}",
            "languages_url": "https://api.github.com/repos/vuejs/vuex/languages",
            "stargazers_url": "https://api.github.com/repos/vuejs/vuex/stargazers",
            "contributors_url": "https://api.github.com/repos/vuejs/vuex/contributors",
            "subscribers_url": "https://api.github.com/repos/vuejs/vuex/subscribers",
            "subscription_url": "https://api.github.com/repos/vuejs/vuex/subscription",
            "commits_url": "https://api.github.com/repos/vuejs/vuex/commits{/sha}",
            "git_commits_url": "https://api.github.com/repos/vuejs/vuex/git/commits{/sha}",
            "comments_url": "https://api.github.com/repos/vuejs/vuex/comments{/number}",
            "issue_comment_url": "https://api.github.com/repos/vuejs/vuex/issues/comments{/number}",
            "contents_url": "https://api.github.com/repos/vuejs/vuex/contents/{+path}",
            "compare_url": "https://api.github.com/repos/vuejs/vuex/compare/{base}...{head}",
            "merges_url": "https://api.github.com/repos/vuejs/vuex/merges",
            "archive_url": "https://api.github.com/repos/vuejs/vuex/{archive_format}{/ref}",
            "downloads_url": "https://api.github.com/repos/vuejs/vuex/downloads",
            "issues_url": "https://api.github.com/repos/vuejs/vuex/issues{/number}",
            "pulls_url": "https://api.github.com/repos/vuejs/vuex/pulls{/number}",
            "milestones_url": "https://api.github.com/repos/vuejs/vuex/milestones{/number}",
            "notifications_url": "https://api.github.com/repos/vuejs/vuex/notifications{?since,all,participating}",
            "labels_url": "https://api.github.com/repos/vuejs/vuex/labels{/name}",
            "releases_url": "https://api.github.com/repos/vuejs/vuex/releases{/id}",
            "deployments_url": "https://api.github.com/repos/vuejs/vuex/deployments",
            "created_at": "2015-07-16T04:21:26Z",
            "updated_at": "2022-05-09T14:45:55Z",
            "pushed_at": "2022-05-04T09:57:09Z",
            "git_url": "git://github.com/vuejs/vuex.git",
            "ssh_url": "git@github.com:vuejs/vuex.git",
            "clone_url": "https://github.com/vuejs/vuex.git",
            "svn_url": "https://github.com/vuejs/vuex",
            "homepage": "https://vuex.vuejs.org",
            "size": 17196,
            "stargazers_count": 27520,
            "watchers_count": 27520,
            "language": "JavaScript",
            "has_issues": true,
            "has_projects": true,
            "has_downloads": true,
            "has_wiki": false,
            "has_pages": true,
            "forks_count": 9466,
            "mirror_url": null,
            "archived": false,
            "disabled": false,
            "open_issues_count": 137,
            "license": {
              "key": "mit",
              "name": "MIT License",
              "spdx_id": "MIT",
              "url": "https://api.github.com/licenses/mit",
              "node_id": "MDc6TGljZW5zZTEz"
            },
            "allow_forking": true,
            "is_template": false,
            "topics": [
              "javascript",
              "state-management",
              "time-travel",
              "vue",
              "vuex"
            ],
            "visibility": "public",
            "forks": 9466,
            "open_issues": 137,
            "watchers": 27520,
            "default_branch": "main",
            "score": 1.0
          },
          {
            "id": 89571184,
            "node_id": "MDEwOlJlcG9zaXRvcnk4OTU3MTE4NA==",
            "name": "vue2-manage",
            "full_name": "bailicangdu/vue2-manage",
            "private": false,
            "owner": {
              "login": "bailicangdu",
              "id": 20297227,
              "node_id": "MDQ6VXNlcjIwMjk3MjI3",
              "avatar_url": "https://avatars.githubusercontent.com/u/20297227?v=4",
              "gravatar_id": "",
              "url": "https://api.github.com/users/bailicangdu",
              "html_url": "https://github.com/bailicangdu",
              "followers_url": "https://api.github.com/users/bailicangdu/followers",
              "following_url": "https://api.github.com/users/bailicangdu/following{/other_user}",
              "gists_url": "https://api.github.com/users/bailicangdu/gists{/gist_id}",
              "starred_url": "https://api.github.com/users/bailicangdu/starred{/owner}{/repo}",
              "subscriptions_url": "https://api.github.com/users/bailicangdu/subscriptions",
              "organizations_url": "https://api.github.com/users/bailicangdu/orgs",
              "repos_url": "https://api.github.com/users/bailicangdu/repos",
              "events_url": "https://api.github.com/users/bailicangdu/events{/privacy}",
              "received_events_url": "https://api.github.com/users/bailicangdu/received_events",
              "type": "User",
              "site_admin": false
            },
            "html_url": "https://github.com/bailicangdu/vue2-manage",
            "description": "基于 vue + element-ui 的后台管理系统",
            "fork": false,
            "url": "https://api.github.com/repos/bailicangdu/vue2-manage",
            "forks_url": "https://api.github.com/repos/bailicangdu/vue2-manage/forks",
            "keys_url": "https://api.github.com/repos/bailicangdu/vue2-manage/keys{/key_id}",
            "collaborators_url": "https://api.github.com/repos/bailicangdu/vue2-manage/collaborators{/collaborator}",
            "teams_url": "https://api.github.com/repos/bailicangdu/vue2-manage/teams",
            "hooks_url": "https://api.github.com/repos/bailicangdu/vue2-manage/hooks",
            "issue_events_url": "https://api.github.com/repos/bailicangdu/vue2-manage/issues/events{/number}",
            "events_url": "https://api.github.com/repos/bailicangdu/vue2-manage/events",
            "assignees_url": "https://api.github.com/repos/bailicangdu/vue2-manage/assignees{/user}",
            "branches_url": "https://api.github.com/repos/bailicangdu/vue2-manage/branches{/branch}",
            "tags_url": "https://api.github.com/repos/bailicangdu/vue2-manage/tags",
            "blobs_url": "https://api.github.com/repos/bailicangdu/vue2-manage/git/blobs{/sha}",
            "git_tags_url": "https://api.github.com/repos/bailicangdu/vue2-manage/git/tags{/sha}",
            "git_refs_url": "https://api.github.com/repos/bailicangdu/vue2-manage/git/refs{/sha}",
            "trees_url": "https://api.github.com/repos/bailicangdu/vue2-manage/git/trees{/sha}",
            "statuses_url": "https://api.github.com/repos/bailicangdu/vue2-manage/statuses/{sha}",
            "languages_url": "https://api.github.com/repos/bailicangdu/vue2-manage/languages",
            "stargazers_url": "https://api.github.com/repos/bailicangdu/vue2-manage/stargazers",
            "contributors_url": "https://api.github.com/repos/bailicangdu/vue2-manage/contributors",
            "subscribers_url": "https://api.github.com/repos/bailicangdu/vue2-manage/subscribers",
            "subscription_url": "https://api.github.com/repos/bailicangdu/vue2-manage/subscription",
            "commits_url": "https://api.github.com/repos/bailicangdu/vue2-manage/commits{/sha}",
            "git_commits_url": "https://api.github.com/repos/bailicangdu/vue2-manage/git/commits{/sha}",
            "comments_url": "https://api.github.com/repos/bailicangdu/vue2-manage/comments{/number}",
            "issue_comment_url": "https://api.github.com/repos/bailicangdu/vue2-manage/issues/comments{/number}",
            "contents_url": "https://api.github.com/repos/bailicangdu/vue2-manage/contents/{+path}",
            "compare_url": "https://api.github.com/repos/bailicangdu/vue2-manage/compare/{base}...{head}",
            "merges_url": "https://api.github.com/repos/bailicangdu/vue2-manage/merges",
            "archive_url": "https://api.github.com/repos/bailicangdu/vue2-manage/{archive_format}{/ref}",
            "downloads_url": "https://api.github.com/repos/bailicangdu/vue2-manage/downloads",
            "issues_url": "https://api.github.com/repos/bailicangdu/vue2-manage/issues{/number}",
            "pulls_url": "https://api.github.com/repos/bailicangdu/vue2-manage/pulls{/number}",
            "milestones_url": "https://api.github.com/repos/bailicangdu/vue2-manage/milestones{/number}",
            "notifications_url": "https://api.github.com/repos/bailicangdu/vue2-manage/notifications{?since,all,participating}",
            "labels_url": "https://api.github.com/repos/bailicangdu/vue2-manage/labels{/name}",
            "releases_url": "https://api.github.com/repos/bailicangdu/vue2-manage/releases{/id}",
            "deployments_url": "https://api.github.com/repos/bailicangdu/vue2-manage/deployments",
            "created_at": "2017-04-27T07:52:45Z",
            "updated_at": "2022-05-09T14:23:01Z",
            "pushed_at": "2021-07-15T07:13:06Z",
            "git_url": "git://github.com/bailicangdu/vue2-manage.git",
            "ssh_url": "git@github.com:bailicangdu/vue2-manage.git",
            "clone_url": "https://github.com/bailicangdu/vue2-manage.git",
            "svn_url": "https://github.com/bailicangdu/vue2-manage",
            "homepage": "",
            "size": 9272,
            "stargazers_count": 11777,
            "watchers_count": 11777,
            "language": "Vue",
            "has_issues": true,
            "has_projects": true,
            "has_downloads": true,
            "has_wiki": true,
            "has_pages": false,
            "forks_count": 4073,
            "mirror_url": null,
            "archived": false,
            "disabled": false,
            "open_issues_count": 88,
            "license": {
              "key": "gpl-2.0",
              "name": "GNU General Public License v2.0",
              "spdx_id": "GPL-2.0",
              "url": "https://api.github.com/licenses/gpl-2.0",
              "node_id": "MDc6TGljZW5zZTg="
            },
            "allow_forking": true,
            "is_template": false,
            "topics": [
              "element-ui",
              "less",
              "vue",
              "vue-cli",
              "vue-router",
              "vuex",
              "webpack"
            ],
            "visibility": "public",
            "forks": 4073,
            "open_issues": 88,
            "watchers": 11777,
            "default_branch": "master",
            "score": 1.0
          }
        ]
      }