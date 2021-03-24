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
	timesplayed INT, 
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
	('diego586', 'xDiegox', 4322, 1125, '2020-08-23'),
	('Dave Grohl', 'Foo Fighters', 521, 821, '1990-04-02');
	
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
	('Concrete and Gold', 'Foo Fighters', '2017-09-15'),
	('One by one', 'Foo Fighters', '2002-10-22'),
	('Greatest Hit', 'Foo Fighters', '2002-10-22'),
	('Back in Black', 'AC/DC', '1980-06-25'),
	('Teenage Dream: The Complete Confection', 'Katy Perry', '2012-03-23'),
	('Infinite summer', 'Daddy Yankee', '2005-02-03'),
	('Una Vaina Loca', 'Fuego', '2011-04-05'),
	('Barrio Fino', 'Daddy Yankee', '2004-06-13'),
	('King Of Kings', 'Don Omar', '2006-05-23'),
	('The Last Don', 'Don Omar', '2003-07-17'),
	('Showtime', 'Angel y Khriz', '2008-03-11'),
	('Reggaeton de los 00`s', 'Wisin & Yandel', '2008-04-11'),
	('Como tu no hay dos', 'Buxxi', '2011-10-31'),
	('Meet The Orphans', 'Don Omar', '2010-11-16'),
	('House Of Pleasure', 'Plan B', '2010-07-20'),
	('Calma', 'Pedro Capó', '2018-10-05'),
	('Donde Nos Quedamos', 'Bacilos', '2018-08-24'),
	('Caraluna', 'Bacilos', '2002-07-16')
	('Bacilos (Re-Issue)', 'Bacilos', '2005-07-05'),
	('Recovery', 'Eminem', '2010-06-18'),
	('Curtain Call: The Hits', 'Eminem', '2005-12-06');

