"use client";

import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const dummyStudents = [
  { name: "Alice Johnson", attendance: Array(30).fill(true), category: "Math" },
  { name: "Bob Smith", attendance: Array(15).fill(true), category: "English" },
  { name: "Charlie Brown", attendance: Array(30).fill(false), category: "Science" },
  { name: "David Wilson", attendance: Array(30).fill(false), category: "Math" },
  { name: "Eva Green", attendance: Array(30).fill(false), category: "English" },
  { name: "Frank Harris", attendance: Array(30).fill(false), category: "Science" },
  { name: "Grace Lee", attendance: Array(30).fill(false), category: "Math" },
  { name: "Henry Adams", attendance: Array(30).fill(false), category: "English" },
  { name: "Isabella Martinez", attendance: Array(30).fill(false), category: "Science" },
  { name: "James Williams", attendance: Array(30).fill(false), category: "Math" }
];

// Mock function for teacher login
const loginTeacher = (category) => {
  // Simulate teacher login by returning the category
  return category;
};

const StudentManagement = () => {
  const [students, setStudents] = useState(dummyStudents);
  const [currentStudentIndex, setCurrentStudentIndex] = useState(null);
  const [formVisible, setFormVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [newStudentName, setNewStudentName] = useState("");
  const [attendance, setAttendance] = useState(Array(30).fill(false));

  // Simulating teacher login
  const teacherCategory = loginTeacher("Math"); // Change "Math" to the logged-in teacher's category

  // Filter students based on the teacher's category
  const filteredStudents = students.filter(student => student.category === teacherCategory);

  const addStudent = () => {
    const newStudent = { name: newStudentName, attendance: Array(30).fill(false), category: teacherCategory };
    setStudents([...students, newStudent]);
    setModalVisible(false);
    setNewStudentName(""); // Clear input field
  };

  const editStudent = (index) => {
    setCurrentStudentIndex(index);
    setAttendance(filteredStudents[index].attendance);
    setModalVisible(true);
  };

  const saveAttendance = () => {
    const updatedStudents = [...students];
    updatedStudents[currentStudentIndex].attendance = attendance;
    setStudents(updatedStudents);
    setModalVisible(false);
    setCurrentStudentIndex(null);
  };

  const deleteStudent = (index) => {
    setStudents(filteredStudents.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">{teacherCategory} Teacher's Dashboard</h1>

      <button
        onClick={() => {
          setModalVisible(true);
          setCurrentStudentIndex(null);
        }}
        className="bg-blue-500 text-white p-2 rounded mt-4"
      >
        Add New {teacherCategory} Student
      </button>

      <div className="mt-4">
        {filteredStudents.map((student, index) => (
          <div key={index} className="flex flex-col bg-gray-100 p-4 mt-2 rounded">
            <div className="flex justify-between">
              <span>{student.name} - {student.category}</span>
              <div>
                <button
                  onClick={() => editStudent(index)}
                  className="bg-yellow-500 text-white p-2 rounded mr-2"
                >
                  Edit Attendance
                </button>
                <button
                  onClick={() => deleteStudent(index)}
                  className="bg-red-500 text-white p-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
            <h3 className="mt-2 font-bold">Attendance Chart</h3>
            <Bar
              data={{
                labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
                datasets: [
                  {
                    label: student.name,
                    data: student.attendance.map(attend => (attend ? 1 : 0)),
                    backgroundColor: "#36a2eb",
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

      {/* Modal for Adding/Editing Student */}
      {modalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-md w-1/2">
            <h2>{currentStudentIndex !== null ? `Edit Attendance for ${filteredStudents[currentStudentIndex].name}` : "Add New Student"}</h2>
            {currentStudentIndex === null ? (
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
              <div>
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
              </div>
            )}
            <div className="flex justify-between mt-4">
              <button onClick={() => setModalVisible(false)} className="bg-gray-300 p-2 rounded">
                Close
              </button>
              <button
                onClick={currentStudentIndex !== null ? saveAttendance : addStudent}
                className="bg-blue-500 text-white p-2 rounded"
              >
                {currentStudentIndex !== null ? "Save Attendance" : "Add Student"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentManagement;
