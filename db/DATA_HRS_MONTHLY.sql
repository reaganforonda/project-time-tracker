select to_char(enteries.entry_date, 'Month') as month, extract(year from enteries.entry_date) as yyyy, sum(enteries.duration) as total from enteries
join jobs on jobs.job_id = enteries.entry_id
where jobs.user_id = $1
group by 1, 2
