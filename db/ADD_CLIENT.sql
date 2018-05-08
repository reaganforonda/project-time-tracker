INSERT INTO clients
(user_id, client_name, address_one, address_two, city, state, country, phone, website, zip, active, email)
VALUES
($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
RETURNING *;