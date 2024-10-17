"use client";

import { useState } from "react";
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';


Chart.register(...registerables);


const dummyStudents = [
  { name: "Alice Johnson", attendance: Array(30).fill(true) },
  { name: "Bob Smith", attendance: Array(15).fill(true) },
  { name: "Charlie Brown", attendance: Array(30).fill(false) },
  { name: "David Wilson", attendance: Array(30).fill(false) },
  { name: "Eva Green", attendance: Array(30).fill(false) },
  { name: "Frank Harris", attendance: Array(30).fill(false) },
  { name: "Grace Lee", attendance: Array(30).fill(false) },
  { name: "Henry Adams", attendance: Array(30).fill(false) },
  { name: "Isabella Martinez", attendance: Array(30).fill(false) },
  { name: "James Williams", attendance: Array(30).fill(false) }
];

const StudentManagement = () => {
  const [students, setStudents] = useState(dummyStudents);
  const [currentStudentIndex, setCurrentStudentIndex] = useState(null);
  const [formVisible, setFormVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [newStudentName, setNewStudentName] = useState("");
  const [attendance, setAttendance] = useState(Array(30).fill(false));
  const [isEditing, setIsEditing] = useState(false);

  const addStudent = () => {
    const newStudent = { name: newStudentName, attendance: Array(30).fill(false) };
    setStudents([...students, newStudent]);
    setModalVisible(false);
    setNewStudentName(""); // Clear input field
  };

  const editStudent = (index) => {
    setCurrentStudentIndex(index);
    setAttendance(students[index].attendance);
    setIsEditing(true); 
    setModalVisible(true); 
  };

  const saveAttendance = () => {
    const updatedStudents = [...students];
    updatedStudents[currentStudentIndex].attendance = attendance;
    setStudents(updatedStudents);
    setModalVisible(false); // Close the modal
    setCurrentStudentIndex(null);
    setIsEditing(false); // Reset editing state
  };

  const deleteStudent = (index) => {
    setStudents(students.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Student Management</h1>
      <button onClick={() => { setModalVisible(true); setIsEditing(false); }} className="bg-blue-500 text-white p-2 rounded">
        Add New Student
      </button>
      <div className="mt-4">
        {students.map((student, index) => (
          <div key={index} className="flex flex-col bg-gray-100 p-4 mt-2 rounded">
            <div className="flex justify-between">
              <span>{student.name}</span>
              <div>
                <button onClick={() => editStudent(index)} className="bg-yellow-500 text-white p-2 rounded mr-2">Edit Attendance</button>
                <button onClick={() => deleteStudent(index)} className="bg-red-500 text-white p-2 rounded">Delete</button>
              </div>
            </div>
            <h3 className="mt-2 font-bold">Attendance Chart</h3>
            <Bar
              data={{
                labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
                datasets: [
                  {
                    label: student.name,
                    data: student.attendance.map(attend => attend ? 1 : 0), // Convert boolean to 1/0 for the chart
                    backgroundColor: '#36a2eb',
                  },
                ],
              }}
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
              height={100}
            />
          </div>
        ))}
      </div>

      {/* Modal for Adding New Student */}
      {modalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-md w-1/2">
            <h2>{isEditing ? `Edit Attendance for ${students[currentStudentIndex]?.name}` : "Add New Student"}</h2>
            {!isEditing ? (
              <>
                <input
                  type="text"
                  placeholder="Student Name"
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  className="border p-2 w-full mt-2"
                />
              </>
            ) : (
              <>
                <h3>Attendance for the Month</h3>
                <div className="grid grid-cols-7 gap-2">
                  {attendance.map((attend, i) => (
                    <label key={i} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={attend}
                        onChange={() => {
                          const newAttendance = [...attendance];
                          newAttendance[i] = !attend;
                          setAttendance(newAttendance);
                        }}
                      />
                      Day {i + 1}
                    </label>
                  ))}
                </div>
              </>
            )}
            <div className="flex justify-between mt-4">
              <button onClick={() => setModalVisible(false)} className="bg-gray-300 p-2 rounded">Close</button>
              <button onClick={isEditing ? saveAttendance : addStudent} className="bg-blue-500 text-white p-2 rounded">
                {isEditing ? "Save Attendance" : "Add Student"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentManagement;
