DROP TABLE IF EXISTS edits, score_cache, compositions;

CREATE TABLE edits (
  id SERIAL PRIMARY KEY NOT NULL,
  composition_id SERIAL NOT NULL,
  uuid VARCHAR(15) NOT NULL,
  action VARCHAR(10) NOT NULL,
  pitch VARCHAR(3) NOT NULL,
  measure NUMERIC(3, 0) NOT NULL,
  start NUMERIC(4, 0) NOT NULL,
  duration NUMERIC(4, 0)
);

CREATE UNIQUE INDEX ON edits(composition_id);

CREATE TABLE score_cache (
  id SERIAL PRIMARY KEY NOT NULL,
  composition_id SERIAL NOT NULL,
  edit_id SERIAL NOT NULL,
  score JSONB NOT NULL
);

CREATE UNIQUE INDEX ON score_cache(edit_id);
CREATE UNIQUE INDEX ON score_cache(composition_id);

CREATE TABLE compositions (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR NOT NULL,
  hash VARCHAR NOT NULL,
  version SERIAL NOT NULL
);

CREATE UNIQUE INDEX ON compositions(hash);
CREATE UNIQUE INDEX ON compositions(version);
