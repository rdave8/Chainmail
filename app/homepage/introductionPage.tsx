'use client'
import React, { useState, ChangeEvent } from 'react';

export default function Homepage() {
  const [inputValue, setInputValue] = useState<string>('');

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  }

  const handleSubmit = () => {
    console.log(inputValue);
  }

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-black relative">
    <video autoPlay loop muted className="absolute z-0 min-w-full min-h-full w-auto h-auto object-cover">
      <source src="background_loop_video - Made with Clipchamp (1).mp4" type="video/mp4" />
    </video>
    <div className="text-center absolute z-10">
      <h1 className="text-white font-bold text-9xl mb-8 font-serif fade-in fade-in-1">
        Aegis
      </h1>
      <p className="text-gray-400 text-4xl italic font-serif mb-16 fade-in fade-in-2">
        The most advanced AI model to optimize smart contracts to date
      </p>
      <div className="flex flex-col items-center fade-in fade-in-3">
        <textarea className="w-64 h-20 px-4 py-2 border-2 border-gray-300 bg-white text-black rounded-lg shadow-lg focus:outline-none focus:border-indigo-500 resize" placeholder="Enter the smart contract code here" onChange={handleChange}></textarea>
        <button onClick={handleSubmit} className="mt-8 bg-purple-500 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded fade-in-4">Submit</button>
      </div>
    </div>
  </div>
  );
}