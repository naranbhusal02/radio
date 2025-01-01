document.addEventListener('DOMContentLoaded', () => {
    const radioPlayer = document.getElementById('radioPlayer');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const playPauseIcon = playPauseBtn.querySelector('i');
    const volumeSlider = document.getElementById('volumeSlider');
    const volumeIcon = document.getElementById('volumeIcon');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const errorMessage = document.getElementById('errorMessage');
    const albumArt = document.querySelector('.album-art');
    const audioWaves = document.querySelector('.audio-waves');
    const currentTimeDisplay = document.getElementById('currentTime');

    let isPlaying = false;

    // Play/Pause functionality
    playPauseBtn.addEventListener('click', togglePlayPause);

    function togglePlayPause() {
        if (isPlaying) {
            radioPlayer.pause();
        } else {
            radioPlayer.play().catch(handlePlayError);
            loadingIndicator.classList.remove('hidden');
        }
    }

    // Volume control
    volumeSlider.addEventListener('input', (e) => {
        const volume = parseFloat(e.target.value);
        radioPlayer.volume = volume;
        updateVolumeIcon(volume);
    });

    function updateVolumeIcon(volume) {
        volumeIcon.className = 'fas';
        if (volume === 0) {
            volumeIcon.classList.add('fa-volume-mute');
        } else if (volume < 0.5) {
            volumeIcon.classList.add('fa-volume-down');
        } else {
            volumeIcon.classList.add('fa-volume-up');
        }
    }

    // Audio event handlers
    radioPlayer.addEventListener('playing', () => {
        isPlaying = true;
        playPauseIcon.classList.remove('fa-play');
        playPauseIcon.classList.add('fa-pause');
        loadingIndicator.classList.add('hidden');
        albumArt.classList.add('playing');
        audioWaves.classList.add('active');
        errorMessage.classList.add('hidden');
    });

    radioPlayer.addEventListener('pause', () => {
        isPlaying = false;
        playPauseIcon.classList.remove('fa-pause');
        playPauseIcon.classList.add('fa-play');
        albumArt.classList.remove('playing');
        audioWaves.classList.remove('active');
    });

    radioPlayer.addEventListener('waiting', () => {
        loadingIndicator.classList.remove('hidden');
    });

    radioPlayer.addEventListener('error', handlePlayError);

    function handlePlayError() {
        loadingIndicator.classList.add('hidden');
        errorMessage.classList.remove('hidden');
        errorMessage.textContent = 'Error playing the radio stream. Please try again later.';
        isPlaying = false;
        playPauseIcon.classList.remove('fa-pause');
        playPauseIcon.classList.add('fa-play');
        albumArt.classList.remove('playing');
        audioWaves.classList.remove('active');
    }

    // Update current time
    function updateCurrentTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString();
        currentTimeDisplay.textContent = timeString;
    }

    // Update time every second
    setInterval(updateCurrentTime, 1000);
    updateCurrentTime(); // Initial update

    // Volume icon click to mute/unmute
    let previousVolume = 1;
    volumeIcon.addEventListener('click', () => {
        if (radioPlayer.volume > 0) {
            previousVolume = radioPlayer.volume;
            radioPlayer.volume = 0;
            volumeSlider.value = 0;
        } else {
            radioPlayer.volume = previousVolume;
            volumeSlider.value = previousVolume;
        }
        updateVolumeIcon(radioPlayer.volume);
    });
});