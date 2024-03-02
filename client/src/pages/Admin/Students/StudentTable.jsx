import React, { useContext, useEffect, useState } from "react";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { useAdminContext } from "../../context/AdminContext"; // Import your context

const StudentTable = () => {
  const [studentData, setStudentData] = useState([]);
  const { students } = useAdminContext(); // Retrieve students from context
  useEffect(() => {
    setStudentData(students);
  }, []);

  // Render individual student row
  const Row = ({ index, style }) => {
    const student = studentData[index];
    return (
      <div style={style}>
        <div>Enrollment No: {student.enrollment_no}</div>
        <div>Student Name: {student.student_name}</div>
        <div>Course Name: {student.course_name}</div>
        <div>Course Year: {student.course_year}</div>
        <div>Birth Date: {student.birth_date}</div>
        {/* Add more student information as needed */}
      </div>
    );
  };

  return (
    <div className="h-full w-full overflow-hidden ">
      <h2>Student List</h2>
      <AutoSizer>
        {({ height, width }) => (
          <List
            height={height}
            width={width}
            itemCount={students.length}
            itemSize={150}
          >
            {Row}
          </List>
        )}
      </AutoSizer>
    </div>
  );
};

export default StudentTable;
