UPDATE clients
set client_name=$3, address_one=$4, address_two=$5, city=$6, state=$7, country=$8, phone=$9, website=$10, zip=$11
WHERE user_id = $1
AND client_id = $2