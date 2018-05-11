select clients.client_name, sum(duration) as total_hrs, sum(total) as total_revenue from enteries
join jobs on enteries.job_id = jobs.job_id
join clients on jobs.client_id = clients.client_id
WHERE enteries.user_id = $1
GROUP by clients.client_id