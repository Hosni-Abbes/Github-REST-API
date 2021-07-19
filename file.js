const form   = document.querySelector('.form'),
      input  = document.querySelector('.input'),
      result = document.querySelector('.result');
let user   = '';

result.style.display = 'none'; //hide the result div

//Get Data when submit the form  
form.onsubmit = async (e) => {
  e.preventDefault(); //prevent the default action of form submission
  user = input.value; //get the input value entered by the user
  const url = `https://api.github.com/users/${user}/repos`;
  result.style.display = 'flex';  //show the result div
  if(user === ''){  //if input field empty 
    result.innerHTML = 'Please enter Github user'; //show message 'Please enter Github user'
  }else{  
    result.innerHTML = 'Loading ...'; //show 'Loading...' msg while we get data from server
    //fetch users repos
    const api = await fetch(url);
    const res = await api.json();
    if(res.length) {  //if we get data from server Show this data 
      result.innerHTML = '';
      res.map(repo => {
        result.innerHTML += `
        <div class="output">
          <span class="repo_title">${repo.name}</span>
          <div class="icon_ss">
            <div class="the_icons" style="color:#3f51b5;">
              <span>${repo.language}</span>
            </div>
            <div class="the_icons" style="color:#827717;">
              <i class="fa fa-stars"></i> <span>${repo.stargazers_count}</span>
            </div>
            <div class="the_icons" style="color:#00897b;">
              <i class="fa fa-eye"></i> <span>${repo.watchers_count}</span>
            </div>
          </div>
        </div>
        `;
    })
    }else{ //if we dont get data show 'No Data' msg
      result.innerHTML = 'No Data For This User';
      input.value = '';
    }
  }
}