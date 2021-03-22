const playlist = await fetch('https://api.spotify.com/v1/playlists/37i9dQZF1DWWEcRhUVtL8n/tracks', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
}).then(js => js.json())
