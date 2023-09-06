use interview;

CREATE TABLE user(
    user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	first_name VARCHAR(250) NOT NULL,
	last_name VARCHAR(250) NOT NULL,
	email VARCHAR(250) NOT NULL,
	image VARCHAR(4000) NULL,
	updated_at DATETIME DEFAULT (CURRENT_DATE()),
	created_at DATETIME DEFAULT (CURRENT_DATE())
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE appointment_status(
    appointment_status_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(100) NOT NULL,
	updated_at DATETIME DEFAULT (CURRENT_DATE()),
	created_at DATETIME DEFAULT (CURRENT_DATE())
);

CREATE TABLE appointment(
    appointment_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	title VARCHAR(200) NOT NULL,
	description VARCHAR(4000) NULL,
	is_archieve bit default 0,
	appointment_status_id Int,
	user_id Int,
	updated_at DATETIME DEFAULT (CURRENT_DATE()),
	created_at DATETIME DEFAULT (CURRENT_DATE()),
	FOREIGN KEY (user_id) REFERENCES user(user_id),
	FOREIGN KEY (appointment_status_id) REFERENCES appointment_status(appointment_status_id)
)DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE comment(
	comment_id int not null PRIMARY KEY AUTO_INCREMENT,
	user_id int not null,
	appointment_id int not null,
	detail varchar(4000) null,
	updated_at DATETIME DEFAULT (CURRENT_DATE()),
	created_at DATETIME DEFAULT (CURRENT_DATE()),
	FOREIGN KEY (user_id) REFERENCES user(user_id),
	FOREIGN KEY (appointment_id) REFERENCES appointment(appointment_id)
);

INSERT INTO interview.appointment_status
(name, updated_at, created_at)
VALUES('To do', NOW(), NOW());
INSERT INTO interview.appointment_status
(name, updated_at, created_at)
VALUES('In Progress', NOW(), NOW());
INSERT INTO interview.appointment_status
(name, updated_at, created_at)
VALUES('Done', NOW(), NOW());

INSERT INTO interview.`user`
(first_name, last_name, email, image, updated_at, created_at)
VALUES('นาย หนึ่ง', 'โรบิน', 'test1@gmail.com', '', NOW(), NOW());
INSERT INTO interview.`user`
(first_name, last_name, email, image, updated_at, created_at)
VALUES('นาย สอง', 'ไดรเวอร์', 'test2@gmail.com', '', NOW(), NOW());
INSERT INTO interview.`user`
(first_name, last_name, email, image, updated_at, created_at)
VALUES('นาย สาม', 'ไดรเวอร์', 'test3@gmail.com', '', NOW(), NOW());


INSERT INTO interview.appointment
(title, description, is_archieve, appointment_status_id, user_id, updated_at, created_at)
VALUES( 'นัดสัมภาาณ์ 1', 'รายละเอียด', b'0', 1, 1, NOW(), NOW());
INSERT INTO interview.appointment
(title, description, is_archieve, appointment_status_id, user_id, updated_at, created_at)
VALUES( 'นัดสัมภาาณ์ 2', 'รายละเอียด', b'0', 1, 2, NOW(), NOW());
INSERT INTO interview.appointment
(title, description, is_archieve, appointment_status_id, user_id, updated_at, created_at)
VALUES( 'นัดสัมภาาณ์ 3', 'รายละเอียด', b'0', 1, 1, NOW(), NOW());