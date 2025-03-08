import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const HomePage = () => {

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/users/user', { withCredentials: true });
                setUser(response.data);
            } catch (error) {
                navigate('/login');
            }
        };
        fetchUser();
    }, []);
  const [user, setUser] = useState({});

  const navigate = useNavigate();

  const handleLogout = async () => {
    const respond = await axios.get('http://localhost:8080/api/users/logout', {}, { withCredentials: true });
    if (respond.status=== 200) {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100">
      {/* Header with user info and logout */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-indigo-600">Dashboard</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                <img 
                  src="https://th.bing.com/th/id/R.8b167af653c2399dd93b952a48740620?rik=%2fIwzk0n3LnH7dA&pid=ImgRaw&r=0" 
                  alt="Profile" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <span className="font-medium text-gray-700">{user.username}</span>
            </div>
            <button 
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Welcome back, {user.username}!</h2>
            <p className="text-gray-600 mt-2">We're glad to see you again</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Dashboard cards */}
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg p-6 text-white shadow-md">
              <h3 className="text-xl font-semibold mb-2">Activity</h3>
              <p className="opacity-80">Your recent activity stats</p>
              <div className="text-4xl font-bold mt-4">82%</div>
            </div>
            
            <div className="bg-gradient-to-br from-pink-500 to-red-500 rounded-lg p-6 text-white shadow-md">
              <h3 className="text-xl font-semibold mb-2">Messages</h3>
              <p className="opacity-80">You have new messages</p>
              <div className="text-4xl font-bold mt-4">12</div>
            </div>
            
            <div className="bg-gradient-to-br from-green-500 to-teal-500 rounded-lg p-6 text-white shadow-md">
              <h3 className="text-xl font-semibold mb-2">Tasks</h3>
              <p className="opacity-80">Your pending tasks</p>
              <div className="text-4xl font-bold mt-4">7</div>
            </div>
          </div>
          
          <div className="mt-12 border-t pt-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h3>
            <div className="flex flex-wrap gap-4">
              <button className="px-5 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors">
                New Project
              </button>
              <button className="px-5 py-2 bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition-colors">
                Send Message
              </button>
              <button className="px-5 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors">
                View Reports
              </button>
              <button className="px-5 py-2 bg-yellow-100 text-yellow-700 rounded-md hover:bg-yellow-200 transition-colors">
                Update Profile
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;