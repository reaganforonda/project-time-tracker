SELECT *
FROM billing
JOIN clients on billing.client_id = clients.client_id
WHERE billing.user_id = $1