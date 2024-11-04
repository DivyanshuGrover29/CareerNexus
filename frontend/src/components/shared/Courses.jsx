import React from 'react';
import { Button } from '../ui/button';
const Courses = () => {
  return (
    <div
      className="courses-section my-16 mx-auto max-w-5xl p-10 rounded-lg shadow-lg text-center relative bg-cover bg-center"
      style={{
        backgroundImage: `url(${'https://tse3.mm.bing.net/th?id=OIP.15ywGbjVqwmUsA52E93DOwHaE7&pid=Api&P=0&h=180'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#fff',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/50 to-indigo-500/50 rounded-lg"></div> {/* Overlay */}
      
      <div className="relative z-10 p-8">
        <h2 className="text-4xl font-bold mb-4">Boost Your Skills with Top Courses</h2>
        <p className="text-lg font-light mb-6">
          Discover a variety of courses to elevate your expertise and career potential.
        </p>
        <a href="https://skillsikho-by-careernexus.vercel.app/" target="_blank" rel="noopener noreferrer">
          <Button className="px-8 py-3 bg-white text-purple-600 font-semibold rounded-full shadow-md hover:bg-gray-200 transition duration-300 ease-in-out">
            Explore Courses
          </Button>
        </a>
      </div>
    </div>
  );
}

export default Courses;
