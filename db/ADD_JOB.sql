INSERT INTO jobs
(client_id, user_id, job_name, start_date, completed, rate, description)
VALUES ($1, $2, $3, $4, $5, $6, $7)
RETURNING *;