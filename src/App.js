import React from 'react';
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';

function App() {
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">مرحباً بك في موقعي الجديد!</h1>
      <Card>
        <p className="mb-4">هذا أول إنجاز حقيقي يظهر في الصفحة.</p>
        <Button onClick={() => alert("يعمل بنجاح!")}>
          اضغط هنا للتجربة
        </Button>
      </Card>
    </div>
  );
}

export default App;
