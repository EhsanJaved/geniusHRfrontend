import React from 'react'
import ApplicationsList from './ApplicationsList'

export default function ApplicationsPage() {
  return (
    <>
         <div className='flex justify-between pr-9'>
        <h1 className="text-3xl font-bold pl-8 pb-4 selected-efect-3d">Applications</h1>
        <div>
        </div>
      </div>
    <ApplicationsList/>
    </>
  )
}
