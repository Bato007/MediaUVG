const album = await fetch('https://api.spotify.com/token').then(token => {
    method: 'GET'.
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
})