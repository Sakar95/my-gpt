import React from 'react'
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import Robot from "../Assets/Robot_img.webp"

function HomePageBox({ text,subtext, path, img }) {
  const navigate = useNavigate()
  return (
    <div
      className="mt-8 flex flex-col lg:flex-row items-center justify-center bg-gray-800 bg-opacity-50 p-4 rounded-lg shadow-lg shadow-purple-500/50 border border-purple-500 cursor-pointer h-auto lg:h-56"
      onClick={() => navigate(`/${path}`)}
    >
      <motion.img
        src={img}
        alt="Robot"
        className="w-40 h-auto lg:h-40"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      />

      <motion.div
        className="ml-0 lg:ml-2 mt-4 lg:mt-0"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <h2 className="text-2xl sm:text-3xl text-center text-purple-300 font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
          style={{ fontFamily: "Ubuntu" }}
        >
          {text}
        </h2>

        <div className="text-md sm:text-lg text-center text-purple-300 "
          style={{ fontFamily: "Ubuntu" }}
        >
          {subtext}
        </div>


      </motion.div>
    </div>
  )
}

export default HomePageBox
