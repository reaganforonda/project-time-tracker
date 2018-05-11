select sum(duration) as total_hrs, sum(total) as total_rev from jobs
join enteries on enteries.job_id = enteries.job_id
WHERE jobs.user_id = 1
AND jobs.completed = false
