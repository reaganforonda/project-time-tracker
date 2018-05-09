select jobs.job_id, jobs.job_name, jobs.rate, clients.client_id, clients.client_name, clients.address_one, clients.address_two, clients.phone, clients.city, clients.state, clients.zip, sum(enteries.duration) as total_hrs, sum(enteries.total) as total
from enteries
join jobs on enteries.job_id = jobs.job_id
join clients on enteries.client_id = clients.client_id
where enteries.user_id = $1
AND jobs.completed = false
group by jobs.job_id, clients.client_id