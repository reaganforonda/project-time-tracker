SELECT max(invoice_id) from billing
where user_id = $1