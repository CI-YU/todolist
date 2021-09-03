const express = require('express');
const router = new express.Router();
const { taskRequest } = require('../router/api');
router.get('', async (req, res) => {
  try {
    const result = await taskRequest.get('', {
      headers: {
        Authorization: 'Bearer ' + req.cookies.token,
      },
    });
    result.data.forEach((i) => {
      delete i.owner;
      delete i.__v;
      delete i.createdAt;
    });
    res.send(result.data);
  } catch (err) {
    res.send('error');
  }
});
router.post('', async (req, res) => {
  try {
    const result = await taskRequest.post(
      '',
      {
        description: req.body.description,
        completed: req.body.completed,
      },
      {
        headers: {
          Authorization: 'Bearer ' + req.cookies.token,
        },
      }
    );
    delete result.data.owner;
    delete result.data.__v;
    delete result.data.createdAt;
    console.log(result.data);
    res.send(result.data);
  } catch (err) {
    res.send('error');
  }
});
router.patch('/:id', async (req, res) => {
  try {
    const result = await taskRequest.patch(
      `/${req.params.id}`,
      {
        completed: req.body.completed,
      },
      { headers: { Authorization: 'Bearer ' + req.cookies.token } }
    );
    res.sendStatus(result.status);
  } catch (err) {
    res.send(err.response.data.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const result = await taskRequest.delete(`/${req.params.id}`, {
      headers: { Authorization: 'Bearer ' + req.cookies.token },
    });
    res.sendStatus(result.status);
  } catch (err) {
    res.send(err.response.data.message);
  }
});
module.exports = router;
