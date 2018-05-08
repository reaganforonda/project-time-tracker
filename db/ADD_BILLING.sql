INSERT INTO billing
(job_id, client_id, user_id, invoice_date, total, due_date, invoice_number)
VALUES($1, $2, $3, $4, $5, $6, $7)
RETURNING *;