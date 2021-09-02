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
    // console.log(result);
    res.send('success');
  } catch (err) {
    // console.log(err);
    res.send('error');
  }
});
module.exports = router;