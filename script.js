// Sample song data array
const songs = [
    { id: 1, name: 'Shape of You', artist: 'Ed Sheeran', img: './images/shapeofyou.jpeg', genre: 'Pop', source: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
    { id: 2, name: 'Bohemian Rhapsody', artist: 'Queen', img: './images/bohemnian.jpeg', genre: 'Rock', source: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
    { id: 3, name: 'Take Five', artist: 'Dave Brubeck', img: './images/takefive.jpeg', genre: 'Jazz', source: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
    { id: 4, name: 'Fur Elise', artist: 'Ludwig van Beethoven', img: './images/fuir.jpeg', genre: 'Classical', source: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
    { id: 5, name: 'Blinding Lights', artist: 'The Weeknd', img: './images/blinding.jpeg', genre: 'Pop', source: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' },
    { id: 6, name: 'Stairway to Heaven', artist: 'Led Zeppelin', img: './images/heqaven.jpeg', genre: 'Rock', source: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3' },
    { id: 7, name: 'Autumn Leaves', artist: 'Bill Evans', img: './images/Autumn.jpeg', genre: 'Jazz', source: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3' },
    { id: 8, name: 'Clair de Lune', artist: 'Claude Debussy', img: './images/clair.jpeg', genre: 'Classical', source: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3' }
];
let playlists = {};

// DOM Elements
const songsList = document.getElementById('songsList');
const songImage = document.getElementById('songImage');
const songName = document.getElementById('songName');
const songArtist = document.getElementById('songArtist');
const playPauseBtn = document.getElementById('playPauseBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const addToPlaylistBtn = document.getElementById('addToPlaylistBtn');
const genreFilter = document.getElementById('genreFilter');
const playlistList = document.getElementById('playlistList');
const createPlaylistBtn = document.getElementById('createPlaylistBtn');
const toggleThemeBtn = document.getElementById('toggleThemeBtn');
const audioPlayer = document.getElementById('audioPlayer');
const audioSource = document.getElementById('audioSource');

// DOM Elements
const playlistNameInput = document.getElementById('playlistNameInput');
const playlistSongsList = document.getElementById('playlistSongsList');

let currentSongIndex = 0;

// Toggle theme function
function toggleTheme() {
    const currentTheme = document.body.getAttribute('data-theme');
    document.body.setAttribute('data-theme', currentTheme === 'light' ? 'dark' : 'light');
    localStorage.setItem('theme', currentTheme === 'light' ? 'dark' : 'light');
}

// Show songs list based on genre filter
function showSongs() {
    const genre = genreFilter.value;
    const filteredSongs = genre ? songs.filter(song => song.genre === genre) : songs;
    songsList.innerHTML = '';
    filteredSongs.forEach(song => {
        const songItem = document.createElement('li');
        songItem.textContent = song.name;
        songItem.onclick = () => playSong(song);
        songsList.appendChild(songItem);
    }); 
}

// Render the currently playing song
function renderCurrentSong() {
    const song = songs[currentSongIndex];
    songImage.src = song.img;
    songName.textContent = song.name;
    songArtist.textContent = song.artist;
    audioSource.src = song.source;
    audioPlayer.load();
    audioPlayer.play();
}

// Play the selected song
function playSong(song) {
    currentSongIndex = songs.indexOf(song);
    renderCurrentSong();
    playPauseBtn.textContent = 'Pause';
}

// Event listener for page load to select the first song
window.addEventListener('DOMContentLoaded', () => {
    renderCurrentSong();
    showSongs();
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
});

// Button handlers for controls
playPauseBtn.addEventListener('click', () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseBtn.textContent = 'Pause';
    } else {
        audioPlayer.pause();
        playPauseBtn.textContent = 'Play';
    }
});

prevBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    renderCurrentSong();
});

nextBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    renderCurrentSong();
});

// Function to render all playlists in the playlist section
function renderPlaylists() {
    playlistList.innerHTML = '';
    for (const playlistName in playlists) {
        const playlistItem = document.createElement('li');
        playlistItem.textContent = playlistName;
        // playlistItem.onclick = () => renderPlaylistSongs(playlistName);
        playlistList.appendChild(playlistItem);
    }
}



// Create a new playlist when the button is clicked
createPlaylistBtn.addEventListener('click', () => {
    const playlistName = playlistNameInput.value.trim();
    if (playlistName && !playlists[playlistName]) {
        playlists[playlistName] = []; // Initialize an empty playlist
        renderPlaylists(); // Update the playlist display
        playlistNameInput.value = ''; // Clear the input field
    } else if (playlists[playlistName]) {
        console.log("Playlist already exists.");
    } else {
        console.log("Please enter a valid playlist name.");
    }
});







// Function to add the current song to the playlist list without replacing existing items
addToPlaylistBtn.addEventListener('click', () => {
    const currentSong = songs[currentSongIndex];
    
    // Check if the song is already in the playlist to avoid duplicates
    const existingSongs = Array.from(playlistSongsList.getElementsByTagName('li'));
    const songAlreadyAdded = existingSongs.some(item => item.textContent === currentSong.name);
    
    if (!songAlreadyAdded) {
        // Append the song to the playlist
        const songItem = document.createElement('li');
        songItem.textContent = currentSong.name;
        playlistSongsList.appendChild(songItem);
    }
});

// Initial render of playlists
renderPlaylists();

// Event listeners
genreFilter.addEventListener('change', showSongs);
toggleThemeBtn.addEventListener('click', toggleTheme);
