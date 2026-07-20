
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { Eye, EyeOff, Mail, User, Laptop } from 'lucide-react';

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.post('https://one0000coders.onrender.com/api/token/', {
         email,
        password,
      });

      const token = res.data.access;
      const decoded = jwtDecode(token);
      localStorage.setItem('token', token);
      localStorage.setItem('role', decoded.role);

      if (decoded.role === 'admin') {
        nav('/admin');
      } else if (decoded.role === 'trainer') {
        nav('/trainer');
      } else if (decoded.role === 'trainee') {
        nav('/trainee');
      } else {
        nav('/trainee');
      }
    } catch (err) {
      alert('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-50 to-blue-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400" fill="none">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e5e7eb" strokeWidth="1" opacity="0.3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            <path d="M100 150 Q200 100 300 200" stroke="#8b5cf6" strokeWidth="2" fill="none" opacity="0.6"/>
            <path d="M150 300 Q250 250 350 350" stroke="#8b5cf6" strokeWidth="2" fill="none" opacity="0.4"/>
          </svg>
        </div>

        <div className="relative z-10 flex items-center justify-center w-full p-12">
          <div className="max-w-md">
            <div className="relative mb-8">
              <div className="absolute top-0 left-16 w-24 h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center transform -rotate-12">
                <User className="w-12 h-12 text-gray-600" />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded"></div>
                </div>
              </div>

              <svg className="absolute top-20 left-32 w-32 h-16" viewBox="0 0 128 64" fill="none">
                <path d="M0 32 Q64 0 128 32" stroke="#8b5cf6" strokeWidth="3" fill="none"/>
                <circle cx="128" cy="32" r="4" fill="#8b5cf6"/>
              </svg>

              <div className="mt-16 ml-32 w-32 h-32 bg-white rounded-2xl shadow-lg flex items-center justify-center">
                <div className="text-center">
                  <Laptop className="w-12 h-12 text-gray-600 mx-auto mb-2" />
                  <div className="w-8 h-8 bg-purple-500 rounded-lg mx-auto flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-xl shadow-md p-4 transform rotate-2 hover:rotate-0 transition-transform duration-300">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                <div className="mt-3 space-y-2">
                  <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-4 ml-8 transform -rotate-2 hover:rotate-0 transition-transform duration-300">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-3 h-3 text-purple-600" />
                  </div>
                  <div className="space-y-1">
                    <div className="h-2 bg-gray-200 rounded w-16"></div>
                    <div className="h-1 bg-gray-100 rounded w-12"></div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-4 transform rotate-1 hover:rotate-0 transition-transform duration-300">
                <div className="grid grid-cols-3 gap-2">
                  <div className="h-8 bg-gray-100 rounded"></div>
                  <div className="h-8 bg-purple-100 rounded"></div>
                  <div className="h-8 bg-gray-100 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm"></div>
              </div>
              <span className="text-2xl font-bold text-gray-900">OPSYNC</span>
            </div>
          </div>

          <div className="text-center mb-8">
            {/* <h1 className="text-2xl font-semibold text-gray-900 mb-2">Hi, 👋</h1> */}
            <h2 className="text-xl font-medium text-gray-700 mb-6">
              Welcome to Opsync Training Management System
            </h2>
          </div>

          <div className="space-y-6">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all duration-200 outline-none text-gray-900 placeholder-gray-500"
                placeholder="Email"
                required
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all duration-200 outline-none text-gray-900 placeholder-gray-500 pr-12"
                placeholder="Password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            <button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 font-medium disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white mr-2"></div>
                  Logging in...
                </div>
              ) : (
                'Login'
              )}
            </button>

           <div className="text-center">
  <button
    type="button"
    onClick={() => alert("Please contact Admin to reset your password.")}
    className="text-purple-600 hover:text-purple-500 text-sm font-medium"
  >
    Forgotten password?
  </button>
</div>
 
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Don't have an account?
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Discover the perfect plan for your training needs and elevate your experience.
            </p>
            <button
            onClick={() => alert("Please contact Admin to create a new account.")}
            className="px-6 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 font-medium"
           >
            Get started
             </button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
