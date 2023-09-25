/* eslint-disable import/no-duplicates */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
// eslint-disable-next-line import/no-duplicates
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import AppBar from './AppBar';
import Icon from './assets/subhub-high-resolution-logo-black-on-transparent-background.png';
import './Login.module.css';



export default function Login() {
  console.log(window.ipcRenderer);

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const Navigate = useNavigate();

  const validate = () => {
    console.log("email", email, pass);
    fetch('http://localhost:8080/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, pass }),
    }).then((res) => {
      if (res.status === 200) {
        Navigate('/');
      }
    });
  }



  return (
    <div className="flex flex-col h-screen">
      {window.Main && (
        <div className="app-bar">
          <AppBar />
        </div>
      )}

<div className="w-full min-h-screen bg-gray-50 flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
  <div className="w-full sm:max-w-md p-5 mx-auto">
  <h2 className="mb-4 text-center text-5xl font-extrabold">Welcome to</h2>
  <img className='mb-4 w-full flex-col' src={Icon} alt="Icon of Electron" />
    <form>
      <div className="mb-4">
        <label className="block mb-1" htmlFor="email">Email-Address</label>
        <input onChange={
          (e) => {
            setEmail(e.target.value);
          }
        } id="email" type="text" name="email" className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full" />
      </div>
      <div className="mb-4">
        <label className="block mb-1" htmlFor="password">Password</label>
        <input onChange={
          (e) => {
            setPass(e.target.value);
          }
        } id="password" type="password" name="password" className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full" />
      </div>
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center">
          <input id="remember_me" type="checkbox" className="border border-gray-300 text-red-600 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50" />
          <label htmlFor="remember_me" className="ml-2 block text-sm leading-5 text-gray-900"> Remember me </label>
        </div>
        <a href="/app" className="text-sm"> Forgot your password? </a>
      </div>
      <div className="mt-6">
        <button 
        onClick={
          (e) => {
            e.preventDefault();
            validate();
          }
        }
        className="w-full inline-flex items-center justify-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-red-700 active:bg-red-700 focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200 disabled:opacity-25 transition">Sign In</button>
      </div>
      <div className="mt-6 text-center">
        <a href="/signup" className="underline">Sign up for an account</a>
      </div>
    </form>
  </div>
</div>
    </div>
  );
}
