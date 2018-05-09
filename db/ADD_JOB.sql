INSERT INTO jobs
(client_id, user_id, job_name, start_date, completed, rate, description, clocked_in)
VALUES ($1, $2, $3, $4, $5, $6, $7, false)
RETURNING *;