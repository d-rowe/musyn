DROP TABLE IF EXISTS score;

CREATE TABLE score (
  id serial PRIMARY KEY NOT NULL,
  uuid character varying(15) NOT NULL,
  notename character varying(3) NOT NULL,
  beat numeric(3, 0) NOT NULL
);
