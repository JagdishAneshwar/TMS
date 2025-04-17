const express = require('express');
const router = express.Router();
const multer = require('multer');
const csvParser = require('csv-parser');
const MongoClient = require('mongodb').MongoClient;

var upload = multer({
  dest: 'uploads/',
  storage: multer.memoryStorage()
});

router.post('/uploadEvents', upload.single('file'), async (req, res) => {
  try {
    console.log(req.file)
    const jsonData = req.file.buffer
      .toString('utf8')
      .split('\n')
      .slice(1) // Skip the header row
      .map((line) => {
        const [
          Subject,
          StartDate,
          EndDate,
          AllDayEvent,
          BirthDate,
          Age,
          Description,
        ] = line.split(',');

        return {
          Subject: Subject.trim(),
          StartDate: StartDate.trim(),
          EndDate: EndDate.trim(),
          AllDayEvent: AllDayEvent.trim() === 'TRUE',
          BirthDate: BirthDate.trim(),
          Age: parseInt(Age.trim(), 10),
          Description: Description.trim(),
        };
      });

    const uri = "mongodb+srv://skstech:gJ68ZxFEc40CbyJG@cluster0.ynec5u4.mongodb.net/";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    await client.connect();
    const database = client.db('Database');
    const collection = database.collection('Event');

    const result = await collection.insertMany(jsonData);
    console.log(`${result.insertedCount} documents inserted`);

    await client.close();
    res.status(200).json({ message: 'Upload successful' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});






function convertToEpochDate(numberOfDays) {
  const millisecondsInDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
  const epochStart = new Date('1970-01-01'); // Unix epoch start date

  // Calculate the milliseconds offset
  const offsetMilliseconds = numberOfDays * millisecondsInDay;

  // Create the new Date object
  const resultDate = new Date(epochStart.getTime() + offsetMilliseconds);
  return resultDate;
}

router.get('/getEvents', async (req, res) => {
  try {
    const today = new Date('2024-01-01');// Adjust the date format as per your requirement

    // Connect to MongoDB
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    const database = client.db('Database');
    const collection = database.collection('Event');

    // Retrieve upcoming events
    const upcomingEvents = await collection.find({ date: { $gte: today } }).sort({ date: 1 }).toArray();

    // Retrieve events for today
    const todayEvents = await collection.find({ date: today }).sort({ date: 1 }).toArray();
    console.log(convertToEpochDate(today), today)
    await client.close();

    res.status(200).json({ todayEvents, upcomingEvents });
  } catch (error) {
    console.error('Error during fetching events:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;
