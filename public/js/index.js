let names = ["00 Rapid Induction", "01 Bubble Induction", "02 Bubble Acceptance", "03 Bambi Named and Drained", "04 Bambi IQ Lock", "05 Bambi Body Lock", "06 Bambi Attitude Lock", "07 Bambi Uniformed", "08 Bambi Takeover", "09 Bambi Cockslut", "10 Bambi Awakens", "01 Blank Mindless Doll", "02 Cock Dumb Hole", "03 Uniform Slut Puppet", "04 Vain Horny Happy", "05 Bimbo Drift", "01 Fake Plastic Fuckpuppet", "02 Designer Pleasure Puppet", "03 Bimbo Fuckpuppet Oblivion", "01 Blowup Pleasure Toy", "02 Perfect Bimbo Maid", "03 Restrained and Milked", "01 Bimbo Giggletime", "02 Mindlocked Cock Zombie", "00 Bimbo Drone", "01 Bimbo Relaxation", "02 Bimbo Mindwipe", "03 Bimbo Slumber", "04 Bimbo Tranquility", "05 Bimbo Pride", "06 Bimbo Pleasure", "07 Bimbo Servitude", "08 Bimbo Addiction", "09 Bimbo Amnesia", "10 Bimbo Protection", "01 Sleepygirl Salon", "02 Mentally Platinum Blonde", "03 Automatic Airhead", "04 Superficial Basic Bitch", "05 Life Control Total Doll", "07 Makeover Awakener"];
let list = document.getElementsByTagName("input");
let active = [""];
let confile;

let legacy = false;

let orderer = document.getElementById("order"); 

function auDur() {  
    audur = 0; 
    for(k=0;k<audios.length;k++){
        audur += audios[k].duration; 
    } 
    document.getElementById("dur").innerText = jsAudDur(audur);
}

