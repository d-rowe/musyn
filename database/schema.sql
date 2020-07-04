DROP TABLE IF EXISTS auth_providers, users, edits, snapshots, compositions;

CREATE TABLE auth_providers (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR NOT NULL
);

INSERT INTO auth_providers (name) VALUES ('github');
INSERT INTO auth_providers (name) VALUES ('google');

CREATE TABLE users (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  display_name VARCHAR NOT NULL,
  given_name VARCHAR NOT NULL,
  family_name VARCHAR,
  auth_id VARCHAR UNIQUE NOT NULL,
  auth_provider_id INTEGER REFERENCES auth_providers(id) ON DELETE CASCADE
);

CREATE UNIQUE INDEX ON users(auth_id);

CREATE TABLE compositions (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title VARCHAR NOT NULL,
  hash VARCHAR UNIQUE NOT NULL,
  version INTEGER NOT NULL
);

CREATE UNIQUE INDEX ON compositions(hash);

CREATE TABLE edits (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  composition_id INTEGER REFERENCES compositions(id) ON DELETE CASCADE,
  version INT NOT NULL,
  uuid VARCHAR NOT NULL,
  action VARCHAR NOT NULL,
  pitch VARCHAR NOT NULL,
  measure INTEGER NOT NULL,
  start INTEGER NOT NULL,
  duration INTEGER
);

CREATE INDEX ON edits(composition_id);

CREATE TABLE snapshots (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  edit_id INTEGER NOT NULL REFERENCES edits(id) ON DELETE CASCADE,
  score JSONB NOT NULL
);

CREATE UNIQUE INDEX ON snapshots(edit_id);
