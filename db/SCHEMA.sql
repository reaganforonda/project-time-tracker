DROP TABLE IF EXISTS billing;
DROP TABLE IF EXISTS enteries;
DROP TABLE IF EXISTS jobs;
DROP TABLE IF EXISTS clients;
DROP TABLE IF EXISTS users;

CREATE TABLE users
(
    user_ID SERIAL PRIMARY KEY,
    auth_ID TEXT,
    first_Name VARCHAR(45),
    last_Name VARCHAR(45),
    user_Name VARCHAR(45),
    email VARCHAR(45),
    phone VARCHAR(45),
    picture TEXT,
    address_one VARCHAR(45),
    address_two VARCHAR(45),
    city VARCHAR(45),
    state VARCHAR(2),
    country VARCHAR(45),
    website VARCHAR(45),
    zip INTEGER
);

CREATE TABLE clients
(
    client_ID SERIAL PRIMARY KEY,
    user_ID INTEGER REFERENCES users(user_ID),
    client_name VARCHAR(45),
    address_one VARCHAR(45),
    address_two VARCHAR(45),
    city VARCHAR(45),
    state VARCHAR(2),
    country VARCHAR(45),
    phone VARCHAR(45),
    website VARCHAR(45),
    zip INTEGER,
    active BOOLEAN
);

CREATE TABLE jobs
(
    job_ID SERIAL PRIMARY KEY,
    client_ID INTEGER REFERENCES clients(client_ID),
    user_ID INTEGER REFERENCES users(user_ID),
    job_name VARCHAR(45),
    start_date DATE,
    end_date DATE,
    completed BOOLEAN,
    rate DECIMAL,
    description TEXT
);

CREATE TABLE enteries
(
    entry_ID SERIAL PRIMARY KEY,
    job_ID INTEGER REFERENCES jobs(job_ID),
    client_ID INTEGER REFERENCES clients(client_ID),
    user_ID INTEGER REFERENCES users(user_ID),
    entry_date DATE,
    start_time TIME,
    end_time TIME,
    duration FLOAT,
    total DECIMAL,
    comment TEXT,
    billed BOOLEAN
);

CREATE TABLE billing
(
    invoice_ID SERIAL PRIMARY KEY,
    job_ID INTEGER REFERENCES jobs(job_ID),
    client_ID INTEGER REFERENCES clients(client_ID),
    user_ID INTEGER REFERENCES users(user_ID),
    entry_ID INTEGER REFERENCES enteries(entry_ID),
    invoice_date Date,
    total DECIMAL,
    due_date DATE,
    invoice_number INTEGER
)

