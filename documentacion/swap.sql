CREATE TABLE monitor (
  name VARCHAR(30) PRIMARY KEY
);

CREATE TABLE swapUser (
	username VARCHAR(30) PRIMARY KEY, 
	password VARCHAR(50), 
	name VARCHAR(50),
	playback INT,
	admin BOOL,
  monitor VARCHAR(30),
  CONSTRAINT fk_user_monitor FOREIGN KEY (monitor)
	REFERENCES monitor(name)
);

CREATE TABLE operation ( 
  id SERIAL PRIMARY KEY, 
  description VARCHAR(100)
);

CREATE TABLE monitoroperation (
  monitor VARCHAR(30),
  operationid INT,
  CONSTRAINT fk_monitor_operation FOREIGN KEY (monitor)
	REFERENCES monitor(name),
  CONSTRAINT fk_operation_monitor FOREIGN KEY (operationid)
	REFERENCES operation(id)
);

CREATE TABLE premiumUser (
	username VARCHAR(30),
	subscription DATE,
	CONSTRAINT fk_premium_user FOREIGN KEY (username)
	REFERENCES swapUser(username) 
	ON DELETE CASCADE ON UPDATE CASCADE,
  UNIQUE (username)
);
	
CREATE TABLE freeUser (
	username VARCHAR(30),
  active BOOL,
	playbackLeft INT, 
	lastPlay DATE,
	CONSTRAINT fk_free_user FOREIGN KEY (username)
	REFERENCES swapUser(username) 
	ON DELETE CASCADE ON UPDATE CASCADE,
  UNIQUE (username)
);	
	
CREATE TABLE artist (
	username VARCHAR(30),
	artistName VARCHAR(30) PRIMARY KEY,
	playbackThreeMonths INT,
	playbackSixMonths INT,
	startRecord DATE,
  active BOOL,
	CONSTRAINT fk_artist_user FOREIGN KEY (username)
	REFERENCES swapUser(username) 
	ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE userPlaylist (
	playlistId SERIAL PRIMARY KEY,
	username VARCHAR(30),
	playlistName VARCHAR(30),
	UNIQUE (username, playlistName),
	CONSTRAINT fk_playlist_user FOREIGN KEY (username)
	REFERENCES swapUser(username) 
	ON DELETE CASCADE ON UPDATE CASCADE
);
	
CREATE TABLE album (
	albumID SERIAL PRIMARY KEY,
	albumName VARCHAR(50),
	author VARCHAR(30),
	release DATE,
	CONSTRAINT fk_album_artist FOREIGN KEY (author)
	REFERENCES artist(artistName) 
	ON DELETE CASCADE ON UPDATE CASCADE
);
	
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
	ON DELETE CASCADE ON UPDATE CASCADE
);
	
CREATE TABLE playlistSongs (
	playlistId INT,
	songId INT,
  UNIQUE (playlistId, songId),
	CONSTRAINT fk_playlist FOREIGN KEY (playlistId)
	REFERENCES userPlaylist(playlistId) 
	ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_song FOREIGN KEY (songId)
	REFERENCES song(songId) 
	ON DELETE CASCADE ON UPDATE CASCADE
);	

CREATE TABLE genre (
	songId INT,
	songGenre VARCHAR(50),
	CONSTRAINT fk_genre_song FOREIGN KEY (songId)
	REFERENCES song(songId) 
	ON DELETE CASCADE ON UPDATE CASCADE,
	UNIQUE(songId, songGenre)
);

