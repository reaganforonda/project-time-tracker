-- Dummy User

INSERT INTO users
(auth_id, first_name, last_name, email, phone, picture, address_one, address_two, city, state, country, website, zip)
VALUES
('test-user-1', 'Bob','Belcher', 'bob@bobsburgers.com', '743-043-8239', 'https://vignette.wikia.nocookie.net/bobsburgerpedia/images/3/3e/Bobbelcher2.png/revision/latest?cb=20130114075133', 'addres one', 'address two', 'city', 'st', 'usa', 'www.bobsburger.com', 384834 );


-- Dummy Data for Clients

INSERT INTO clients
(user_id, client_name, address_one, address_two, city, state, country, phone, website, zip, active)
VALUES
(1, 'DevMountain Provo', '560 S 100 W St in Provo', '', 'Provo', 'UT', 'United States', '844-433-8686', 'https://devmountain.com/', 84601, true);

INSERT INTO clients
(user_id, client_name, address_one, address_two, city, state, country, phone, website, zip, active)
VALUES
(1, 'Au Cheval', '800 W Randolph Street', '', 'Chicago', 'IL', 'United States', '312-555-5555', 'https://www.auchevalchicago.com/', 60607, true);

INSERT INTO clients
(user_id, client_name, address_one, address_two, city, state, country, phone, website, zip, active)
VALUES
(1, 'Smith and Sons', '1000 W Fulton Market', '', 'Chicago', 'IL', 'United States', '312-733-9420', 'https://www.swiftandsonschicago.com/', 60607, true);

INSERT INTO clients
(user_id, client_name, address_one, address_two, city, state, country, phone, website, zip, active)
VALUES
(1, 'Elske', '1350 W Randolph St', '', 'Chicago', 'IL', 'United States', '312-733-1314', 'https://elskerestaurant.com/', 60607, true);

INSERT INTO clients
(user_id, client_name, address_one, address_two, city, state, country, phone, website, zip, active)
VALUES
(1, 'Boka', '1729 N Halsted St', '', 'Chicago', 'IL', 'United States', '312-337-6070', 'https://www.bokachicago.com', 60614, true);

INSERT INTO clients
(user_id, client_name, address_one, address_two, city, state, country, phone, website, zip, active)
VALUES
(1, 'Kumas Corner', '2900 W Belmont Ave', '', 'Chicago', 'IL', 'United States', '773-604-8769', 'https://kumascorner.com/', 60618, true);


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