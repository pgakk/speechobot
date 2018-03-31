const head = document.querySelector('.head');
const torso = document.querySelector('.torso');
const robot = document.querySelector('.android');
const right_arm = document.querySelector('.right_arm');
const left_arm = document.querySelector('.left_arm');
const left_leg = document.querySelector('.left_leg');
const right_leg = document.querySelector('.right_leg');

const wrapper = document.querySelector('.wrapper');
const toast = document.querySelector('#toast');

const searchInput = document.querySelector('#search-input');
const searchResult = document.querySelector('#search-result');

let added_Animation;
let queryParam = 'cats';
let split_Speech;
let watson_Text;

const watson1hToken = 'xl6ay2vHYoVL2JShHmc8PqCvOjI151w02nwgaf8WVW79irjmGCZaURInA5uaxAnsML80y8Q7OqpOkN2n%2Fgb4KzVCl9jNbQNxzxip2aLL2uqrYYWyOkCzVWfQZee%2B6WHjaQGKhHM3pVhg4jtOEiC3QRf%2FdgkPWHORgfAoxsUC8Ahw9fc8QWXdQeiaF%2BfkWeXFRSnMNUTQs4EJLtiGE6rVWi1f7p3Gs1eOlBzArqtfPmtEEBYcKGqtmp5Z7TW7P8gcHb1jBRz886Y%2FEd5Hh%2BeD7dQJvlpd56uJC5X2EPeHMEC3zmoaox8H5fUhxekj79iBiteM7f9fzfmg1dIX3Qj8O8xA8Iy%2Buh6RdaISVXi1%2F8vJM6DJXhYe3WnKBFQ7TDX89qXVCn2RLaRI4qmGWrPPODzw1pYBVEScqHRIWcCL%2FVIg85ou9eDxAj3BsrnM2qwQ1Gi3aL21v%2FApOeTWHq8Qjp0YrYk8qz5M9471Jbng5PCcAnMtU8cMlfA71iXc0c9SFlOOlA5WBE%2Fu4%2F7cn%2FapoSEEa423O3aaqusB12NfFSY8wInJ%2FmM3pVZauOSOHGhIW4o0u1hNGYYtFDh68sym8G%2BxN7Fy2E%2BQSKwOhdhSRaHx6AajNzD5y3kvSfcn7pF%2BWZ181GdRVwEAh8o4I%2BPG8R93hOcYj3hEpK0QYLNksGzbGGBzNf%2BGlEUB6V%2BuZr8cBLAVCu7ksqHZW0rD97IIS81%2FUXlA63baVA3jSN4y2cJE3PSiTvP2HCYbTUi7hWv4uYh3qzJpRu5XRBSUK1sv%2BHeVDIxRKUG7xnFV9Ts93ZwqkL1NX%2BwoDIkYbI2cyRyb5mAiM2CFA2cryhlrWFXz2YMk7QkPSDmfKHQteQpdfD07EHBwo0%2FW8fb7yecPjcKh8Q41RO8XpwqFclAGh8Bvt0CD0fCMSYOKn19Uvd9EiJl0wvdv9zHySK75xRyNfvJaK8c1sIPKcmuoUXkZiLnHpZKohQcp%2FvwJD8RIkX7oDMFPumA2HkZkEtu2BDS5%2FjN2L0wwS7bTwdugkOMGxsnEXu5vU6Ufh9mlX%2BMR5ERmyVE%3D';

startMicrophone = () => {
  fetch('https://intense-fortress-14701.herokuapp.com/api/speech-to-text/token')
    .then(function(response) {
      return response.text();
    })
    .then(function (token) {
      var watsonToken;
      if(token !== null)
        watsonToken = token;
      else
        watsonToken = watson1hToken;
      var stream = WatsonSpeech.SpeechToText.recognizeMicrophone({
        token: watsonToken,
        objectMode: true, // send objects instead of text
        extractResults: true, // convert {results: [{alternatives:[...]}], result_index: 0} to {alternatives: [...], index: 0}
        format: false // optional - performs basic formatting on the results such as capitals an periods
      });
      stream.on('data', function(data) {
        console.log(data);
        if(data.final)
          doThings(data.alternatives[0].transcript); 
      });
      stream.on('error', function(err) {
          console.log(err);
      });
    })
    .catch(err => console.log(err));
}

window.onLoad = startMicrophone();

search = (queryParam) => {
  const regExp = /search|find/;
  let query = queryParam.split(regExp);
  queryParam = query.join(" ").trim();
  if(queryParam.length > 0) {
    fetch(`https://www.googleapis.com/customsearch/v1?key=AIzaSyA2FuxB63VJ5MQY7k6qqKduybpA5pynL_w&cx=016238352014220000202:b9dgkxmb8cg&q=${queryParam}`)
    .then(response => response.json()
    .then(response => {
      document.querySelector('#content').style.display = 'flex';
      searchInput.innerHTML = `You searched for <strong><b>"${queryParam}"</b></strong>`;
      if(response) {
          var item = response.items[0];
          searchResult.innerHTML = `<br><strong>${item.htmlTitle}</strong><br>
                                  ${item.snippet}<br>
                                  <a href=${item.link}>${item.displayLink}</a>`;
      }
    }))
    .catch(err => console.log(err));
  }
}

