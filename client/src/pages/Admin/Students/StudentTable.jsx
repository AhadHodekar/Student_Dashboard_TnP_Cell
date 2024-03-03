import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";

import { AgGridReact } from "ag-grid-react"; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import EditButton from "./components/EditButton";

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3939/api/student/get-students",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setStudents(response.data);
        console.log(response);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    if (accessToken) {
      fetchData();
    }
  }, [accessToken]);

  // const [rowData, setRowData] = useState([
  //   { make: "Tesla", model: "Model Y", price: 64950, electric: true },
  //   { make: "Ford", model: "F-Series", price: 33850, electric: false },
  //   { make: "Toyota", model: "Corolla", price: 29600, electric: false },
  // ]);

  // Column Definitions: Defines the columns to be displayed.
  const [colDefs, setColDefs] = useState([
    { field: "enrollment_no", filter: true, width: 150 },
    { field: "student_name", width: 300 },
    { field: "course_name" },
    { field: "course_year", width: 150 },
    { field: "academic_year", width: 150 },
    { field: "gender", width: 100 },
    { field: "student_email" },
    { field: "student_mobile_no" },
    {
      field: "birth_date",
      type: ["dateColumn", "nonEditableColumn"],
      width: 150,
    },
    // { field: "button", cellRenderer: EditButton },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      filter: "agTextColumnFilter",
      floatingFilter: true,
    };
  }, []);

  // const columnTypes = useMemo(() => {
  //   return {
  //     nonEditableColumn: { editable: false },
  //     dateColumn: {
  //       filter: "agDateColumnFilter",
  //       filterParams: { comparator: myDateComparator },
  //       suppressHeaderMenuButton: true,
  //     },
  //   };
  // }, []);

  return (
    <div className="p-4">
      <div
        className="ag-theme-quartz" // applying the grid theme
        style={{ height: 820 }} // the grid will fill the size of the parent container
      >
        <AgGridReact
          rowData={students}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          rowSelection="multiple"
          suppressRowClickSelection={true}
          pagination={true}
          paginationPageSize={15}
          paginationPageSizeSelector={[15, 50, 150, 250, 500]}
          // columnTypes={columnTypes}
        />
      </div>
    </div>
  );
};

export default StudentTable;
