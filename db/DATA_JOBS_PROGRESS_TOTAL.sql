select sum(duration) as total_hrs, sum(total) as total_rev from enteries
join jobs on enteries.job_id = jobs.job_id
where enteries.user_id= $1
and jobs.completed = false