clearSearch = () => {
  searchInput.innerHTML = "";
  searchResult.innerHTML = "";
}

clap = () => {
  removeAnimation(left_arm, added_Animation);
  added_Animation = 'clap_left';
  invokeAnimation(left_arm, 'clap_left');
  removeAnimation(right_arm, added_Animation);
  added_Animation = 'clap_right';
  invokeAnimation(right_arm, 'clap_right');
}

dance = () => {
  removeAnimation(robot, added_Animation);
  added_Animation = 'slide';
  invokeAnimation(robot, 'slide');
  removeAnimation(left_arm, added_Animation);
  added_Animation = 'clap_left';
  invokeAnimation(left_arm, 'roll_left');
  removeAnimation(right_arm, added_Animation);
  added_Animation = 'clap_right';
  invokeAnimation(right_arm, 'roll_right');
  removeAnimation(left_leg, added_Animation);
  added_Animation = 'dance_left';
  invokeAnimation(left_leg, 'dance_left');
  removeAnimation(right_leg, added_Animation);
  added_Animation = 'dance_right';
  invokeAnimation(right_leg, 'dance_right');
}

move = () => {
  removeAnimation(wrapper, added_Animation);
  added_Animation = 'moveBackground';
  invokeAnimation(wrapper, 'moveBackground');
  removeAnimation(robot, added_Animation);
  added_Animation = 'goAway';
  invokeAnimation(robot, 'goAway');
  removeAnimation(left_leg, added_Animation);
  added_Animation = 'stomp';
  invokeAnimation(left_leg, 'stomp');
  removeAnimation(right_leg, added_Animation);
  right_leg.style.animationDelay = '0.5s';
  added_Animation = 'stomp';
  invokeAnimation(right_leg, 'stomp');
}

touchSky = () => {
  removeAnimation(left_arm, added_Animation);
  added_Animation = 'touchSky';
  invokeAnimation(left_arm, 'touchSky');
  removeAnimation(right_arm, added_Animation);
  // right_arm.style.animationDelay = '0.5s';
  added_Animation = 'touchSky';
  invokeAnimation(right_arm, 'touchSky');
}

turnAround = () => {
  removeAnimation(robot, added_Animation);
  added_Animation = 'turnAround';
  invokeAnimation(robot, 'turnAround');
}

hello = () => {
  removeAnimation(left_arm, added_Animation);
  added_Animation = 'hello';
  invokeAnimation(left_arm, 'hello');
}

jump = () => {
  removeAnimation(robot, added_Animation);
  added_Animation = 'robot_jump';
  invokeAnimation(robot, 'robot_jump');
}

stomp = () => {
  removeAnimation(left_leg, added_Animation);
  added_Animation = 'stomp';
  invokeAnimation(left_leg, 'stomp');
  removeAnimation(right_leg, added_Animation);
  right_leg.style.animationDelay = '0.5s';
  added_Animation = 'stomp';
  invokeAnimation(right_leg, 'stomp');
}

touchGround = () => {
  removeAnimation(robot, added_Animation);
  added_Animation = 'touch-ground';
  invokeAnimation(robot, 'touch-ground');
}

invokeAnimation = (element, animation) => {
  element.classList.remove(animation);
  void element.offsetWidth;
  element.classList.add(animation);
}

removeAnimation = (element, animation) => {
  element.classList.remove(animation);
} 

launchLink = (targetLink) => {
  if(targetLink.length > 0 && targetLink.includes('.com'))
    window.open(targetLink);
}

doThings = (toDo) => {
  watson_Text = toDo;
  split_Speech = toDo.split(" ");
  
  for(let text of split_Speech) {
    tasksForRobot(text);
    if(text === 'search' || text === 'find')
      break;
  }
}
tasksForRobot = (toDo) => {
  switch(toDo.trim().toLowerCase()) {
    case 'up' : window.scrollTo(300,-200); break;
    case 'down' : window.scrollTo(300,200); break;
    case 'sky' : touchSky(); break;
    case 'clap' : clap(); break;
    case 'round' :
    case 'turn' : turnAround(); break;
    case 'hello' : hello(); break;
    case 'stomp' : stomp();  break;
    case 'ground' : touchGround(); break;
    case 'happy' :
    case 'dance' : dance(); break;
    case 'move':
    case 'walk' : move(); break;
    case 'jump' :
    case 'high' : jump(); break;
    case 'find' :
    case 'search' : search(watson_Text); break;
    case 'twitter' : launchLink('https://twitter.com/'); break;
    case 'facebook' : launchLink('https://www.facebook.com/'); break;
    case 'instagram' : launchLink('https://www.instagram.com/'); break;
    case 'git' : launchLink('https://github.com/pgakk/useurvoice'); break;
    case 'close' :
    case 'clear' : clearSearch(); break;
    default: break;
  }
}