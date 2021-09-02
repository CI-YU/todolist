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
router.patch('/:id', async (req, res) => {
  try {
    //console.log(req.cookies.token);
    console.log(req.params.id);
    console.log(req.body.completed);
    const result = await taskRequest.patch(
      `/${req.params.id}`,
      {
        completed: req.body.completed,
      },
      { headers: { Authorization: 'Bearer ' + req.cookies.token } }
    );
    console.log(result.status);
    res.send(result.status);
  } catch (err) {
    // console.log(err);
    res.send('error');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const result = await taskRequest.delete(`/${req.params.id}`, {
      headers: { Authorization: 'Bearer ' + req.cookies.token },
    });
    res.sendStatus(result.status);
  } catch (err) {
    res.send('error');
  }
});
module.exports = router;
