UPDATE jobs
SET end_date=$1, completed=true
WHERE user_id = $2
AND job_id = $3