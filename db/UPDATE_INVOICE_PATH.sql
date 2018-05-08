UPDATE billing
SET aws_file_location = $2
WHERE billing.user_id = $1
AND billing.invoice_id = $3