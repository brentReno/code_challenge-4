-- Database name
treats
-- Document you create tables pSQL here
CREATE TABLE treat(
  id SERIAL PRIMARY KEY,
  name varChar(64),
  description text,
  pic text
)
INSERT INTO treat(name, description, pic) VALUES('Cupcake', 'Yum, a cupcake!', '/assets/cupcake.jpg');
INSERT INTO treat(name, description, pic) VALUES('Donuts', 'MMMMMM, Donuts... ', '/assets/donuts.jpg');
INSERT INTO treat(name, description, pic) VALUES('Goldfish', '"The snack that smiles back" ', '/assets/goldfish.jpg');
INSERT INTO treat(name, description, pic) VALUES('Ice Cream', 'We all scream for ice cream!', '/assets/icecream.jpg');
INSERT INTO treat(name, description, pic) VALUES('Potato Chips', 'Bet you cant have just one.', '/assets/potato.jpg');
