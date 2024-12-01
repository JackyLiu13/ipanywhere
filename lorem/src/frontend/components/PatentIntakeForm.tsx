import React, { useState } from 'react'

const PatentIntakeForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    name: '',
    patentNumber: '',
    filingDate: '',
    issueDate: '',
    abstract: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        name="title" 
        placeholder='Title of Patent' 
        required 
        value={formData.title} 
        onChange={handleChange} 
      />
      <input 
        name="name" 
        placeholder='Name of ' 
        required 
        value={formData.name} 
        onChange={handleChange} 
      />
      <input 
        name="patentNumber" 
        placeholder='Patent Number' 
        required 
        value={formData.patentNumber} 
        onChange={handleChange} 
      />
      <input 
        type='date' 
        name="filingDate" 
        required 
        value={formData.filingDate} 
        onChange={handleChange} 
      />
      <input 
        type='date' 
        name="issueDate" 
        required 
        value={formData.issueDate} 
        onChange={handleChange} 
      />
      <input 
        name="abstract" 
        placeholder='Abstract...' 
        required 
        value={formData.abstract} 
        onChange={handleChange} 
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default PatentIntakeForm
