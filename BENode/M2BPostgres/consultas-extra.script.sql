-- ============================================================
-- LemonMusic - Consultas extra (opcional)
-- ============================================================

-- Listar las pistas ordenadas por el número de veces que aparecen en playlists de forma descendente
SELECT t."TrackId", t."Name", COUNT(pt."PlaylistId") AS veces_en_playlists
FROM "Track" t
LEFT JOIN "PlaylistTrack" pt ON t."TrackId" = pt."TrackId"
GROUP BY t."TrackId", t."Name"
ORDER BY veces_en_playlists DESC;

-- Listar las pistas más compradas (la tabla InvoiceLine tiene los registros de compras)
SELECT t."TrackId", t."Name", SUM(il."Quantity") AS unidades_vendidas
FROM "Track" t
JOIN "InvoiceLine" il ON t."TrackId" = il."TrackId"
GROUP BY t."TrackId", t."Name"
ORDER BY unidades_vendidas DESC;

-- Listar los artistas más comprados
SELECT ar."ArtistId", ar."Name", SUM(il."Quantity") AS unidades_vendidas
FROM "Artist" ar
JOIN "Album" al ON ar."ArtistId" = al."ArtistId"
JOIN "Track" t ON al."AlbumId" = t."AlbumId"
JOIN "InvoiceLine" il ON t."TrackId" = il."TrackId"
GROUP BY ar."ArtistId", ar."Name"
ORDER BY unidades_vendidas DESC;

-- Listar las pistas que aún no han sido compradas por nadie
SELECT t.*
FROM "Track" t
LEFT JOIN "InvoiceLine" il ON t."TrackId" = il."TrackId"
WHERE il."InvoiceLineId" IS NULL;

-- Listar los artistas que aún no han vendido ninguna pista
SELECT ar."ArtistId", ar."Name"
FROM "Artist" ar
WHERE ar."ArtistId" NOT IN (
    SELECT DISTINCT al."ArtistId"
    FROM "Album" al
    JOIN "Track" t ON al."AlbumId" = t."AlbumId"
    JOIN "InvoiceLine" il ON t."TrackId" = il."TrackId"
);
