import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Sidebar from '@/components/organisms/Sidebar';
import Header from '@/components/organisms/Header';
import Dashboard from '@/components/pages/Dashboard';
import Patients from '@/components/pages/Patients';
import Appointments from '@/components/pages/Appointments';
import Records from '@/components/pages/Records';
import Reports from '@/components/pages/Reports';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSearch = (searchTerm) => {
    console.log('Search:', searchTerm);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Sidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
        />
        
        <div className="lg:ml-64">
          <Header 
            onMenuToggle={() => setSidebarOpen(true)}
            onSearch={handleSearch}
          />
          
          <main className="p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/patients" element={<Patients />} />
              <Route path="/appointments" element={<Appointments />} />
              <Route path="/records" element={<Records />} />
              <Route path="/reports" element={<Reports />} />
            </Routes>
          </main>
        </div>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </Router>
  );
}

export default App;