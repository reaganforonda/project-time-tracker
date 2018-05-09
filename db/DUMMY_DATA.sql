-- Dummy User

INSERT INTO users
(auth_id, first_name, last_name, email, phone, picture, address_one, address_two, city, state, country, website, zip)
VALUES
('test-user-1', 'Bob','Belcher', 'bob@bobsburgers.com', '743-043-8239', 'https://vignette.wikia.nocookie.net/bobsburgerpedia/images/3/3e/Bobbelcher2.png/revision/latest?cb=20130114075133', 'addres one', 'address two', 'city', 'st', 'usa', 'www.bobsburger.com', 384834 );


-- Dummy Data for Clients

INSERT INTO clients
(user_id, client_name, address_one, address_two, city, state, country, phone, website, zip, active, email)
VALUES
(1, 'Trve Brewing Company', '227 Broadway', '#101', 'Denver', 'CO', 'United States', '303-351-1021', 'https://www.trvebrewing.com/', 80203, true, 'strictlyxsaucers@gmail.com');

INSERT INTO clients
(user_id, client_name, address_one, address_two, city, state, country, phone, website, zip, active, email)
VALUES
(1, 'Ratio Beerworks', '2920 Larimer St', '', 'Denver', 'CO', 'United States', '303-997-8288', 'https://www.ratiobeerworks.com/', 80205, true, 'strictlyxsaucers@gmail.com');

INSERT INTO clients
(user_id, client_name, address_one, address_two, city, state, country, phone, website, zip, active, email)
VALUES
(1, 'Denver Beer Co', '1695 Platte St', '', 'Denver', 'CO', 'United States', '303-433-2739', 'https://www.denverbeerco.com/', 80202, true, 'strictlyxsaucers@gmail.com');

INSERT INTO clients
(user_id, client_name, address_one, address_two, city, state, country, phone, website, zip, active, email)
VALUES
(1, 'Revolution Beer LLC', '3340 N. Kedzie Ave', '', 'Chicago', 'IL', 'United States', '773-588-CANS', 'https://www.revbrew.com/', 60618, true, 'strictlyxsaucers@gmail.com');

INSERT INTO clients
(user_id, client_name, address_one, address_two, city, state, country, phone, website, zip, active, email)
VALUES
(1, 'Marz Community Brewing Co', '3630 S Iron St', '', 'Chicago', 'IL', 'United States', '773-579-1935', 'https://www.marzbrewing.com/', 60609, true, 'strictlyxsaucers@gmail.com');

INSERT INTO clients
(user_id, client_name, address_one, address_two, city, state, country, phone, website, zip, active, email)
VALUES
(1, '3 Floyds Brewing Company', '9750 Indiana Pkwy', '', 'Munster', 'IN', 'United States', '46321', 'https://www.3floyds.com/', 46321, true, 'strictlyxsaucers@gmail.com');


-- DUMMY DATA FOR JOBS

INSERT INTO jobs
(client_id, user_id, job_name, start_date, end_date, completed, rate, description)
VALUES
(2, 1, 'Website Project', '4/1/2018', null, FALSE, 50, 'Build new website');

INSERT INTO jobs
(client_id, user_id, job_name, start_date, end_date, completed, rate, description)
VALUES
(5, 1, 'Back-end Project', '12/1/2018', null, FALSE, 90, 'Build Back End Server');

INSERT INTO jobs
(client_id, user_id, job_name, start_date, end_date, completed, rate, description)
VALUES
(3, 1, 'Shoes Website', '1/1/2018', '3/31/18', TRUE, 90, 'Build E-Commerce Website');

INSERT INTO jobs
(client_id, user_id, job_name, start_date, end_date, completed, rate, description)
VALUES
(4, 1, 'Styling Website', '11/1/2017', '11/5/17', TRUE, 90, 'Style landing page of website');