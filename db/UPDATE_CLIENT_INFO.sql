UPDATE clients
SET client_name=$3, address_one=$4, address_two=$5, city=$6, state=$7, country=$8, phone=$9, website=$10, zip=$11, active=$12, email=$13, long=$14, lan=$15
WHERE user_id = $1
AND client_id = $2