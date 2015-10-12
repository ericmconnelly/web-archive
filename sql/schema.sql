CREATE table if not exists websites (url varchar(50), html blob);

create user 'leeric' identified by '';
grant all privileges on *.* to 'leeric'@'localhost' with grant option;