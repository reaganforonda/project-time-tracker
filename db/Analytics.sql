-- GET Total Revenue of All Jobs
select sum(enteries.total) from jobs
join enteries on jobs.job_id = enteries.job_id
where jobs.user_id = 1;

-- GET Total Hours of All Jobs
select sum(enteries.duration) from jobs
join enteries on jobs.job_id = enteries.job_id;

-- GET Revenue, By Job
select jobs.job_id, jobs.job_name, sum(enteries.total) as total_revenue from jobs
join enteries on jobs.job_id = enteries.job_id
group by jobs.job_id;

-- GET Hours, By Job
select jobs.job_id, jobs.job_name, sum(enteries.duration) as total_hours from jobs
join enteries on jobs.job_id = enteries.job_id
group by jobs.job_id;

-- GET Total Hours, by Client
select clients.client_name, sum(enteries.duration) as total_hrs from enteries
join clients on enteries.client_id = clients.client_id
Group by clients.client_id;

-- GET Total Revenue, by Client
select clients.client_name, sum(enteries.total) as total_revenue from enteries
join clients on enteries.client_id = clients.client_id
Group by clients.client_id

