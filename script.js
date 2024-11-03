function loginWithSpotify() {
    const clientId = '9c37515344fc471cad92cd7a1cd99452';
    const redirectUri = encodeURIComponent('http://localhost:3000/moods.html');
    const scope = encodeURIComponent('user-read-private user-read-email streaming');
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scope}&show_dialog=true`;
    
    window.location.href = authUrl;
}

function selectMood(mood) {
    const tracks = moodTracks[mood];
    const randomTrack = tracks[Math.floor(Math.random() * tracks.length)];
    
    localStorage.setItem('selectedTrack', randomTrack);
    localStorage.setItem('selectedMood', mood);
    
    window.location.href = 'player.html';
}

function selectRandomSong() {
    const moods = Object.keys(moodTracks);
    const randomMood = moods[Math.floor(Math.random() * moods.length)];
    const tracks = moodTracks[randomMood];
    const randomTrack = tracks[Math.floor(Math.random() * tracks.length)];
    
    localStorage.setItem('selectedTrack', randomTrack);
    localStorage.setItem('selectedMood', randomMood);
    
    window.location.href = 'player.html';
}

function regenerateTrack() {
    const currentMood = localStorage.getItem('selectedMood');
    if (currentMood && moodTracks[currentMood]) {
        const tracks = moodTracks[currentMood];
        const currentTrack = localStorage.getItem('selectedTrack');
        let newTrack;
        
        do {
            const randomIndex = Math.floor(Math.random() * tracks.length);
            newTrack = tracks[randomIndex];
        } while (newTrack === currentTrack && tracks.length > 1);
        
        localStorage.setItem('selectedTrack', newTrack);
        
        const playerDiv = document.getElementById('player');
        playerDiv.innerHTML = `
            <iframe 
                id="spotify-iframe"
                src="https://open.spotify.com/embed/track/${newTrack}?autoplay=1" 
                width="100%" 
                height="380" 
                frameborder="0" 
                allowtransparency="true" 
                allow="encrypted-media autoplay">
            </iframe>`;
    }
}

function checkSecret(value) {
    if (value === "1101") {
        window.location.href = 'secret.html';
        document.getElementById('secretCode').value = '';
    }
}

// Initialize player if on player page
if (window.location.pathname.includes('player.html')) {
    const trackId = localStorage.getItem('selectedTrack');
    if (trackId) {
        const playerDiv = document.getElementById('player');
        playerDiv.innerHTML = `
            <iframe 
                id="spotify-iframe"
                src="https://open.spotify.com/embed/track/${trackId}?autoplay=1" 
                width="100%" 
                height="380" 
                frameborder="0" 
                allowtransparency="true" 
                allow="encrypted-media autoplay">
            </iframe>`;
    }
}

// Add event listeners when the page loads
document.addEventListener('DOMContentLoaded', function() {
    const moodButtons = document.querySelectorAll('.mood-btn');
    moodButtons.forEach(button => {
        if (!button.classList.contains('random')) {
            button.addEventListener('click', function() {
                const mood = this.classList[1]; // Get the mood class (happy, sad, etc.)
                selectMood(mood);
            });
        }
    });
});

// Spotify track IDs for different moods
const moodTracks = {
    happy: [
        '6DCZcSspjsKoFjzjrWoCdn', // "I Wanna Dance with Somebody" - Whitney Houston
        '0WQiDwKJclirSYG9v5tayI', // "Walking on Sunshine" - Katrina & The Waves
        '4h9wh7iOZ0GGn8QVp4RAOB', // "I Got You (I Feel Good)" - James Brown
        '2RttW7RAu5nOAfq6YFvApB', // "Happy" - Pharrell Williams
        '0n2SEXB2qoRQg171q7XqeW', // "Don't Stop Believin'" - Journey
        '60nZcImufyMA1MKQY3dcCH', // "Happy Together" - The Turtles
        '1JQ6Xm1JrvHbYW9j0S4xwW', // "Three Little Birds" - Bob Marley
        '5b88tNINg4Q4nrRbrCXUmg', // "Best Day of My Life" - American Authors
        '7MXVkk9YMctZqd1Srtv4MB', // "Uptown Funk" - Mark Ronson ft. Bruno Mars
        '6rqhFgbbKwnb9MLmUQDhG6'  // "Can't Stop the Feeling!" - Justin Timberlake
    ],
    sad: [
        '4h8VwCb1MTGoLKueQ1WgbD', // "Yesterday" - The Beatles
        '7gYwIAHB6VxzLJFSZMMv8i', // "All By Myself" - Celine Dion
        '6b2RcmUt1g9N9mQ3CbjX2Y', // "How to Save a Life" - The Fray
        '4NhDYoQTYCdWHTvlbGVgwo', // "Someone Like You" - Adele
        '3YuaBvuZqcwN3CEAyyoaei', // "The Sound of Silence" - Simon & Garfunkel
        '6EPRKhUOdiFSQwGBRBbvsZ', // "Hurt" - Johnny Cash
        '6b2oQwSGFkzsMtQruIWm2p', // "Mad World" - Gary Jules
        '3JOVTQ5h8HGFnDdp4VT3MP', // "All I Want" - Kodaline
        '6ORqU0bHbVCRjXm9AjyHyZ', // "Fix You" - Coldplay
        '2nMeu6UenVvwUktBCpLMK9'  // "Say Something" - A Great Big World
    ],
    excited: [
        '7CajNmpbOovFoOoasH2HaY', // "I Gotta Feeling" - Black Eyed Peas
        '4Cy0NHJ8Gh0xMdwyM9RkQm', // "Can't Hold Us" - Macklemore
        '0V3wPSX9ygBnCm8psDIegu', // "Good as Hell" - Lizzo
        '7dt6x5M1jzdTEt8oCbisTK', // "Sweet Dreams (Are Made of This)" - Eurythmics
        '1i1fxkWeaMmKEB4T7zqbzK', // "Don't Stop Me Now" - Queen
        '2QjOHCTQ1Jl3zawyYOpxh6', // "Shake It Off" - Taylor Swift
        '7hQJA50XrCWABAu5v6QZ4i', // "Jump Around" - House of Pain
        '5ya2gsaIhTkAuWYEMB0nw5', // "Titanium" - David Guetta ft. Sia
        '0ct6r3EGTcMLPtrXHDvVjc', // "The Power of Love" - Huey Lewis & The News
        '3w3y8KPTfNeOKPiqUTakBh'  // "Firework" - Katy Perry
    ],
    calm: [
        '7qiZfU4dY1lWllzX7mPBI3', // "Ocean Eyes" - Billie Eilish
        '0qG0iGd5hAeqMqGMD5zHAx', // "Weightless" - Marconi Union
        '3KkXRkHbMCARz0aVfEt68P', // "Chasing Cars" - Snow Patrol
        '0FDzzruyVECATHXKHFs9eJ', // "Make You Feel My Love" - Adele
        '6EPRKhUOdiFSQwGBRBbvsZ', // "River Flows in You" - Yiruma
        '6Pgmq4gEHQIDHcqhR3qPel', // "Hallelujah" - Jeff Buckley
        '3XVozq1aeqsJwpXrEZrDJ9', // "Skinny Love" - Bon Iver
        '6Qyc6fS4DsZjB2mRW9DsQs', // "The Scientist" - Coldplay
        '2bzLQZwqDKCyWVTc5M8E1w', // "Breathe Me" - Sia
        '4EWCNWgDS8707fNSZ1oaA5'  // "Say You Won't Let Go" - James Arthur
    ],
    angry: [
        '7lQ8MOhq6IN2w8EYcFNSUk', // "Break Stuff" - Limp Bizkit
        '7skAJaCyIxTEXuIyjtXzF2', // "Bulls on Parade" - Rage Against the Machine
        '5ghIJDpPoe3CfHMGu71E6T', // "Given Up" - Linkin Park
        '6EPRKhUOdiFSQwGBRBbvsZ', // "Ace of Spades" - Motörhead
        '0jdNdfi4vAuVi7a6cPDFBM', // "Master of Puppets" - Metallica
        '2zYzyRzz6pRmhPzyfMEC8s', // "Highway to Hell" - AC/DC
        '5CQ30WqJwcep0pYcV4AMNc', // "Chop Suey!" - System of a Down
        '0KQb6SsxvDwoUWFTKNdDuJ', // "Last Resort" - Papa Roach
        '0rmGAIH9LNJewFw7nKzZnc', // "Killing in the Name" - Rage Against the Machine
        '6rJqqRce0Kvo2dJUXoHleC'  // "Down with the Sickness" - Disturbed
    ]
};


