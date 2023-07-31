import React from 'react'

export default function WrapperMaxWidth({children}:{children:React.ReactNode}) {
  return (
    <div className='max-w-7xl xl:mx-auto px-4 sm:px-6 lg:px-8'>
        {children}
    </div>
  )
}