CREATE TABLE binnacle (
  username VARCHAR(30),
  datee DATE,
  timee TIME,
  affected VARCHAR(30),
  operation VARCHAR(30),
  CONSTRAINT fk_user_binnacle FOREIGN KEY (username)
	REFERENCES swapuser(username) 
	ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO monitor (name) VALUES
  ('default'),
  ('monitor 1'),
  ('monitor 2'),
  ('op');

INSERT INTO operation (description) VALUES
  ('edit track and album'),
  ('disable track and album'),
  ('disable free user'),
  ('unpremium a user'),
  ('disable artist'),
  ('associate monitor'),
  ('watch statistics'),
  ('watch binnacle');

INSERT INTO monitoroperation (monitor, operationid) VALUES
  ('monitor 1', 1),
  ('monitor 1', 2),
  ('monitor 1', 4),
  ('monitor 1', 6),
  ('monitor 1', 7),
  ('monitor 2', 3),
  ('monitor 2', 4),
  ('monitor 2', 5),
  ('monitor 2', 6),
  ('monitor 2', 7),
  ('op', 1),
  ('op', 2),
  ('op', 3),
  ('op', 4),
  ('op', 5),
  ('op', 6),
  ('op', 7),
  ('op', 8);

INSERT INTO swapUser (username, password, name,  playback, admin, monitor) VALUES 
	('bato007', 'hola123', 'brandon', 2, false, 'op'),
	('requetetin', 'quezo', 'martin', 5, false, 'default'),
	('diego586', 'quepex', 'diego', 3, false, 'monitor 1'),
	('admin', 'adminswap', 'rodolfo', 0, true, 'default'),
	('ruther', 'salmon', 'pez', 0, false, 'default'),
	('pepe22', 'roxtar', 'rudeus', 53, false, 'default'),
	('dave grohl', 'foo', 'dave grohl', 500, false, 'monitor 1'),
	('ac/dc', 'acdc', 'ac/dc', 385, false, 'default'),
	('katy perry', 'soykaty', 'daty perry', 547, false, 'default'),
	('soyeldaddy', 'daddy', 'daddy yankee', 847, false, 'default'),
	('fuego', 'fire', 'fuego', 287, false, 'default'),
	('don omar', 'omarcito', 'don omar', 147, false, 'default'),
	('angel y khriz', 'ayk', 'angel y khriz', 415, false, 'default'),
	('wisin & yandel', 'wy', 'wisin & yandel', 378, false, 'default'),
	('buxxi', 'labux', 'buxxi', 148, false, 'default'),
	('plan b', 'bplan', 'plan b', 175, false, 'default'),
	('elcapo', 'capito', 'pedro', 854, false, 'monitor 1'),
	('bacilos', 'bcls', 'bacilos', 1000, false, 'monitor 2'),
	('eminem', 'mandm', 'marshall', 2000, false, 'default'),
	('swap', 'swapirte', 'swap', 4, true, 'monitor 2');
	
INSERT INTO premiumUser (username, subscription) VALUES
	('bato007', '2021-03-16'),
	('requetetin', '2021-02-12'),
	('diego586', '2021-01-01'),
	('admin', '2020-12-21'),
	('swap', '2021-03-16');
	
INSERT INTO freeUser (username, playbackLeft, lastPlay, active) VALUES
	('ruther', 3, '2021-03-16', true),
	('pepe22', 3, '2021-03-16', true),
	('dave grohl', 3, '2021-03-16', true),
	('ac/dc', 3, '2021-03-16', true),
	('katy perry', 3, '2021-03-16', false),
	('soyeldaddy', 3, '2021-03-16', false),
	('fuego', 3, '2021-03-16', true),
	('don omar', 3, '2021-03-16', true),
	('angel y khriz', 3, '2021-03-16', true),
	('wisin & yandel',3, '2021-03-16', false),
	('buxxi', 3, '2021-03-16', true),
	('plan b', 3, '2021-03-16', true),
	('elcapo', 3, '2021-03-16', true),
	('bacilos', 3, '2021-03-16', true),
	('eminem', 3, '2021-03-16', false),
	('swap', 3, '2021-03-16', true);
	
INSERT INTO artist (username, artistName, playbackThreeMonths, playbackSixMonths, startRecord) VALUES
	('bato007', 'batoux', 234, 125, '2020-09-01'),
	('pepe22', 'el pepe', 2332, 1253, '2020-08-01'),
	('diego586', 'xdiegox', 4322, 1125, '2020-08-23'),
	('ac/dc', 'ac/dc', 500, 250, '1994-05-05'),
	('katy perry', 'katy perry', 250, 385, '2004-01-06'),
	('soyeldaddy', 'daddy yankee', 509, 384, '2000-06-09'),
	('fuego', 'fuego', 547, 874, '2003-12-04'),
	('don omar', 'don omar', 412, 693, '2005-08-07'),
	('angel y khriz', 'angel y khriz', 147, 247, '2009-07-12'),
	('wisin & yandel', 'wisin & yandel', 456, 654, '1999-11-07'),
	('buxxi', 'buxxi', 412, 124, '2015-09-08'),	
	('plan b', 'plan b', 148, 169, '2008-04-08'),
	('elcapo', 'pedro capó', 258, 147, '1997-05-06'),
	('bacilos', 'bacilos', 549, 1059, '1994-01-09'),
	('eminem', 'eminem', 1056, 2056, '1993-02-05'),
	('dave grohl', 'foo fighters', 521, 821, '1990-04-02');
	
INSERT INTO userPlaylist (username, playlistName) VALUES
	('bato007', 'perreo intenso'),
	('bato007', 'electronica'),
	('bato007', 'k-pop'),
	('requetetin', 'solo dance'),
	('requetetin', '80s'),
	('diego586', 'para fiestas'),
	('diego586', 'pa carrear'),
	('ruther', 'viernes'),
	('pepe22', 'le pepe');
	
INSERT INTO album (albumName, author, release) VALUES
	('fantastic', 'batoux', '2021-01-2'),
	('el pepe', 'el pepe', '2020-12-29'),
	('pepiando', 'el pepe', '2021-02-23'),
	('concrete and gold', 'foo fighters', '2017-09-15'),
	('one by one', 'foo fighters', '2002-10-22'),
	('greatest hit', 'foo fighters', '2002-10-22'),
	('back in black', 'ac/dc', '1980-06-25'),
	('teenage tream', 'katy perry', '2012-03-23'),
	('infinite summer', 'daddy yankee', '2005-02-03'),
	('una vaina loca', 'fuego', '2011-04-05'),
	('barrio fino', 'daddy yankee', '2004-06-13'),
	('king of kings', 'don omar', '2006-05-23'),
	('the last don', 'don omar', '2003-07-17'),
	('showtime', 'angel y khriz', '2008-03-11'),
	('reggaeton de los 00`s', 'wisin & yandel', '2008-04-11'),
	('como tu no hay dos', 'buxxi', '2011-10-31'),
	('meet the orphans', 'don omar', '2010-11-16'),
	('house of pleasure', 'plan b', '2010-07-20'),
	('calma', 'pedro capó', '2018-10-05'),
	('donde nos quedamos', 'bacilos', '2018-08-24'),
	('caraluna', 'bacilos', '2002-07-16'),
	('bacilos', 'bacilos', '2005-07-05'),
	('recovery', 'eminem', '2010-06-18'),
	('curtain call: the hits', 'eminem', '2005-12-06');

INSERT INTO song (songName, active, songLink, albumId, author, timesplayed) VALUES 
	('retaul', true, '3AzjcOeAmA57TIOr9zF1ZW', 1, 'batoux', 3809),
	('tu y el cielo', true, '1tvdNGCcgAhYaYq7ouIYGJ', 1, 'batoux', 2668),
	('pepiando', true, '2JnB4v20rQApsTAo3Zr897', 2, 'el pepe', 9018),
	('rojel', true, '1LCmyXC3R887UdD2w4BdDK', 2, 'el pepe', 8009),
	('yelt', true, '7l8LNBT0elIlf3Xtus6dge', 3, 'el pepe', 7996),
	('barrio', true, '0Lp7BrpERgQEgdaZTaGWCH', 3, 'el pepe', 3279),
	('trueno', false, '2GnacDJMzmbRxNhfwpzO06', 3, 'el pepe', 1865),
	('run',true,'1wLQwg0mloy3yXjL0jPE0N',5,'foo fighters', 5222),
	('the sky is a neighborhood',true,'3kdMzXOcrDIdSWLdONHNK5',5,'foo fighters', 9515),
	('the line',true,'7hlLPJo0pxh1jQUERqf5O2',5,'foo fighters', 7075),
	('all my life',true,'6tsojOQ5wHaIjKqIryLZK6',6,'foo fighters', 3068),
	('times like these',true,'67vYdAAM3oGsEImCRfbtsF',6,'foo fighters', 1278),
	('everlong',true,'5UWwZ5lm5PKu6eKsHAGxOk',6,'foo fighters', 5791),
	('best of you',true,'5FZxsHWIvUsmSK1IAvm2pp',6,'foo fighters', 319),
	('hells bells',true,'69QHm3pustz01CJRwdo20z',7,'ac/dc', 9238),
	('shoot to thrill',true,'0C80GCp0mMuBzLf3EAXqxv',7,'ac/dc', 9822),
	('back in black',true,'08mG3Y1vljYA6bvDt4Wqkj',7,'ac/dc', 6380),
	('teenage dream',true,'55qBw1900pZKfXJ6Q9A2Lc',8,'katy perry', 7142),
	('last friday night',true,'455AfCsOhhLPRc68sE01D8',8,'katy perry', 3487),
	('firework',true,'4lCv7b86sLynZbXhfScfm2',8,'katy perry', 3707),
	('part of me',true,'1nZzRJbFvCEct3uzu04ZoL',8,'katy perry', 9615),
	('mayor que yo',true,'4n4CBlQVxxnU0MHGO5Mqv3',9,'daddy yankee', 2413),
	('una vaina loca',true,'3zb856RMKFjdvWre0TKcmA',10,'fuego', 4055),
	('lo que pasó, pasó',true,'6z5Xrx58p5Bs18RIe6KXbI',11,'daddy yankee', 7880),
	('salió el sol',true,'48NXpYRuvv9izul4oXhqS9',12,'don omar', 265),
	('dile',true,'69Ej1xrGjOcHvIMtMKxK0G',13,'don omar', 8215),
	('na de na',true,'2Jz1X6ZB0gkkCVgmeVGVGp',14,'angel y khriz', 5148),
	('rakata',true,'5uVjUTstAPE3lhgjNSVGUB',15,'wisin & yandel', 6273),
	('cuentale',true,'4ocXAchdkulq97w6m1ZaPv',12,'don omar', 6168),
	('como tu no hay dos',true,'5IypFJnPEwFAPDTRz14ijX',16,'buxxi', 720),
	('taboo',true,'4cyYC67XY3weSVmSLdKLP8',17,'don omar', 7178),
	('ven bailalo',true,'5nZYc9ZDMhlXv6iWahZTU8',14,'angel y khriz', 8134),
	('es un secreto',true,'0R7DSnSibvuE4PEHqUayqf',18,'plan b', 3721),
	('calma',true,'6aLJnupvPpT9HLv3xaUhe1',19,'pedro capó', 4924),
	('por hacerme el bueno',true,'1iEIQ69PuAM76GCBT9HCek',20,'bacilos', 9752),
	('mi primer millon',true,'5fSDXbY8o9pA3TKwAbfwML',21,'bacilos', 3661),
	('caraluna',true,'7DhYjNLksXZhbRQeheAums',21,'bacilos', 7303),
	('tabaco y chanel',true,'48svUiwMMYQRPyesVEnof1',21,'bacilos', 4843),
	('space bound',true,'35kN1wEPub5ysY8q4fKK2h',22,'eminem', 7792),
	('love the way you are',true,'4SiWJ0xSFdmTb0i379Uwny',22,'eminem', 2964),
	('not afraid',true,'6l75Og7UcnKVqM14tGhjD6',22,'eminem', 6525),
	('on fire',true,'0KYeTrlyM0oF26jI6fWl4C',22,'eminem', 1292),
	('no love',true,'6wrujrWK30hnVbpOJYbnQt',22,'eminem', 7050),
	('cinderella man',true,'2sTjfPFi1UthRs8qwaqMwB',22,'eminem', 9425),
	('sing for the moment',true,'217jPzlbFDCAPoOARhfUdH',23,'eminem', 9032),
	('without me',true,'1I1wdcCLTUe8qeg8NGICq0',23,'eminem', 1906),
	('like toy soldiers',true,'1G3fgI4w0FmoNS8oLjLTaX',23,'eminem', 3121),
	('lose yourself',true,'1jS7v1W7iS5ND9IYqfOxWo',23,'eminem', 3764),
	('just lose it',true,'6onQaeFDa4kW00ee428KDl',23,'eminem', 9396),
	('the real slim shaddy',true,'7Bi0aRtNAdchLnVBPjDrcx',23,'eminem', 433),
	('my name is',true,'5FtID9cgz6hX35unvcxyHk',23,'eminem', 934);

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
	(1, 'rock'),
	(1, 'blues'),
	(2, 'jazz'),
	(3, 'rock'),
	(4, 'pop'),
	(5, 'pop'),
	(5, 'heavy metal'),
	(5, 'punk funk'),
	(6, 'disco'),
	(6, 'electro pop'),
	(7, 'pop'),
	(8, 'rock'),
	(9, 'rock'),
	(10, 'rock'),
	(11, 'rock'),
	(12, 'rock'),
	(13, 'rock'),
	(14, 'rock'),
	(15, 'rock'),
	(16, 'rock'),
	(17, 'rock'),
	(18, 'rock'),
	(18, 'pop'),
	(19, 'rock'),
	(19, 'pop'),
	(20, 'rock'),
	(20, 'pop'),
	(21, 'pop'),
	(22, 'reggeaton'),
	(23, 'reggeaton'),
	(24, 'reggeaton'),
	(25, 'reggeaton'),
	(26, 'reggeaton'),
	(27, 'reggeaton'),
	(28, 'reggeaton'),
	(29, 'reggeaton'),
	(30, 'reggeaton'),
	(31, 'reggeaton'),
	(32, 'reggeaton'),
	(33, 'reggeaton'),
	(34, 'reggeaton'),
	(35, 'pop'),
	(36, 'pop'),
	(37, 'pop'),
	(38, 'pop'),
	(39, 'rap'),
	(40, 'rap'),
	(41, 'rap'),
	(42, 'rap'),
	(43, 'rap'),
	(44, 'rap'),
	(45, 'rap'),
	(46, 'rap'),
	(47, 'rap'),
	(48, 'rap'),
	(49, 'rap'),
	(50, 'rap'),
	(51, 'rap');

CREATE OR REPLACE FUNCTION insert_all_genres(int, text[]) RETURNS VOID AS $$
DECLARE
id ALIAS FOR $1;
genres ALIAS FOR $2;
x text;
	BEGIN
		FOREACH x IN ARRAY genres
		LOOP
			INSERT INTO genre VALUES (id, x);
		END LOOP;
	END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION insert_binnacle() RETURNS TRIGGER AS $$
DECLARE
swap_name text;
ttable text;
operation text;
	BEGIN
	ttable := TG_ARGV[0];
	operation := TG_ARGV[1];
	
    CREATE TEMP TABLE IF NOT EXISTS user_history (
      username VARCHAR(30)
    );

    SELECT username INTO swap_name FROM user_history;

		INSERT INTO binnacle VALUES 
      (swap_name, (SELECT current_date), (SELECT  now()::TIMESTAMP(0)::TIME), ttable, operation);
	
	RETURN NEW;
	END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION delete_monitor() RETURNS TRIGGER AS $$
	BEGIN
    UPDATE swapuser SET
    monitor = 'default'
    WHERE monitor = OLD.name;
	RETURN NEW;
	END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER onmonitor
BEFORE DELETE ON monitor
FOR EACH ROW 
EXECUTE PROCEDURE delete_monitor();

-- Usuarios 
CREATE TRIGGER updateuser
AFTER UPDATE ON swapuser
FOR EACH ROW 
EXECUTE PROCEDURE insert_binnacle('user', 'update');

CREATE TRIGGER deleteuser
AFTER DELETE ON swapuser
FOR EACH ROW 
EXECUTE PROCEDURE insert_binnacle('user', 'delete');

CREATE TRIGGER insertuser
AFTER INSERT ON swapuser
FOR EACH ROW 
EXECUTE PROCEDURE insert_binnacle('user', 'insert');

CREATE TRIGGER updatepremium
AFTER UPDATE ON premiumuser
FOR EACH ROW 
EXECUTE PROCEDURE insert_binnacle('premium-user', 'update');

CREATE TRIGGER deletepremium
AFTER DELETE ON premiumuser
FOR EACH ROW 
EXECUTE PROCEDURE insert_binnacle('premium-user', 'delete');

CREATE TRIGGER insertpremium
AFTER INSERT ON premiumuser
FOR EACH ROW 
EXECUTE PROCEDURE insert_binnacle('premium-user', 'insert');

CREATE TRIGGER updatefree
AFTER UPDATE ON freeuser
FOR EACH ROW 
EXECUTE PROCEDURE insert_binnacle('free-user', 'update');

CREATE TRIGGER deletefree
AFTER DELETE ON freeuser
FOR EACH ROW 
EXECUTE PROCEDURE insert_binnacle('free-user', 'delete');

CREATE TRIGGER insertfree
AFTER INSERT ON freeuser
FOR EACH ROW 
EXECUTE PROCEDURE insert_binnacle('free-user', 'insert');

-- Artist
CREATE TRIGGER updateartist
AFTER UPDATE ON artist
FOR EACH ROW 
EXECUTE PROCEDURE insert_binnacle('artist', 'update');

CREATE TRIGGER deleteartist
AFTER DELETE ON artist
FOR EACH ROW 
EXECUTE PROCEDURE insert_binnacle('artist', 'delete');

CREATE TRIGGER insertartist
AFTER INSERT ON artist
FOR EACH ROW 
EXECUTE PROCEDURE insert_binnacle('artist', 'insert');

-- Album
CREATE TRIGGER updatealbum
AFTER UPDATE ON album
FOR EACH ROW 
EXECUTE PROCEDURE insert_binnacle('album', 'update');

CREATE TRIGGER deletealbum
AFTER DELETE ON album
FOR EACH ROW 
EXECUTE PROCEDURE insert_binnacle('album', 'delete');

CREATE TRIGGER insertuser
AFTER INSERT ON album
FOR EACH ROW 
EXECUTE PROCEDURE insert_binnacle('album', 'insert');

-- Playlist
CREATE TRIGGER updateplaylist
AFTER UPDATE ON userplaylist
FOR EACH ROW 
EXECUTE PROCEDURE insert_binnacle('playlist', 'update');

CREATE TRIGGER deleteplaylist
AFTER DELETE ON userplaylist
FOR EACH ROW 
EXECUTE PROCEDURE insert_binnacle('playlist', 'delete');

CREATE TRIGGER insertplaylist
AFTER INSERT ON userplaylist
FOR EACH ROW 
EXECUTE PROCEDURE insert_binnacle('playlist', 'insert');

CREATE TRIGGER updateplaylist_song
AFTER UPDATE ON playlistsongs
FOR EACH ROW 
EXECUTE PROCEDURE insert_binnacle('playlist-song', 'update');

CREATE TRIGGER deleteplaylist_song
AFTER DELETE ON playlistsongs
FOR EACH ROW 
EXECUTE PROCEDURE insert_binnacle('playlist-song', 'delete');

CREATE TRIGGER insertplaylist_song
AFTER INSERT ON playlistsongs
FOR EACH ROW 
EXECUTE PROCEDURE insert_binnacle('playlist-song', 'insert');

-- Tracks
CREATE TRIGGER updatesong
AFTER UPDATE ON song
FOR EACH ROW 
EXECUTE PROCEDURE insert_binnacle('song', 'update');

CREATE TRIGGER deletesong
AFTER DELETE ON song
FOR EACH ROW 
EXECUTE PROCEDURE insert_binnacle('song', 'delete');

CREATE TRIGGER insertsong
AFTER INSERT ON song
FOR EACH ROW 
EXECUTE PROCEDURE insert_binnacle('song', 'insert');

CREATE TRIGGER updatesong_genre
AFTER UPDATE ON genre
FOR EACH ROW 
EXECUTE PROCEDURE insert_binnacle('song-genre', 'update');

CREATE TRIGGER deletesong_genre
AFTER DELETE ON genre
FOR EACH ROW 
EXECUTE PROCEDURE insert_binnacle('song-genre', 'delete');

CREATE TRIGGER insertsong_genre
AFTER INSERT ON genre
FOR EACH ROW 
EXECUTE PROCEDURE insert_binnacle('song-genre', 'insert');

CREATE INDEX I_user_binnacle ON binnacle(username);
CREATE INDEX I_operation_binnacle ON binnacle(operation);
