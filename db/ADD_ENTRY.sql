INSERT INTO enteries
(job_id, client_id, user_id, entry_date, start_time, end_time, duration, comment, billed)
VALUES
($2, $3, $1, $4, $5, $6, $7, $8, $9)
RETURNING *;