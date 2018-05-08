SELECT entry_id, jobs.job_id, clients.client_id, users.user_id, jobs.job_name, clients.client_name, entry_date, start_time, end_time, duration
FROM enteries
JOIN users on enteries.user_id = users.user_id
JOIN clients on enteries.client_id = clients.client_id
JOIN jobs on enteries.job_id = jobs.job_id
WHERE jobs.completed = false
AND users.user_id = $1