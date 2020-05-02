DROP TABLE IF EXISTS edits, scores;

CREATE TABLE edits (
  id SERIAL PRIMARY KEY NOT NULL,
  uuid VARCHAR(15) NOT NULL,
  action VARCHAR(10) NOT NULL,
  pitch VARCHAR(3) NOT NULL,
  measure NUMERIC(3, 0) NOT NULL,
  start NUMERIC(4, 0) NOT NULL,
  duration NUMERIC(4, 0)
);

CREATE TABLE scores (
  id SERIAL PRIMARY KEY NOT NULL,
  edit_id SERIAL NOT NULL,
  data JSONB NOT NULL
);

CREATE UNIQUE INDEX edit_idx ON scores (edit_id);
