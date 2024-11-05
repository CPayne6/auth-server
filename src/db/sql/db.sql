CREATE TABLE IF NOT EXISTS users (
  id    SERIAL PRIMARY KEY,
  uuid  uuid DEFAULT gen_random_uuid()
  email TEXT UNIQUE NOT NULL,
  email_validated Boolean DEFAULT FALSE,
  fname TEXT NOT NULL,
  lname TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS users_oauth_providers (
  id                  SERIAL PRIMARY KEY,
  user_id             INT NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  auth_method_id      INT NOT NULL REFERENCES oauth_providers (id),
  access_token        TEXT NOT NULL,
  refresh_token       TEXT,
  access_token_expiry DATETIME
);

CREATE TABLE IF NOT EXISTS oauth_providers (
  id      SERIAL PRIMARY KEY,
  name    VARCHAR(20) NOT NULL UNIQUE,
  key     VARCHAR(20),
  issuer  VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS refresh_tokens (
  id              SERIAL PRIMARY KEY,
  user_id         INT NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  created_at      DATETIME NOT NULL,
  revoked_at      DATETIME,
  revoked_user_id INT REFERENCES users (id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS local_auth (
  id            SERIAL PRIMARY KEY,
  user_id       INT REFERENCES users (id) ON DELETE CASCADE,
  password_hash char(60)
);