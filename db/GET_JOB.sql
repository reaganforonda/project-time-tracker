SELECT * 
FROM jobs
WHERE jobs.user_id = $1
AND jobs.job_id = $2