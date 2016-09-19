-- Database name
treats
-- Document you create tables pSQL here
CREATE TABLE treat(
  id SERIAL PRIMARY KEY,
  treat_name varChar(64),
  description text,
  image text
)
