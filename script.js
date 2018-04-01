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

const watson1hToken = 'I7LFtxHANQEcQXa0W6e5oQVIqh3ERLHtpNc%2FBlNAkL8FE7O86Xr04nhOggN6mLg7JdDpCYWkmdmjhDfGfNc2qnyiHyW2216EE8qTq1gelYT4I4Vvwa%2FzHuY85MX8AifmDBMWY2vZ%2Fx0R%2FXGg0oZ3ctvKxuwj5low71QLM86FaxYmu6NwyKwY5XMu%2BXbRjBEK%2FwzZqFDjxL%2F0zcZsYZ8YqNgGrSiVW6c1wGGj60wvMiQM19NbOM06bghWDFOmB%2BhRGYnCftsEmwnRPHoWdFIWlVO3zl2lzTfbPri2D74tjrkbWPbhHW7AETX48IgZy6ifnHJoHuExR%2F%2B90fpP8UmfBzKUXxzuis8GhgoDWHv5e2NJX38Euq8ujxVPlmQsRq33Gsd9tGoGXDYXsKnfDqxpWfHHfUpCL%2FH5YHmbTra8JvrFyOuoR63e32Cl7CfyA75Dt7OWjEB01L%2BMHcHbSbaO8%2Bp3clZ%2B0%2Boxo0rBZviazSuO1R0moQUgRSYvSs1v2p21QaK2Ehdpu%2FGxfN3PvNKHQZqS%2BJ3JZuDCsDRk%2BZ9oZBGgWCk5k5OKMDPQtte1%2FWJ8OSrKzjDxxEdM4eBvc49lj6Nc1QGyaQiVX77E3M9N%2FCFuU7L6WuRMId%2FukszQloK0PWlzRsr94aGTGVw8SKak4XWf9OTmn8ngxlFX2ww2Y0f%2BNh7vnPk5fr5KmQc7o3WwF4u9%2BwBJQZVccEyVIpNWS8UHXdRoFdAZqSur%2FC53j%2FKcrpCI5zago7uxlKyShNxy%2FHZsBYGMjVLg144UqnEXfCPsFrhurWNYAT%2BDMBz6AFkKTtjZZ7GpBqDLPQg%2FQ0xvGiU7F6imyXcTIebspdJEExaegAhKIHbMcYEjDa8TEAfST%2BuzYHZ8QO7bcnPiFhEvzuD1gLwwDDCa4OX60uVoUjXs7F07Z6VsYDdJnCZD%2FAjDz5kAaN9T%2BaZq%2BrK4MhJP%2FTJEsa3ECqQBIHMxVDMC1kHg7LGQbebFIHD%2BLbBsXF07RkXVY4u5aDhlv2bjasFh7%2FHvij2mxrhHHXnQFQ66KdOf9WqzzU2d4wNJtUk1GtY%3D';

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