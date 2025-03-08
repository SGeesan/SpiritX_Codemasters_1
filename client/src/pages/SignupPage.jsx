import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const SignupPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    });
    const [authError, setAuthError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        setAuthError(''); 
    };

    const has8Chars = formData.username.length >= 8;
    const hasLowercase = /[a-z]/.test(formData.password);
    const hasUppercase = /[A-Z]/.test(formData.password);
    const hasSpecialChar = /[!@#$%^&*]/.test(formData.password);
    const passwordMatch = formData.password === formData.confirmPassword;

    const getPasswordStrength = () => {
        let strength = 0;
        if (formData.password.length >= 8) strength++;
        if (hasLowercase) strength++;
        if (hasUppercase) strength++;
        if (hasSpecialChar) strength++;
        return strength;
    };

    const getStrengthColor = () => {
        const strength = getPasswordStrength();
        if (strength === 0) return 'bg-gray-200';
        if (strength === 1) return 'bg-red-500';
        if (strength === 2) return 'bg-orange-500';
        if (strength === 3) return 'bg-yellow-500';
        return 'bg-green-500';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/users/register', formData);
            if(response.status === 201) {
                setSuccessMessage('User registered successfully');
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            }else if(response.status === 300) {
                setAuthError('User already exists');
            }
        } catch (error) {
            setAuthError(error.message || 'An error occurred during signup');
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 py-12 px-4 ">
            <div className="w-full max-w-md space-y-8 bg-white p-8 rounded shadow-md">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
                        Create your account
                    </h2>
                </div>
                
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-4 rounded-md shadow-sm">
                    <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                        Username
                    </label>
                    <div className="mt-1">
                        <input
                        id="username"
                        name="username"
                        type="text"
                        autoComplete="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
                        />
                    </div>
                    {formData.username && !has8Chars && (
                        <p className="text-[10px] md:text-xs  absolute text-red-500 mb-2  text-left mx-3 transition-all duration-300">Username must be at least 8 characters</p>
                    )}
                    </div>
                    
                    <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <div className="mt-1">
                        <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        value={formData.password}
                        onChange={handleChange}
                        className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
                        />
                    </div>
                        {formData.password && (() => {
                            if(!hasLowercase) return <p className="text-[10px] md:text-xs my-1 absolute text-red-500 mb-2  text-left mx-3 transition-all duration-300">Password must contain a lowercase letter</p>
                            if(!hasUppercase) return <p className="text-[10px] md:text-xs my-1  absolute text-red-500 mb-2  text-left mx-3 transition-all duration-300">Password must contain an uppercase letter</p>
                            if(!hasSpecialChar) return <p className="text-[10px] md:text-xs my-1  absolute text-red-500 mb-2  text-left mx-3 transition-all duration-300">Password must contain a special character</p>
                            return null;
                        })()}
                    </div>
    
                    <div className="space-y-2 relative top-3">
                        <div className="h-2 w-full bg-gray-200 rounded-full">
                            <div 
                                className={`h-full rounded-full transition-all duration-300 ${getStrengthColor()}`}
                                style={{ width: `${(getPasswordStrength() / 4) * 100}%` }}
                            ></div>
                        </div>
                        <p className="text-xs text-gray-600">
                            Password strength: {
                                getPasswordStrength() === 0 ? 'Very Weak' :
                                getPasswordStrength() === 1 ? 'Weak' :
                                getPasswordStrength() === 2 ? 'Medium' :
                                getPasswordStrength() === 3 ? 'Strong' :
                                'Very Strong'
                            }
                        </p>
                    </div>
            
                    
                    <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                        Confirm Password
                    </label>
                    <div className="mt-1">
                        <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        autoComplete="new-password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
                        />
                    </div>
                        {formData.confirmPassword && !passwordMatch && (
                            <p className="text-[10px] md:text-xs  absolute text-red-500 mb-2 text-left mx-3 transition-all duration-300">Passwords do not match</p>
                        )}
                    </div>
                </div>

                    {authError && (
                        <div className="rounded-md bg-red-50 p-4">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-red-700">{authError}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {successMessage && (
                        <div className="rounded-md bg-green-50 p-4">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-10.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414L9 13.414l5.707-5.707z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-green-700">{successMessage}</p>
                                </div>
                            </div>
                        </div>
                    )}


                    <div>
                        <button
                            type="submit"
                            className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none disabled:opacity-50
                             disabled:cursor-not-allowed disabled:hover:bg-indigo-600 disabled:hover:text-white active:bg-indigo-600 active:scale-95 transition-transform duration-150"
                            disabled={!formData.username || !formData.password || !formData.confirmPassword || !has8Chars || !hasLowercase || !hasUppercase || !hasSpecialChar || !passwordMatch}
                        >
                            Sign up
                        </button>
                    </div>
                </form>
                <p className="mt-4 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500 transition duration-200">
                        Login here
                    </a>
                </p>

            </div> 
        </div>
    );
};

export default SignupPage;