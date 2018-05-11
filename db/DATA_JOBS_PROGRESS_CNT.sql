select count(*) from jobs
WHERE jobs.user_id = $1
AND completed = false