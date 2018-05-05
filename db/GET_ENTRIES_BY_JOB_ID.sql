SELECT *
FROM
enteries
WHERE enteries.user_id = $1
AND
enteries.job_id = $2