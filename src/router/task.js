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
module.exports = router;
