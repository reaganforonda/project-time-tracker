UPDATE enteries
SET entry_date = $1, start_time = $2, end_time = $3, duration = $4, total=$5, comment=$6
WHERE user_id = $7
AND entry_id = $8
AND job_id = $9