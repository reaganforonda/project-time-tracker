UPDATE users
SET first_name = $2, last_name=$3, email=$4, phone=$5, address_one=$6, address_two=$7, city=$8, state=$9, country=$10, website=$11, zip=$12
WHERE user_id = $1