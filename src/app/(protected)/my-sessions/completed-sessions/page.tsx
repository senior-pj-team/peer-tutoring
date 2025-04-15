import React from 'react'
import SessionCards from '@/components/custom/sessionCards'


const page = () => {
  return (
    <div className="grid grid-cols-4 gap-4">
      <SessionCards sessionName="Example sesession name" courseCode="10125" courseName="Web development"/>
      <SessionCards sessionName="Example sesession name" courseCode="10125" courseName="Web development"/>
      <SessionCards sessionName="Example sesession name" courseCode="10125" courseName="Web development"/>
      <SessionCards sessionName="Example sesession name" courseCode="10125" courseName="Web development"/>
      <SessionCards sessionName="Example sesession name" courseCode="10125" courseName="Web development"/>
      <SessionCards sessionName="Example sesession name" courseCode="10125" courseName="Web development"/>
      <SessionCards sessionName="Example sesession name" courseCode="10125" courseName="Web development"/>
    </div>
  )
}

export default page