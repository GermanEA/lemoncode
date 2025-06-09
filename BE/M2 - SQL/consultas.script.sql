/* Listar las pistas (tabla Track) con precio mayor o igual a 1€ */
SELECT * FROM dbo.Track t WHERE t.UnitPrice > 1;

/* Listar las pistas de más de 4 minutos de duración */
SELECT * FROM dbo.Track t WHERE t.Milliseconds >= 240000;

/* Listar las pistas que tengan entre 2 y 3 minutos de duración */
SELECT * FROM dbo.Track t WHERE t.Milliseconds BETWEEN 120000 AND 180000;

/* Listar las pistas que uno de sus compositores (columna Composer) sea Mercury */
SELECT * FROM dbo.Track t WHERE t.Composer LIKE ('%Mercury%');

/* Calcular la media de duración de las pistas (Track) de la plataforma */
SELECT AVG(t.Milliseconds) AS Media FROM dbo.Track t;

/* Listar los clientes (tabla Customer) de USA, Canada y Brazil */
SELECT * FROM dbo.Customer c WHERE c.Country IN ('USA', 'Canada', 'Brazil');

/* Listar todas las pistas del artista 'Queen' (Artist.Name = 'Queen') */
SELECT *, AlbumId FROM dbo.track t WHERE t.AlbumId IN (SELECT a.AlbumId AS AlbumId FROM dbo.Album a INNER JOIN dbo.Artist as ar ON a.ArtistId = ar.ArtistId WHERE ar.Name LIKE '%Queen%');

/* Listar todas las pistas del artista 'Queen' (Artist.Name = 'Queen') OTRA FORMA */
SELECT * FROM dbo.Track t INNER JOIN dbo.Album a ON t.AlbumId = a.AlbumId INNER JOIN dbo.Artist ar ON a.ArtistId = ar.ArtistId WHERE ar.Name LIKE '%Queen%'; 

/* Listar las pistas del artista 'Queen' en las que haya participado como compositor David Bowie */
SELECT *, AlbumId FROM dbo.track t WHERE t.AlbumId IN (SELECT a.AlbumId AS AlbumId FROM dbo.Album a INNER JOIN dbo.Artist ar ON a.ArtistId = ar.ArtistId WHERE ar.Name LIKE '%Queen%') AND t.Composer LIKE ('%David Bowie%');

/* Listar las pistas del artista 'Queen' en las que haya participado como compositor David Bowie OTRA FORMA */
SELECT * FROM dbo.Track t INNER JOIN dbo.Album a ON t.AlbumId = a.AlbumId INNER JOIN dbo.Artist as ar ON a.ArtistId = ar.ArtistId WHERE ar.Name LIKE '%Queen%' AND t.Composer LIKE ('%David Bowie%');

/*Listar las pistas de la playlist 'Heavy Metal Classic' */
SELECT * FROM dbo.Track t INNER JOIN dbo.PlaylistTrack p ON t.TrackId = p.TrackId INNER JOIN dbo.Playlist pl ON p.PlaylistId = pl.PlaylistId WHERE pl.Name = 'Heavy Metal Classic';

/* Listar las playlist junto con el número de pistas que contienen */
SELECT p.PlaylistId, p.Name AS PlaylistName, COUNT(pt.TrackId) AS NumberOftracks FROM dbo.Playlist p INNER JOIN dbo.PlaylistTrack pt ON p.PlaylistId = pt.PlaylistId GROUP BY p.PlaylistId, p.Name;

/* Listar las playlist junto con el número de pistas que contienen (CON CEROS)*/
SELECT p.PlaylistId, p.Name AS PlaylistName, COUNT(pt.TrackId) AS NumberOftracks FROM dbo.Playlist p LEFT JOIN dbo.PlaylistTrack pt ON p.PlaylistId = pt.PlaylistId GROUP BY p.PlaylistId, p.Name;

/* Listar las playlist (sin repetir ninguna) que tienen alguna canción de AC/DC */
SELECT DISTINCT p.PlaylistId, p.Name AS PlaylistName FROM dbo.Playlist p 
	INNER JOIN dbo.PlaylistTrack pt ON p.PlaylistId = pt.PlaylistId
	INNER JOIN dbo.Track t ON pt.TrackId = t.TrackId
	INNER JOIN dbo.Album a ON t.AlbumId = a.AlbumId
	INNER JOIN dbo.Artist ar ON a.ArtistId = ar.ArtistId
	WHERE ar.Name = 'AC/DC';

/* Listar las playlist que tienen alguna canción del artista Queen, junto con la cantidad que tienen */
SELECT DISTINCT p.PlaylistId, p.Name AS PlaylistName, COUNT(t.TrackId) AS Quantity FROM dbo.Playlist p 
	INNER JOIN dbo.PlaylistTrack pt ON p.PlaylistId = pt.PlaylistId
	INNER JOIN dbo.Track t ON pt.TrackId = t.TrackId
	INNER JOIN dbo.Album a ON t.AlbumId = a.AlbumId
	INNER JOIN dbo.Artist ar ON a.ArtistId = ar.ArtistId
	WHERE ar.Name = 'Queen'
	GROUP BY p.PlaylistId, p.Name;

/* Listar las pistas que no están en ninguna playlist */
SELECT * FROM dbo.Track t LEFT JOIN dbo.PlaylistTrack pt ON t.TrackId = pt.TrackId WHERE pt.TrackId IS NULL;

/* Listar los artistas que no tienen album */
SELECT ar.ArtistId, ar.Name, al.AlbumId FROM dbo.Artist ar LEFT JOIN dbo.Album al ON ar.ArtistId = al.ArtistId WHERE al.AlbumId IS NULL;

/* Listar los artistas con el número de albums que tienen */
SELECT ar.ArtistId, ar.Name, COUNT(al.AlbumId) AS Quantity FROM dbo.Artist ar LEFT JOIN dbo.Album al ON ar.ArtistId = al.ArtistId GROUP BY ar.ArtistId, ar.Name;