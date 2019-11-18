const router = require('express').Router();
const { Dish, Person } = require('../../db');

// make sure to use router.get, router.post etc..., instead of app.get, app.post, or etc... in this file.
// see https://expressjs.com/en/api.html#router

router.get('/', (req, res, next) => {
  Dish.findAll()
    .then(dishes => res.status(200).send(dishes))
    .catch(err => res.status(400).send(err));
});

router.post('/', (req, res, next) => {
  Dish.create(req.body)
    .then(() =>
      Dish.findAll({
        where: { name: req.body.name },
      })
    )
    .then(dishes => res.status(200).send(dishes))
    .catch(err => res.status(400).send(err));
});

router.put('/:id', (req, res, next) => {
  Dish.findOne({
    where: {
      id: req.params.id,
    },
  }).then(dish => {
    if (!dish) {
      res.status(400).send('Invalid id provided!');
    } else {
      Dish.update({ ...req.body }, { where: { id: req.params.id } })
        .then(() => Dish.findAll())
        .then(dishes => res.status(200).send(dishes))
        .catch(err => res.status(400).send(err));
    }
  });
});

router.delete('/:id', (req, res, next) => {
  Dish.findOne({
    where: {
      id: req.params.id,
    },
  }).then(dish => {
    if (!dish) {
      res.status(400).send('Invalid id provided!');
    } else {
      Dish.destroy({
        where: {
          id: req.params.id,
        },
      })
        .then(() => Dish.findAll())
        .then(dishes => res.status(200).send(dishes))
        .catch(err => res.status(400).send(err));
    }
  });
});

module.exports = router;
