SELECT * FROM enteries
JOIN jobs on enteries.job_id = jobs.job_id
WHERE enteries.job_id = $1
AND enteries.user_id = $2
AND enteries.entry_id = $3