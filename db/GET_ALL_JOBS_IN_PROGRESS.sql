SELECT job_id, job_name, client_name, rate, completed
FROM jobs
JOIN users ON jobs.user_id = users.user_id
JOIN clients on jobs.client_id = clients.client_id
WHERE completed = false