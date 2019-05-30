// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCCdyN8uttQV0A-X_oQ8qn7NxwKdaA9Qn4",
  authDomain: "kabita-f03d7.firebaseapp.com",
  databaseURL: "https://kabita-f03d7.firebaseio.com",
  projectId: "kabita-f03d7",
  storageBucket: "kabita-f03d7.appspot.com",
  messagingSenderId: "541142277080",
  appId: "1:541142277080:web:ddadf916f99eadc9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let database = firebase.database()

let scoreboard = {}
let bts = document.getElementById("bts")
let x
let y
let d
let k
let q
let w
let z
let level
let direction_h
let direction_v
let direction2
let score
let time

function setup() {
  createCanvas(windowWidth, windowHeight);
  s = width/761
  direction_h = 1
  direction_v = 1
  direction2 = [1,1,1,1,1,1,1,1,1,1,1,1,1,1]
  score= 0
  x= 50
  y= 50
  d= 40
  k= 30
  z= 4
  level= 1
  time= 60
  q= [358,50,300,400,500,680,205,850,800,200,259,720,450,780]
  w= [200,250,350,450,650,600,480,420,310,320,590,500,650,300]
}

function draw() {
  d=d+5*direction_h
  k=k+8*direction_v
  if (d*s>width || d*s<0) {
    direction_h = direction_h* -1 
  }
  if (k>height || k<0) {
    direction_v = direction_v* -1 
  }
  time = time-0.1
  background(8,232,205);
  if (time > 0) {
    
  textSize(30)
  text("Score: " +score,80,90)
  text("Time:  " +time.toFixed(0),100,140)
  for (i=0; i<z; i=i+1) {
  
    //codes for q and w||square
    w[i]=w[i]+5*direction2[i]
    if (w[i]>height || w[i]<0) {
      direction2[i] = direction2[i]* -1
    }
    if (dist(x*s, y, q[i]*s, w[i]) < 50*s + 20*s) {
      score=score-1
    }
    square(q[i]*s,w[i],40*s)
  }

  if (score > 100 && level == 1) {
    z= z+ 2
    level = 2
   }
  
  if (score > 200 && level == 2) {
    z= z+ 2
    direction2 = [4,4,4,4,4,4,4,4,4,4,4,4,4,4] 
    level = 3
  }
  if (score > 300 && level == 3) {
    z= z+ 6
    level = 4
  }

  
  //end of square
  fill(239,2,117)
  circle(d*s,k,30*s)
  circle(x*s,y,50*s) 
  if (touches.length == 0)   {
  if (keyIsDown(LEFT_ARROW)){
  x = x - 10
  }
  if (keyIsDown(RIGHT_ARROW)){
  x = x + 10
  }
  if (keyIsDown(UP_ARROW)){
  y = y - 10
  }
  if (keyIsDown(DOWN_ARROW)){
  y = y + 10
  }	
  }
  else { 
		x = touches[0].x
		y = touches[0].y
  }
	  
	  
  if (dist( x*s, y, d*s, k) < 50*s + 30*s) {
	 score=score+1
  }
  }
  else {
      bts.innerHTML = "Name? <input id= 'prompt'><button onclick='restart()'>Restart</button><button onclick='alltime_leaderboard()'>alltime_leadeboard</button>"
      noLoop()


  } 
}

function restart() { 
 let prompt= document.getElementById("prompt")
 name = prompt.value
 database.ref(name).set(score)
  if (name != "") {
    scoreboard[name] = score  
   }
  alert("Scoreboard: " +JSON.stringify(scoreboard,null,1))
  time = 60
  score = 0
  level = 1
  z = 4
  loop()
  bts.innerHTML = ""
  generate_leaderboard()
}

function generate_leaderboard() {
  scores = Object.values(scoreboard)
  names = Object.keys(scoreboard)
  
  if (scores.length >= 5) {
    let leaderboard = { }
    for (i=0; i<5; i=i+1) {
      max = Math.max(...scores)
      index = scores.indexOf(max)
      leaderboard[names[index]] = max
      names.splice(index,1)
      scores.splice(index,1)
    }
    alert("Leaderboard: " + JSON.stringify(leaderboard,null,1))
  }
}
function generate_alltime_leaderboard() {
	let alltime_leaderboard = { }
	database.ref().orderByValue().limitToLast(5).on("value", function(snapshot) {
		snapshot.forEach(function(data) {
		alltime_leaderboard[data.key] = data.val()
		});
    	});
	if (Object.values(alltime_leaderboard).length > 0) {
	  alert("All-time leaderboard: " + JSON.stringify(alltime_leaderboard,null,1))
    	}
}

generate_alltime_leaderboard()
