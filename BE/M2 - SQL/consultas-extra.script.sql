/* Listar las pistas ordenadas por el número de veces que aparecen en playlists de forma descendente */
SELECT t.TrackId, t.Name, COUNT(pt.PlaylistId) as Quantity FROM dbo.Track t INNER JOIN dbo.PlaylistTrack pt ON t.TrackId = pt.TrackId GROUP BY t.TrackId, t.Name ORDER BY Quantity DESC;

/* Listar las pistas más compradas (la tabla InvoiceLine tiene los registros de compras) */
SELECT t.TrackId, t.Name, COUNT(il.InvoiceLineId) AS TimesPurchased FROM dbo.Track t INNER JOIN dbo.InvoiceLine il ON t.TrackId = il.TrackId GROUP BY t.TrackId, t.Name ORDER BY TimesPurchased DESC, t.TrackId;

/* Listar las pistas más compradas (la tabla InvoiceLine tiene los registros de compras), pero solo va a mostrar las que tiene el valor máximo  */
SELECT 
    t.TrackId,
    t.Name,
    COUNT(il.InvoiceLineId) AS TimesPurchased
FROM dbo.Track t
INNER JOIN dbo.InvoiceLine il ON t.TrackId = il.TrackId
GROUP BY t.TrackId, t.Name
HAVING COUNT(il.InvoiceLineId) = (
    SELECT MAX(TimesPurchased)
    FROM (
        SELECT COUNT(*) AS TimesPurchased
        FROM dbo.InvoiceLine
        GROUP BY TrackId
    ) AS PurchaseCounts
)
ORDER BY t.TrackId;

/* Listar los artistas más comprados */
WITH ArtistPurchases AS (
    SELECT 
        ar.ArtistId,
        ar.Name,
        COUNT(il.InvoiceLineId) AS TimesPurchased
    FROM dbo.Artist ar
    INNER JOIN dbo.Album al ON ar.ArtistId = al.ArtistId
    INNER JOIN dbo.Track t ON al.AlbumId = t.AlbumId
    INNER JOIN dbo.InvoiceLine il ON t.TrackId = il.TrackId
    GROUP BY ar.ArtistId, ar.Name
),
MaxPurchases AS (
    SELECT MAX(TimesPurchased) AS MaxTimesPurchased FROM ArtistPurchases
)
SELECT 
    ap.ArtistId,
    ap.Name,
    ap.TimesPurchased
FROM ArtistPurchases ap
INNER JOIN MaxPurchases mp ON ap.TimesPurchased = mp.MaxTimesPurchased
ORDER BY ap.ArtistId;

/* Listar las pistas que aún no han sido compradas por nadie */
SELECT t.TrackId, t.Name FROM dbo.Track t LEFT JOIN dbo.InvoiceLine il ON t.TrackId = il.TrackId WHERE il.TrackId IS NULL;

/* Listar los artistas que aún no han vendido ninguna pista */
SELECT ar.ArtistId, ar.Name
FROM dbo.Artist ar
LEFT JOIN dbo.Album al ON ar.ArtistId = al.ArtistId
LEFT JOIN dbo.Track t ON al.AlbumId = t.AlbumId
LEFT JOIN dbo.InvoiceLine il ON t.TrackId = il.TrackId
WHERE il.InvoiceLineId IS NULL
GROUP BY ar.ArtistId, ar.Name;