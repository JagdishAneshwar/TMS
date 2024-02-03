const { MongoClient } = require('mongodb');
const multer = require('multer');
const XLSX = require('xlsx');
const express = require("express");
const router = express.Router();


// Multer middleware for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const uri = "mongodb+srv://skstech:gJ68ZxFEc40CbyJG@cluster0.ynec5u4.mongodb.net/";


router.post('/uploadEvents', upload.single('file'), async (req, res) => {
  try {
    const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(sheet);

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
    console.error('Error during events upload:', error);
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
