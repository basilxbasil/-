import React, { useState } from 'react';

const CreateListing = () => {
  const [formData, setFormData] = useState({ title: '', description: '', price: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) alert('تم إضافة الإعلان بنجاح!');
    } catch (error) {
      console.error('خطأ في الإضافة:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <h2>إضافة إعلان جديد</h2>
      <input type="text" placeholder="عنوان الإعلان" onChange={(e) => setFormData({...formData, title: e.target.value})} required />
      <textarea placeholder="وصف الإعلان" onChange={(e) => setFormData({...formData, description: e.target.value})} required />
      <input type="number" placeholder="السعر" onChange={(e) => setFormData({...formData, price: e.target.value})} required />
      <button type="submit">نشر الإعلان</button>
    </form>
  );
};

export default CreateListing;
