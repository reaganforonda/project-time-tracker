DELETE FROM enteries
WHERE enteries.entry_id = $1
AND enteries.user_id = $2