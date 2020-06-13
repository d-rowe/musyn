DROP TABLE IF EXISTS edits, score_cache, compositions;

CREATE TABLE compositions (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR NOT NULL,
  hash VARCHAR NOT NULL,
  version INTEGER NOT NULL
);

CREATE UNIQUE INDEX ON compositions(hash);

CREATE TABLE edits (
  id SERIAL PRIMARY KEY NOT NULL,
  composition_id INTEGER REFERENCES compositions(id),
  uuid VARCHAR NOT NULL,
  action VARCHAR NOT NULL,
  pitch VARCHAR NOT NULL,
  measure INTEGER NOT NULL,
  start INTEGER NOT NULL,
  duration INTEGER
);

CREATE INDEX ON edits(composition_id);

CREATE TABLE score_cache (
  id SERIAL PRIMARY KEY NOT NULL,
  composition_id INTEGER REFERENCES compositions(id),
  edit_id INTEGER NOT NULL REFERENCES edits(id),
  score JSONB NOT NULL
);

CREATE UNIQUE INDEX ON score_cache(edit_id);
CREATE UNIQUE INDEX ON score_cache(composition_id);
