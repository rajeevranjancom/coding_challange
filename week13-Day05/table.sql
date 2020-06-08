CREATE TABLE employees(
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR,
    email VARCHAR,
    phone BIGINT,
    companyId BIGINT FOREIGN KEY,
    designation VARCHAR,
    departmentId BIGINT FOREIGN KEY,
    salary  BIGINT,
    benefits BIGINT FOREIGN KEY,
    thingsGiven  BIGINT,
    FOREIGN KEY(thingsGiven) REFERENCES thingsGiven
);

CREATE TABLE thingsGiven(
    ID BIGSERIAL PRIMARY KEY,
    EID NOT NULL PRIMARY KEY,
    TNAME TEXT,
    FOREIGN KEY (EID) REFERENCES EMPLOYEE(EID)
);
CREATE TABLE department(
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR,
    strength BIGINT
)
CREATE TABLE company(
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR,
    owner VARCHAR,
    email VARCHAR,
    address VARCHAR,
    phone BIGINT
)

CREATE TABLE benefits(
    id BIGSERIAL PRIMARY KEY,
    insurance VARCHAR,
    billPayments BIGINT
)

CREATE TABLE workspace(
    id BIGSERIAL PRIMARY KEY,
    facilities TYPE,
    strength BIGINT
)

CREATE TABLE staffs(
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR,
    workspace BIGINT FOREIGN KEY,
    FOREIGN KEY(workspace) REFERENCES workspace
)