INSERT INTO song (songName, active, songLink, albumId, author) VALUES 
	('Retaul', true, '3AzjcOeAmA57TIOr9zF1ZW', 1, 'Batoux'),
	('Tu y el Cielo', true, 'linkit', 1, 'Batoux'),
	('Pepiando', true, 'linked', 2, 'El Pepe'),
	('Rojel', true, 'linked', 2, 'El Pepe'),
	('Yelt', true, 'linked', 3, 'El Pepe'),
	('Barrio', true, 'linked', 3, 'El Pepe'),
	('Trueno', false, 'linked', 3, 'El Pepe'),
	('Run',true,'1wLQwg0mloy3yXjL0jPE0N',5,'Foo Fighters'),
	('The Sky Is a Neighborhood',true,'3kdMzXOcrDIdSWLdONHNK5',5,'Foo Fighters'),
	('The Line',true,'7hlLPJo0pxh1jQUERqf5O2',5,'Foo Fighters'),
	('All My Life',true,'6tsojOQ5wHaIjKqIryLZK6',6,'Foo Fighters'),
	('Times Like These',true,'67vYdAAM3oGsEImCRfbtsF',6,'Foo Fighters'),
	('Everlong',true,'5UWwZ5lm5PKu6eKsHAGxOk',6,'Foo Fighters'),
	('Best Of You',true,'5FZxsHWIvUsmSK1IAvm2pp',6,'Foo Fighters'),
	('Hells Bells',true,'69QHm3pustz01CJRwdo20z',7,'AC/DC'),
	('Shoot to Thrill',true,'0C80GCp0mMuBzLf3EAXqxv',7,'AC/DC'),
	('Back in Black',true,'08mG3Y1vljYA6bvDt4Wqkj',7,'AC/DC'),
	('Teenage Dream',true,'55qBw1900pZKfXJ6Q9A2Lc',8,'Katy Perry'),
	('Last Friday Night',true,'455AfCsOhhLPRc68sE01D8',8,'Katy Perry'),
	('Firework',true,'4lCv7b86sLynZbXhfScfm2',8,'Katy Perry'),
	('Part Of Me',true,'1nZzRJbFvCEct3uzu04ZoL',8,'Katy Perry'),
	('Mayor que yo',true,'4n4CBlQVxxnU0MHGO5Mqv3',9,'Daddy Yankee'),
	('Una Vaina Loca',true,'3zb856RMKFjdvWre0TKcmA',10,'Fuego'),
	('Lo Que Pasó, Pasó',true,'6z5Xrx58p5Bs18RIe6KXbI',11,'Daddy Yankee'),
	('Salió El Sol',true,'48NXpYRuvv9izul4oXhqS9',12,'Don Omar'),
	('Dile',true,'69Ej1xrGjOcHvIMtMKxK0G',13,'Don Omar'),
	('Na De Na',true,'2Jz1X6ZB0gkkCVgmeVGVGp',14,'Angel y Khriz'),
	('Rakata',true,'5uVjUTstAPE3lhgjNSVGUB',15,'Wisin & Yandel'),
	('Cuentale',true,'4ocXAchdkulq97w6m1ZaPv',12,'Don Omar'),
	('Como Tu No Hay Dos',true,'5IypFJnPEwFAPDTRz14ijX',16,'Buxxi'),
	('Taboo',true,'4cyYC67XY3weSVmSLdKLP8',17,'Don Omar'),
	('Ven Bailalo',true,'5nZYc9ZDMhlXv6iWahZTU8',14,'Angel y Khriz'),
	('Es Un Secreto',true,'0R7DSnSibvuE4PEHqUayqf',18,'Plan B'),
	('Calma',true,'6aLJnupvPpT9HLv3xaUhe1',19,'Pedro Capó'),
	('Por Hacerme El Bueno',true,'1iEIQ69PuAM76GCBT9HCek',20,'Bacilos'),
	('Mi Primer Millon',true,'5fSDXbY8o9pA3TKwAbfwML',21,'Bacilos'),
	('Caraluna',true,'7DhYjNLksXZhbRQeheAums',21,'Bacilos'),
	('Tabaco Y Chanel',true,'48svUiwMMYQRPyesVEnof1',21,'Bacilos'),
	('Space Bound',true,'35kN1wEPub5ysY8q4fKK2h',22,'Eminem'),
	('Love The Way You Are',true,'4SiWJ0xSFdmTb0i379Uwny',22,'Eminem'),
	('Not Afraid',true,'6l75Og7UcnKVqM14tGhjD6',22,'Eminem'),
	('On Fire',true,'0KYeTrlyM0oF26jI6fWl4C',22,'Eminem'),
	('No Love',true,'6wrujrWK30hnVbpOJYbnQt',22,'Eminem'),
	('Cinderella Man',true,'2sTjfPFi1UthRs8qwaqMwB',22,'Eminem'),
	('Sing For The Moment',true,'217jPzlbFDCAPoOARhfUdH',23,'Eminem'),
	('Without Me',true,'1I1wdcCLTUe8qeg8NGICq0',23,'Eminem'),
	('Like Toy Soldiers',true,'1G3fgI4w0FmoNS8oLjLTaX',23,'Eminem'),
	('Lose Yourself',true,'1jS7v1W7iS5ND9IYqfOxWo',23,'Eminem'),
	('Just Lose It',true,'6onQaeFDa4kW00ee428KDl',23,'Eminem'),
	('The Real Slim Shaddy',true,'7Bi0aRtNAdchLnVBPjDrcx',23,'Eminem'),
	('My Name Is',true,'5FtID9cgz6hX35unvcxyHk',23,'Eminem');

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
	(9, 3),
	(1,22),
	(1,23),
	(1,24),
	(1,25),
	(1,26),
	(1,27),
	(1,28),
	(1,29),
	(1,31),
	(1,32),
	(5,41),
	(5,42),
	(5,43),
	(5,44);
	
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
	(8, 'Rock'),
	(9, 'Rock'),
	(10, 'Rock'),
	(11, 'Rock'),
	(12, 'Rock'),
	(13, 'Rock'),
	(14, 'Rock'),
	(15, 'Rock'),
	(16, 'Rock'),
	(17, 'Rock'),
	(18, 'Rock'),
	(18, 'Pop'),
	(19, 'Rock'),
	(19, 'Pop'),
	(20, 'Rock'),
	(20, 'Pop'),
	(21, 'Pop'),
	(22, 'Reggeaton'),
	(23, 'Reggeaton'),
	(24, 'Reggeaton'),
	(25, 'Reggeaton'),
	(26, 'Reggeaton'),
	(27, 'Reggeaton'),
	(28, 'Reggeaton'),
	(29, 'Reggeaton'),
	(30, 'Reggeaton'),
	(31, 'Reggeaton'),
	(32, 'Reggeaton'),
	(33, 'Reggeaton'),
	(34, 'Reggeaton'),
	(35, 'Pop'),
	(36, 'Pop'),
	(37, 'Pop'),
	(38, 'Pop'),
	(39, 'Rap'),
	(40, 'Rap'),
	(41, 'Rap'),
	(42, 'Rap'),
	(43, 'Rap'),
	(44, 'Rap'),
	(45, 'Rap'),
	(46, 'Rap'),
	(47, 'Rap'),
	(48, 'Rap'),
	(49, 'Rap'),
	(50, 'Rap'),
	(51, 'Rap');