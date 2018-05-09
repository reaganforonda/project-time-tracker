UPDATE jobs
SET clocked_in=$3
where user_id = $1
AND job_id = $2
RETURNING *