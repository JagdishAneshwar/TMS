import React, { useState } from 'react';
import axios from 'axios';


const Table = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadEvents = async () => {
    const formData = new FormData();
    formData.append('file',file);
    console.log(file)
    try {
      await axios.post('http://localhost:5000/api/event/uploadEvents', file);
      alert('Events uploaded successfully!');
    } catch (error) {
      console.error(error);
      alert('Error uploading events.');
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/event/getEvents');
      const { todayEvents, upcomingEvents } = response.data;

      console.log('Today\'s Events:', todayEvents);
      console.log('Upcoming Events:', upcomingEvents);
    } catch (error) {
      console.error(error);
      alert('Error fetching events.');
    }
  };

  return (
    <div>
      <h1>Event Board</h1>
      <input type="file" onChange={handleFileChange} name="file" />
      <button onClick={uploadEvents}>Upload Events</button>
      <button onClick={fetchEvents}>Fetch Events</button>
    </div>
  );
};

export default Table;
