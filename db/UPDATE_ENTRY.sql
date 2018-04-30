UPDATE enteries
SET end_time = $1, duration = $2
WHERE enteries.user_id = $3
AND enteries.job_id = $4
AND enteries.entry_id = $5