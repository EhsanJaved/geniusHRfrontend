import React from 'react'
import JobPosting from "./JobPosting";
import JobList from "./JobList";

export default function Jobs() {
  return (
    <>
     <div className='flex justify-between pr-9'>
        <h1 className="text-3xl font-bold pl-8 pb-4 selected-efect-3d">All job Postings</h1>
        <div>
        <JobPosting />
        </div>
      </div>
    <div>
            <JobList />
        </div>
    </>
  )
}
