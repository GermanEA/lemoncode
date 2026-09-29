-- ============================================================
-- LemonMusic - Consultas obligatorias
-- ============================================================

-- Listar las pistas (tabla Track) con precio mayor o igual a 1€
SELECT *
FROM "Track"
WHERE "UnitPrice" >= 1;

-- Listar las pistas de más de 4 minutos de duración
-- (Milliseconds > 4 min = 240000 ms)
SELECT *
FROM "Track"
WHERE "Milliseconds" > 240000;

-- Listar las pistas que tengan entre 2 y 3 minutos de duración
-- (120000 ms = 2 min, 180000 ms = 3 min)
SELECT *
FROM "Track"
WHERE "Milliseconds" BETWEEN 120000 AND 180000;

-- Listar las pistas que uno de sus compositores (columna Composer) sea Mercury
SELECT *
FROM "Track"
WHERE "Composer" LIKE '%Mercury%';

-- Calcular la media de duración de las pistas (Track) de la plataforma
SELECT AVG("Milliseconds") AS media_ms,
       AVG("Milliseconds") / 60000.0 AS media_minutos
FROM "Track";

-- Listar los clientes (tabla Customer) de USA, Canada y Brazil
SELECT *
FROM "Customer"
WHERE "Country" IN ('USA', 'Canada', 'Brazil');

-- Listar todas las pistas del artista 'Queen' (Artist.Name = 'Queen')
SELECT t.*
FROM "Track" t
JOIN "Album" al ON t."AlbumId" = al."AlbumId"
JOIN "Artist" ar ON al."ArtistId" = ar."ArtistId"
WHERE ar."Name" = 'Queen';

-- Listar las pistas del artista 'Queen' en las que haya participado como compositor David Bowie
SELECT t.*
FROM "Track" t
JOIN "Album" al ON t."AlbumId" = al."AlbumId"
JOIN "Artist" ar ON al."ArtistId" = ar."ArtistId"
WHERE ar."Name" = 'Queen'
  AND t."Composer" LIKE '%David Bowie%';

-- Listar las pistas de la playlist 'Heavy Metal Classic'
SELECT t.*
FROM "Track" t
JOIN "PlaylistTrack" pt ON t."TrackId" = pt."TrackId"
JOIN "Playlist" p ON pt."PlaylistId" = p."PlaylistId"
WHERE p."Name" = 'Heavy Metal Classic';

-- Listar las playlist junto con el número de pistas que contienen
SELECT p."PlaylistId", p."Name", COUNT(pt."TrackId") AS num_pistas
FROM "Playlist" p
LEFT JOIN "PlaylistTrack" pt ON p."PlaylistId" = pt."PlaylistId"
GROUP BY p."PlaylistId", p."Name"
ORDER BY num_pistas DESC;

-- Listar las playlist (sin repetir ninguna) que tienen alguna canción de AC/DC
SELECT DISTINCT p."PlaylistId", p."Name"
FROM "Playlist" p
JOIN "PlaylistTrack" pt ON p."PlaylistId" = pt."PlaylistId"
JOIN "Track" t ON pt."TrackId" = t."TrackId"
JOIN "Album" al ON t."AlbumId" = al."AlbumId"
JOIN "Artist" ar ON al."ArtistId" = ar."ArtistId"
WHERE ar."Name" = 'AC/DC';

-- Listar las playlist que tienen alguna canción del artista Queen, junto con la cantidad que tienen
SELECT p."PlaylistId", p."Name", COUNT(t."TrackId") AS num_pistas_queen
FROM "Playlist" p
JOIN "PlaylistTrack" pt ON p."PlaylistId" = pt."PlaylistId"
JOIN "Track" t ON pt."TrackId" = t."TrackId"
JOIN "Album" al ON t."AlbumId" = al."AlbumId"
JOIN "Artist" ar ON al."ArtistId" = ar."ArtistId"
WHERE ar."Name" = 'Queen'
GROUP BY p."PlaylistId", p."Name"
ORDER BY num_pistas_queen DESC;

-- Listar las pistas que no están en ninguna playlist
SELECT t.*
FROM "Track" t
LEFT JOIN "PlaylistTrack" pt ON t."TrackId" = pt."TrackId"
WHERE pt."TrackId" IS NULL;

-- Listar los artistas que no tienen album
SELECT ar.*
FROM "Artist" ar
LEFT JOIN "Album" al ON ar."ArtistId" = al."ArtistId"
WHERE al."AlbumId" IS NULL;

-- Listar los artistas con el número de albums que tienen
-- (los artistas sin album aparecen con 0)
SELECT ar."ArtistId", ar."Name", COUNT(al."AlbumId") AS num_albums
FROM "Artist" ar
LEFT JOIN "Album" al ON ar."ArtistId" = al."ArtistId"
GROUP BY ar."ArtistId", ar."Name"
ORDER BY num_albums ASC, ar."Name";
