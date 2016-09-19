-- Database name
treats
-- Document you create tables pSQL here
CREATE TABLE treat(
  id SERIAL PRIMARY KEY,
  name varChar(64),
  description text,
  pic text
)
INSERT INTO treats(name, description, pic) VALUES('Cupcake', 'Yum, a cupcake!', '/assets/cupcake.jpg');
