import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/table.css';
import {useNavigate} from "react-router-dom"

const Table = ({ tableName }) => {
  const [data, setData] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/${tableName}`);
      console.log(response.data)
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleEdit = (id) => {
    // Redirect or open a modal for editing based on the id
    console.log('Edit row with id:', id);
    navigate(`/edit/${tableName}/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      try {
        await axios.delete(`http://localhost:5000/api/${tableName}/${id}`);
        fetchData();
      } catch (error) {
        console.error('Error deleting data:', error);
      }
    }
  };

  return (
    <div className="table-container">
        <h2 style={{color: "#40405c"}}>{tableName.charAt(0).toUpperCase() + tableName.slice(1)}</h2>
      <table className="table">
        <thead>
          {data.length > 0 && (
            <tr>
              {/* Render table headers */}
              {Object.keys(data[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
              <th>Actions</th>
            </tr>
          )}
        </thead>
        <tbody>
          {/* Render table rows */}
          {data.map((row) => (
            <tr key={row.id}>
              {Object.values(row).map((value, index) => (
                <td key={index}>{value}</td>
              ))}
              <td>
                <div className="table-actions">
                  <button
                    className="edit"
                    onClick={() => handleEdit(row.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete"
                    onClick={() => handleDelete(row.id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