function detectBrowser() {    
    if((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1 ) { 
        return 'Opera'; 
    } else if(navigator.userAgent.indexOf("Chrome") != -1 ) {   
        return 'Chrome'; 
    } else if(navigator.userAgent.indexOf("Safari") != -1) {
        return 'Safari';
    } else if(navigator.userAgent.indexOf("Firefox") != -1 ){
        return 'Firefox';
    } else if((navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.documentMode == true )) {
        return 'IE';//crap
    } else { 
        return 'Unknown';
    }
} 

function alertBox(msg) {
    zz = document.createElement("div");
    zz.className = "alert";
    zz.innerHTML = `<span class="closebtn">&times;</span>` + msg + ``;
    document.querySelector("#alertBoxs").appendChild(zz);

    zz.onclick = function () {
        div = zz;
        div.style.opacity = "0";
        setTimeout(function () {
            div.style.display = "none";
        }, 600);
    }
    setTimeout(function (that) {
        var div = that;
        div.style.opacity = "0";
        setTimeout(function () {
            div.style.display = "none";
        }, 600);
    }, 3000, zz);
}

function jsAudDur(audc) {
    hours = "0" + Math.floor((audc / 60)/60);
    minutes = "0" + (Math.floor(audc / 60) - (60 * Math.floor((audc / 60)/60)));
    seconds = "0" + (Math.floor(audc) - minutes * 60);
    dur = hours.substr(-2) + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
    return dur;
}
let loded = false;
window.onload = () => { 
//   legacy = confirm("Would you like to use the faster, less reliable (may not work for some browsers) loading? (ok for yes, cancel for no)");
  if(window.location.href.includes("?")){
    audioos = window.location.href.split("?list=")[1]
    audioos = audioos.split(",");
      let uris = [];
    for(i=0;i<audioos.length;i++){
      audios.push(new Audio("https://BambiPlaylistCORSServer.katiesarah1.repl.co/"+names[parseInt(audioos[i])]+".mp3"));
      uris.push("https://BambiPlaylistCORSServer.katiesarah1.repl.co/"+names[parseInt(audioos[i])]+".mp3");
    } 
    audios.forEach(function(sound) {
      if(detectBrowser()=="Firefox"){
        sound.load();
      }
      sound.onended = onended;
    });
    indexes = [];
    for(j=0;j<audios.length;j++){
      indexes.push(names.indexOf(decodeURI(audios[j].src.split("co/")[1].split(".mp3")[0])));
    }
    document.getElementById("permLink").innerText = window.location.href
    document.getElementById("permLink").href = window.location.href
    document.getElementById("nfils").innerText = indexes.length;
    let loaded = 1;
    proms = uris.map(uri => fetch(uri).then((r) => {alertBox("Started loading file #"+loaded);loaded++;return r.blob()}));
    Promise.all(proms).then(blobs => {
        console.log("Started");
        let blob = new Blob(blobs);
        let blobUrl = URL.createObjectURL(blob);
        console.log(blobUrl);
        confile = new Audio(blobUrl);
        alertBox("Loaded entire playlist!");
        loded = true;
        auDur();
    });
  }
};

let inputHandle = (e) => {
  active = [];
  for(i=0;i<list.length;i++){ 
    if(list[i].checked){  
      active.push("https://BambiPlaylistCORSServer.katiesarah1.repl.co/"+names[i]+".mp3"); 
    }   
  }  
  renderItems(active)
} 
 
var list2 = document.getElementById('order') 
var nums = ["a"];
var dragging, draggedOver;

const genRandom = () => {
  active = active.sort(() => Math.random() - 0.5)
  renderItems(active)
}

const renderItems = (data) =>{
  list2.innerText = ''
  data.forEach(num=>{
    var node = document.createElement("li");    
    node.draggable = true
    node.addEventListener('drag', setDragging) 
    node.addEventListener('drop', compare) 
    node.addEventListener('dragover', allowDrop)
    var textnode = document.createElement(`a`);
    textnode.className = "ss";
    textnode.href = `${num}`;
    textnode.innerText = `${names[names.indexOf(decodeURI(num.split("co/")[1].split(".mp3")[0]))]}`;
    node.appendChild(textnode);
    list2.appendChild(node)
  })
  dragging = null
  draggedOver = null
    create();
}

const compare = (e) =>{
  var index1 = active.indexOf(dragging);
  var index2 = active.indexOf(draggedOver);
  active.splice(index1, 1)
  active.splice(index2, 0, dragging)
  
  renderItems(active)
 
}; 

var decodeEntities = (function() {
  // this prevents any overhead from creating the object each time
  var element = document.createElement('div');

  function decodeHTMLEntities (str) {
    if(str && typeof str === 'string') {
      // strip script/html tags
      str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
      str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
      element.innerHTML = str;
      str = element.textContent;
      element.textContent = '';
    }

    return str;
  }

  return decodeHTMLEntities;
})();

function allowDrop(ev) {
    ev.preventDefault();
    draggedOver = decodeEntities(ev.target.innerHTML.split("href=\"")[1].split("\">")[0]);
    audios = [];
}

const setDragging = (e) =>{
  dragging =  decodeEntities(e.target.innerHTML.split("href=\"")[1].split("\">")[0]);
  audios = [];
}

var audios = [];
var currentIndex = 0;

let create = () => {
  audios = [];
  for(i=0;i<active.length;i++){
    audios.push(new Audio(active[i]));
  }
  audios.forEach(function(sound) {
    if(detectBrowser()=="Firefox"){
      sound.load();
    }
    sound.onended = onended;
  });
  indexes = [];
  for(j=0;j<audios.length;j++){
    indexes.push(names.indexOf(decodeURI(audios[j].src.split("co/")[1].split(".mp3")[0])));
  }
  document.getElementById("permLink").innerText = window.location.href+"perma.html?list="+indexes.join(",");
  document.getElementById("permLink").href = window.location.href+"perma.html?list="+indexes.join(",");
  return false;
}
                    
function onended(evt) {
  currentIndex = (currentIndex + 1) % audios.length; // increment our index
  audios[currentIndex].play(); // play the next sound
}

document.getElementById("play").onclick = () => {
//   if(!legacy){
     if(loded){
         try{confile.play();}catch(e){}
     }else {
        alertBox("Not all files loaded! Please wait!");
    }
//       else if(legacy) {
//   try{audios[currentIndex].play();}catch(e){}
    
//   }
//     else {
//         alertBox("Not all files loaded! Please wait!");
//     }
//   }
  
};
                    
document.getElementById("stop").onclick = () => {
//   if(!legacy){
    try{confile.pause();}catch(e){}
//   }
//   else {
//     try{for(i=0;i<audios.length;i++){
//       audios[i].pause();
//     }}catch(e){}
//   }
};

/*

*/
