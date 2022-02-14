const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time')
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
//music array
const song =[
    {
        name: 'b1',
        displayName: 'Janet',
        artist: 'Berhana'
    },
    {
        name: 'd$',
        displayName: 'She wants my Moneys',
        artist: 'Dominic Fike'
    },
    {
        name: 'dK',
        displayName: 'King of Everything',
        artist: 'Dominic Fike'
    },
    {
        name: 'Freaks',
        displayName: 'Freaks',
        artist: 'Rozco'
    }
    

]
//check if playing
let isPlaying = false;

function playMusic(){
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'pause');
    music.play();
}

function pauseMusic(){
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'play');
    music.pause();
}
//play/pause event listener
playBtn.addEventListener('click', () => (isPlaying ? pauseMusic() : playMusic()));

//update DOM

function loadSong(song){
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `musics/${song.name}.mp3`
    image.src = `imgs/${song.name}.jpg`
}
let songIndex = 0;

function previousSong(){
    songIndex--;
    if(songIndex < 0){
        songIndex.song.length -1;
    }
    loadSong(song[songIndex]);
    playMusic();
}

function nextSong(){
    songIndex++;
    if(songIndex > song.length - 1){
        songIndex = 0;
    }
    loadSong(song[songIndex]);
    playMusic();
}
function updateProgressBar(event){
    if(isPlaying){
        
        const { duration, currentTime } = event.srcElement;
        //Update bar
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        //calculate duration
        const durationMins = Math.floor(duration / 60);
        let durationSecs = Math.floor(duration % 60);
        if(durationSecs < 10){
            durationSecs = `0${durationSecs}`;
        }
        //delay math duration
        if(durationSecs){
            durationEl.textContent = `${durationMins}: ${durationSecs}`;
        }
        //calculate current time
        const currentMins = Math.floor(currentTime / 60);
        let  currentSecs = Math.floor(currentTime % 60);
        if(currentSecs < 10){
            currentSecs = `0${currentSecs}`;
        }
            currentTimeEl.textContent = `${currentMins}: ${currentSecs}`;
    }
}

function setProgressBar(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const {duration} = music;
    music.currentTime = (clickX / width) * duration;

}
//on LOAD first song
loadSong(song[songIndex]);

prevBtn.addEventListener('click', previousSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong());
music.addEventListener('timeupdate', updateProgressBar)
progressContainer.addEventListener('click', setProgressBar)