"use client";

import { Bar, Doughnut } from 'react-chartjs-2'; // Changed from Pie to Doughnut for hollow center
import { Chart, registerables } from 'chart.js';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // For animations
import 'react-calendar/dist/Calendar.css'; // Import the default styles for the calendar


Chart.register(...registerables);

const Dashboard = () => {
  const [totalStudents, setTotalStudents] = useState(0);
  const [presentPercentage, setPresentPercentage] = useState(0);
  const [absentPercentage, setAbsentPercentage] = useState(0);
  const [rotation, setRotation] = useState(0); // State for rotation based on cursor movement
  const [isCursorMoving, setIsCursorMoving] = useState(false);
  const [date, setDate] = useState(new Date());
  const [inputDate, setInputDate] = useState('');

  useEffect(() => {
    // Example data
    setTotalStudents(10);
    setPresentPercentage(83.3);
    setAbsentPercentage(16.7);
  }, []);

  const barData = {
    labels: ['Present', 'Absent'],
    datasets: [
      {
        label: 'Attendance Percentage',
        data: [presentPercentage, absentPercentage],
        backgroundColor: ['#36a2eb', '#ff6384'],
      },
    ],
  };

  const doughnutData = {
    labels: ['Present', 'Absent'],
    datasets: [
      {
        label: 'Attendance Distribution',
        data: [presentPercentage * totalStudents / 100, absentPercentage * totalStudents / 100], // Convert percentages to actual counts
        backgroundColor: ['#36a2eb', '#ff6384'],
        hoverOffset: 15,
        borderWidth: 3,
        cutout: '70%', // Hollow center
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    animation: {
      animateRotate: true,
    },
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
    },
  };

  const handleMouseMove = (event) => {
    const windowWidth = window.innerWidth;
    const mouseX = event.clientX;
    const rotationAmount = ((mouseX / windowWidth) * 2 - 1) * 10; // Rotation from -10deg to 10deg
    setRotation(rotationAmount);
    setIsCursorMoving(true);
  };

  // Reset rotation when cursor stops moving
  useEffect(() => {
    let timeoutId;
    if (isCursorMoving) {
      timeoutId = setTimeout(() => {
        setIsCursorMoving(false);
      }, 1000); // Stop rotation after 500ms of no movement
    }
    return () => clearTimeout(timeoutId);
  }, [isCursorMoving]);

  const handleDateChange = (newDate) => {
    setDate(newDate); // Update the selected date
    setInputDate(newDate.toISOString().split('T')[0]); // Set input date in YYYY-MM-DD format
  };

  const handleInputChange = (e) => {
    setInputDate(e.target.value); // Update input date from text input
  };

  const handleInputDateSubmit = (e) => {
    e.preventDefault();
    const selectedDate = new Date(inputDate); // Convert input to Date object
    if (!isNaN(selectedDate)) {
      setDate(selectedDate); // Update the calendar date if valid
    } else {
      alert('Invalid date format. Please use YYYY-MM-DD.');
    }
  };

  return (
    <div onMouseMove={handleMouseMove}>
      
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-3 gap-4 mt-8">
      
  <motion.div
    className="bg-blue-200 p-4"
    initial={{ opacity: 0, y: 20 }} 
    animate={{ opacity: 1, y: 0 }} 
    transition={{ duration: 0.5 }} 
  >
    Total Students: {totalStudents}
  </motion.div>
  
 
  <motion.div
    className="bg-blue-200 p-4"
    initial={{ opacity: 0, y: 20 }} // Initial state
    animate={{ opacity: 1, y: 0 }} // Animate to this state
    transition={{ duration: 0.5 }} // Transition duration
  >
    Total Present: {presentPercentage}%
  </motion.div>
  

  <motion.div
    className="bg-blue-200 p-4"
    initial={{ opacity: 0, y: 20 }} // Initial state
    animate={{ opacity: 1, y: 0 }} // Animate to this state
    transition={{ duration: 0.5 }} // Transition duration
  >
    Total Absent: {absentPercentage}%
  </motion.div>
</div>
      <div className="mt-8">
        <div className="flex flex-col items-center">
          <form onSubmit={handleInputDateSubmit} className="mt-4">
            <input
              type="date"
              value={inputDate}
              onChange={handleInputChange}
              className="border rounded p-2"
            />
            <button type="submit" className="ml-2 bg-blue-500 text-white rounded p-2">Search</button>
          </form>
        </div>
      </div>
      <select>
  <option>All</option>
  <option>Science</option>
  <option>English</option>
  <option>Math</option>
</select>
  
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center mt-8">
  
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{ width: '400px', height: '300px' }} // Set width and height for the bar chart
        >
          <h2 className="font-bold text-center">Attendance Percentage</h2>
          <Bar data={barData} options={{ responsive: true }} />
        </motion.div>

        {/* Doughnut Chart with Rotation */}
        <motion.div
          style={{
            width: '300px',
            height: '300px',
            transform: `rotate(${rotation}deg)`, // Apply rotation based on cursor movement
          }}
          initial={{ scale: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="font-bold text-center">Attendance Distribution</h2>
          <Doughnut data={doughnutData} options={doughnutOptions} />
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
