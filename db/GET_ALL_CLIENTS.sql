SELECT clients.client_id, clients.user_id, clients.client_name, clients.address_one, clients.address_two, clients.city, clients.state, clients.country, clients.phone, clients.website, clients.zip, clients.active, clients.email, clients.lan, clients.long
from clients
JOIN users on clients.user_id = users.user_id
WHERE clients.user_id = $1
ORDER BY clients.client_id