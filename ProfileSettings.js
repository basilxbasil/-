import React, { useState } from 'react';

const ProfileSettings = () => {
  const [user, setUser] = useState({ name: 'مستخدم جديد', email: 'email@example.com' });

  const handleUpdate = () => {
    alert('تم حفظ التعديلات بنجاح!');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h2>إعدادات الملف الشخصي</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <label>
          الاسم:
          <input 
            type="text" 
            value={user.name} 
            onChange={(e) => setUser({...user, name: e.target.value})} 
            style={{ display: 'block', width: '100%', padding: '8px' }}
          />
        </label>
        <label>
          البريد الإلكتروني:
          <input 
            type="email" 
            value={user.email} 
            onChange={(e) => setUser({...user, email: e.target.value})} 
            style={{ display: 'block', width: '100%', padding: '8px' }}
          />
        </label>
        <button onClick={handleUpdate} style={{ padding: '10px', cursor: 'pointer' }}>
          حفظ التغييرات
        </button>
      </div>
    </div>
  );
};

export default ProfileSettings;
