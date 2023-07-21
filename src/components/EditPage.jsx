import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../styles/EditPage.css"

const EditPage = ({tableName}) => {
  const {id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/${tableName}/${id}`);
      setFormData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await  axios.put(`http://localhost:5000/api/${tableName}/${id}`, formData)
      .then((res) =>{
        console.log(res.data)
        alert(res.data.message)
      });
      
      navigate('/'); // Redirect to the home page or any other desired page
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  return (
    <div className="edit-record">
  <h2>Edit Record</h2>
  <form onSubmit={handleSubmit}>
    {Object.entries(formData).map(([key, value]) => (
      <div key={key} className="form-field">
        <label htmlFor={key} className="label">
          {key}
        </label>
        <input
          type="text"
          id={key}
          name={key}
          value={value || ''}
          onChange={handleChange}
          className="input"
        />
      </div>
    ))}
    <button type="submit" className="submit-button">Update</button>
  </form>
</div>
  );
};

export default EditPage;