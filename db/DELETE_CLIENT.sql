DELETE FROM clients
WHERE client_id = $1
AND user_id = $2