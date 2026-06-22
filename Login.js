import React from 'react';

const Login = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">تسجيل الدخول</h2>
      <input type="email" placeholder="البريد الإلكتروني" className="border p-2 w-full mt-2" />
      <input type="password" placeholder="كلمة المرور" className="border p-2 w-full mt-2" />
      <button className="bg-blue-600 text-white p-2 mt-4 w-full">دخول</button>
    </div>
  );
};
export default Login;
