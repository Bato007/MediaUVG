CREATE TABLE swapUser (
	username VARCHAR(30) PRIMARY KEY, 
	password VARCHAR(50), 
	name VARCHAR(50),
	playback INT,
	admin BOOL);
	
CREATE TABLE premiumUser (
	username VARCHAR(30) PRIMARY KEY,
	subscription DATE,
	CONSTRAINT fk_premium_user FOREIGN KEY (username)
	REFERENCES swapUser(username) 
	ON DELETE CASCADE ON UPDATE CASCADE);
	
CREATE TABLE freeUser (
	username VARCHAR(30) PRIMARY KEY,
	playbackLeft INT, 
	lastPlay DATE,
	CONSTRAINT fk_free_user FOREIGN KEY (username)
	REFERENCES swapUser(username) 
	ON DELETE CASCADE ON UPDATE CASCADE);	
	
CREATE TABLE artist (
	username VARCHAR(30),
	artistName VARCHAR(30) PRIMARY KEY,
	playbackThreeMonths INT,
	playbackSixMonths INT,
	startRecord DATE,
	CONSTRAINT fk_artist_user FOREIGN KEY (username)
	REFERENCES swapUser(username) 
	ON DELETE CASCADE ON UPDATE CASCADE);

CREATE TABLE userPlaylist (
	playlistId SERIAL PRIMARY KEY,
	username VARCHAR(30),
	playlistName VARCHAR(30),
	UNIQUE (username, playlistName),
	CONSTRAINT fk_playlist_user FOREIGN KEY (username)
	REFERENCES swapUser(username) 
	ON DELETE CASCADE ON UPDATE CASCADE);
	
CREATE TABLE album (
	albumID SERIAL PRIMARY KEY,
	albumName VARCHAR(50),
	author VARCHAR(30),
	release DATE,
	CONSTRAINT fk_album_artist FOREIGN KEY (author)
	REFERENCES artist(artistName) 
	ON DELETE CASCADE ON UPDATE CASCADE);
	
CREATE TABLE song (
	songId SERIAL PRIMARY KEY,
	songName VARCHAR(30),
	active BOOL,
	songLink VARCHAR(150),
	albumId INT, 
	author VARCHAR(30), 
	CONSTRAINT fk_song_album FOREIGN KEY (albumId)
	REFERENCES album(albumId) ON DELETE CASCADE, 
	CONSTRAINT fk_song_artist FOREIGN KEY (author)
	REFERENCES artist(artistName) 
	ON DELETE CASCADE ON UPDATE CASCADE);
	
CREATE TABLE playlistSongs (
	playlistId INT,
	songId INT,
  UNIQUE (playlistId, songId),
	CONSTRAINT fk_playlist FOREIGN KEY (playlistId)
	REFERENCES userPlaylist(playlistId) 
	ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_song FOREIGN KEY (songId)
	REFERENCES song(songId) 
	ON DELETE CASCADE ON UPDATE CASCADE);	

CREATE TABLE genre (
	songId INT,
	songGenre VARCHAR(50),
	CONSTRAINT fk_genre_song FOREIGN KEY (songId)
	REFERENCES song(songId) 
	ON DELETE CASCADE ON UPDATE CASCADE,
	UNIQUE(songId, songGenre));
	
INSERT INTO swapUser (username, password, name,  playback, admin) VALUES 
	('bato007', 'hola123', 'Brandon', 2, false),
	('requetetin', 'quezo', 'Martin', 5, false),
	('diego586', 'quepex', 'Diego', 3, false),
	('admin', 'adminswap', 'Rodolfo', 0, true),
	('ruther', 'salmon', 'Pez', 0, false),
	('pepe22', 'roxtar', 'Rudeus', 53, false),
	('swap', 'swapirte', 'Swap', 4, true);
	
INSERT INTO premiumUser (username, subscription) VALUES
	('bato007', '2021-03-16'),
	('requetetin', '2021-02-12'),
	('diego586', '2021-01-01'),
	('admin', '2020-12-21'),
	('swap', '2021-03-16');
	
INSERT INTO freeUser (username, playbackLeft, lastPlay) VALUES
	('ruther', 3, '2021-03-16'),
	('pepe22', 3, '2021-03-16');
	
INSERT INTO artist (username, artistName, playbackThreeMonths, playbackSixMonths, startRecord) VALUES
	('bato007', 'Batoux', 234, 125, '2020-09-01'),
	('pepe22', 'El Pepe', 2332, 1253, '2020-08-01'),
	('diego586', 'xDiegox', 4322, 1125, '2020-08-23');
	
INSERT INTO userPlaylist (username, playlistName) VALUES
	('bato007', 'Perreo Intenso'),
	('bato007', 'Electronica'),
	('bato007', 'K-Pop'),
	('requetetin', 'Solo Dance'),
	('requetetin', '80s'),
	('diego586', 'Para fiestas'),
	('diego586', 'Pa carrear'),
	('ruther', 'Viernes'),
	('pepe22', 'Le pepe');
	
INSERT INTO album (albumName, author, release) VALUES
	('Fantastic', 'Batoux', '2021-01-2'),
	('EL PEPE', 'El Pepe', '2020-12-29'),
	('Pepiando', 'El Pepe', '2021-02-23'),
	('Sixteando', 'xDiegox', '2021-01-30');

INSERT INTO song (songName, active, songLink, albumId, author) VALUES 
	('Retaul', true, '3AzjcOeAmA57TIOr9zF1ZW', 1, 'Batoux'),
	('Tu y el Cielo', true, 'linkit', 1, 'Batoux'),
	('Pepiando', true, 'linked', 2, 'El Pepe'),
	('Rojel', true, 'linked', 2, 'El Pepe'),
	('Yelt', true, 'linked', 3, 'El Pepe'),
	('Barrio', true, 'linked', 3, 'El Pepe'),
	('Trueno', false, 'linked', 3, 'El Pepe'),
	('Sixteando', true, 'linked', 4, 'xDiegox');

INSERT INTO playlistSongs (playlistId, songId) VALUES
	(1, 1),
	(1, 3), 
	(1, 4),
	(1, 8),
	(2, 2),
	(2, 4),
	(4, 1),
	(4, 2),
	(4, 7),
	(4, 8),
	(5, 5),
	(6, 5),
	(6, 6),
	(6, 7),
	(6, 8),
	(7, 3),
	(8, 1),
	(8, 2),
	(8, 3),
	(8, 4),
	(8, 5),
	(8, 6),
	(8, 7),
	(8, 8),
	(9, 3);
	
INSERT INTO genre (songId, songGenre) VALUES 
	(1, 'Rock'),
	(1, 'Blues'),
	(2, 'Jazz'),
	(3, 'Rock'),
	(4, 'Pop'),
	(5, 'Pop'),
	(5, 'Heavy Metal'),
	(5, 'Punk Funk'),
	(6, 'Disco'),
	(6, 'Electro Pop'),
	(7, 'Pop'),
	(8, 'Pop');