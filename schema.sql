CREATE DATABASE archive_machine;

USE archive_machine;

CREATE TABLE jobs (
  id int NOT NULL AUTO_INCREMENT,
  url varchar(200)  NOT NULL,
  status varchar(20),
  isArchived boolean,
  PRIMARY KEY (ID)
);
