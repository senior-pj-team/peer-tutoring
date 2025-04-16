import React from 'react'

const layout = ({children}: Readonly<{children: React.ReactNode}>) => {
  return (
    <div>
        <div className='px-6 py-6'>
            <h1 className='text-5xl'>Example Session Name</h1>
            <div>
                <div className='text'>
                    <span>110125</span>
                    |
                    <span>Web Application Development</span>
                </div>
            </div>
        </div>
        <hr />
        <div>

        </div>
        {children}
    </div>
  )
}

export default layout