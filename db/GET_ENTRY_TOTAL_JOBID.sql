SELECT SUM(total) from enteries
WHERE enteries.job_id = $1
AND enteries.user_id = $2