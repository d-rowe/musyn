DROP TABLE IF EXISTS score;

CREATE TABLE score (
  id serial PRIMARY KEY NOT NULL,
  uuid varchar(15) NOT NULL,
  action varchar(10) NOT NULL,
  pitch varchar(3) NOT NULL,
  measure numeric(3, 0) NOT NULL,
  tick numeric(4, 0) NOT NULL,
  duration numeric(4, 0)
);
