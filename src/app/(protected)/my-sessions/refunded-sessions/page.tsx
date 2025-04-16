import React from 'react'
import SessionCards from '@/components/session/sessionCards'


const page = () => {
  return (
    <div className="grid grid-cols-4 gap-4">
      <SessionCards sessionName="Example session name" courseCode="10125" courseName="Web development" cardType='refunding'/>
      <SessionCards sessionName="Example session name" courseCode="10125" courseName="Web development" cardType='refunding'/>
      <SessionCards sessionName="Example session name" courseCode="10125" courseName="Web development" cardType='refunding'/>
      <SessionCards sessionName="Example session name" courseCode="10125" courseName="Web development" cardType='refunding'/>
      <SessionCards sessionName="Example session name" courseCode="10125" courseName="Web development" cardType='refunding'/>
      <SessionCards sessionName="Example session name" courseCode="10125" courseName="Web development" cardType='refunding'/>
      <SessionCards sessionName="Example session name" courseCode="10125" courseName="Web development" cardType='refunding'/>
    </div>
  )
}

export default page