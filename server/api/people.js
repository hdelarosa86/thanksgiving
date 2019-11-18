const router = require('express').Router();
const { Person, Dish } = require('../../db');

// make sure to use router.get, router.post etc..., instead of app.get, app.post, or etc... in this file.
// see https://expressjs.com/en/api.html#routers

router.get('/', (req, res, next) => {
  if (req.query.is_attending) {
    Person.findAll({
      where: {
        isAttending: req.query.is_attending,
      },
    })
      .then(people => res.status(200).send(people))
      .catch(err => res.status(400).send(err));
  } else if (req.query.include_dishes) {
    Person.findAll({
      where: {
        isAttending: req.query.include_dishes,
      },
      include: {
        model: Dish,
      },
    })
      .then(people => res.status(200).send(people))
      .catch(err => res.status(400).send(err));
  } else {
    Person.findAll()
      .then(people => res.status(200).send(people))
      .catch(err => res.status(400).send(err));
  }
});

router.post('/', (req, res, next) => {
  Person.create(req.body)
    .then(() =>
      Person.findAll({
        where: { name: req.body.name },
      })
    )
    .then(people => res.status(200).send(people))
    .catch(err => res.status(400).send(err));
});

router.put('/:id', (req, res, next) => {
  Person.findOne({
    where: {
      id: req.params.id,
    },
  }).then(person => {
    if (!person) {
      res.status(400).send('Invalid id provided!');
    } else {
      Person.update({ ...req.body }, { where: { id: req.params.id } })
        .then(() => Person.findAll())
        .then(people => res.status(200).send(people))
        .catch(err => res.status(400).send(err));
    }
  });
});

router.delete('/:id', (req, res, next) => {
  Person.findOne({
    where: {
      id: req.params.id,
    },
  }).then(person => {
    if (!person) {
      res.status(400).send('Invalid id provided!');
    } else {
      Person.destroy({
        where: {
          id: req.params.id,
        },
      })
        .then(() => Person.findAll())
        .then(people => res.status(200).send(people))
        .catch(err => res.status(400).send(err));
    }
  });
});

module.exports = router;
