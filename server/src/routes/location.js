const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/getPlaceName', async (req, res) => {
  try {
    // Extract latitude and longitude from query parameters

  } catch (error) {
    // Handle errors and send an appropriate response to the client
    console.error('Error:', error.message);
    res.status(error.response ? error.response.status : 500).json({
      error: error.response ? error.response.data : 'Internal Server Error',
    });
  }
});

module.exports = router;
