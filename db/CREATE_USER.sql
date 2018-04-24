INSERT INTO users
(auth_id, user_name, picture, first_name, last_name)
VALUES($1, $2, $3, $4, $5)
RETURNING *;