# User Acceptance Tests

## Path 1:
- Open dbpg.ru
- Press “Playground” button
- Choose “Users & Session” template
- Get all users
- Change Viktor’s name to “Kolya”
- Try set Pavel’s age to string value
- Set Pavel’s age to 20

## Path 2:
- Open dbpg.ru
- Press “Playground” button
- Choose empty template
- Create table with name “Pizzas” and fields `id` (integer, primary key), `name` (varchar(12)), `price` (integer)
- Add values `Pepperoni` with price 1200
- Get all pizzas

## Path 3:
- Open dbpg.ru
- Press “Playground” button
- Choose “Simple Users Table”
- Try to delete non existent user in the table
- Create table with name “Profession” and fields `user_id` (integer) and `profession`(varchar(20)) 
- Add profession “CEO” for user 2 and profession “Cleaner” for user 1
- Using one query get the name of the CEO


## Path 4 (mongo):
- Open dbpg.ru
- Press “Playground” button
- Choose empty mongo template
- Create collection for pizzas:
  ```js
  db.pizzas.insertOne({
    name: "Margarita",
    size: "Large",
    price: 450
  })
  ```

- Try to get contents:
  ```js
  db.pizzas.find()
  ```

## Path 5 (mongo):
- Open dbpg.ru
- Press “Playground” button
- Choose empty mongo template
- Try to get contents of non-existent collection:
  ```js
  db.students.find()
  ```

## Path 6 (mongo):
- Open dbpg.ru
- Press “Playground” button
- Choose empty mongo template
- Try to make query with syntax error:
  ```js
  db.abc.find(123
  ```

## Path 7:
- Open dbpg.ru
- Hover over button on the right
- Press login button and see that all is good
