SELECT job_id, job_name, jobs.client_id, client_name, jobs.start_date, jobs.end_date, rate, completed, jobs.description, jobs.clocked_in
FROM jobs
JOIN users ON jobs.user_id = users.user_id
JOIN clients on jobs.client_id = clients.client_id
WHERE completed = false
AND jobs.user_id = $1
AND jobs.clocked_in = false