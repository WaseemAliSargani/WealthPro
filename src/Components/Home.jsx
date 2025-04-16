import React from 'react'
// components
import Nav from '../Components/HomeNav'
import HomeHero from './HomeHero'
import HomeMessage from './HomeMessage'
import HomeOption from './HomeOption'
import RechargeComponent from './RechargeComponent'
import Plans from './Plans'


const Home = () => {
  return (
    <div className='w-full px-4 bg-black'>
      <Nav />
      <HomeHero />
      <HomeMessage />
      <HomeOption />
      <Plans />
    </div>
  )
}

export default Home
