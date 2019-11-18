const { app } = require('./app');
const PORT = 3000;
const { db, Person, Dish } = require('../db');

async function syncAndSeedDatabase() {
  try {
    await db.sync({ force: true });
    //  Create some rows in your Person and Dish tables here
    //  to interact with your API using the `npm run start:watch`
    //  or `npm run start` commands.
    const [moe, larry, curly] = await Promise.all([
      Person.create({ name: 'moe', isAttending: true }),
      Person.create({ name: 'larry', isAttending: true }),
      Person.create({ name: 'curly' }),
    ]);

    const [turkey, pumpkinPie, mashedPotatoes] = await Promise.all([
      Dish.create({
        name: 'turkey',
        description: 'The star of the night, usually dry.',
        personId: moe.id,
      }),
      Dish.create({
        name: 'pumpkin pie',
        description: 'Pumpkin puree and spices poured over a crust and baked.',
        personId: larry.id,
      }),
      Dish.create({
        name: 'mashed potatoes',
        description:
          'Yukon gold with lots of butter and whipped to a smooth consistency.',
        personId: moe.id,
      }),
    ]);
  } catch (err) {
    console.log(err);
  }

  console.log('done seeding and associating!');
}

syncAndSeedDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });
});
