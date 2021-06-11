USE celiac_tackboard_db;

INSERT INTO user (username, password, email)
VALUES
('fred', 'password', 'fred@email.com'),
('mark', 'password', 'mark@email.com'),
('joe', 'password', 'joe@email.com'),
('bill', 'password', 'bill@email.com');

INSERT INTO location (city_name, state)
VALUES
('Madison', 'WI'),
('Milwaukee', 'WI'),
('Kenosha', 'WI'),
('Beloit', 'WI');

INSERT INTO post (title, description, post_url, user_id, location_id)
VALUES
('testpost1', 'lorem lorem lorem lorem lorem lorem', 'www.google.com', 1, 1),
('testpost2', 'lorem lorem lorem lorem lorem lorem','www.google.com', 2, 2),
('testpost3', 'lorem lorem lorem lorem lorem lorem','www.google.com', 2, 3),
('testpost4', 'lorem lorem lorem lorem lorem lorem','www.google.com', 3, 1),
('testpost5', 'lorem lorem lorem lorem lorem lorem','www.google.com', 4, 2),
('testpost6', 'lorem lorem lorem lorem lorem lorem','www.google.com', 1, 4);

INSERT INTO comment (comment_text, post_id, user_id)
VALUES
('testcomment', 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum', 1, 1),
('testcomment', 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum', 2, 2),
('testcomment', 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum', 3, 3),
('testcomment', 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum', 1, 4),
('testcomment', 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum', 4, 1),
('testcomment', 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum', 5, 2),
('testcomment', 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum', 1, 3);

INSERT INTO votes (user_id, post_id)
VALUES
(1, 1),
(1, 2),
(2, 1),
(3, 2),
(3, 3),
(3, 4),
(4, 5),
(1, 6);