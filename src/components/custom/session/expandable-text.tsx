'use client'
import React, { useState } from 'react'
const Expandable = ({ text }: { text: string }) => {
    const [expanded, setExpanded] = useState(false);
    const isLong = text.length > 300;
    const visibleText = isLong && !expanded ? text.slice(0, 300) : text
    const handleToggle = () => {
        setExpanded(!expanded);
    }
    return (
        <>
            <div className='relative'>
                <p className='text-gray-700 text-justify'>
                    {visibleText}
                    {
                        isLong && !expanded && <span>...</span>
                    }
                </p>
                {
                    isLong && !expanded &&
                    <div className='absolute inset-0 bg-gradient-to-t from-white'>
                    </div>
                }
            </div>
            {
                isLong && <button className='text-orange-400 bg-orange-50 cursor-pointer hover:text-orange-600 p-2 rounded'
                    onClick={handleToggle}
                >
                    {
                        expanded
                            ? <span>Show Less ▲</span>
                            : <span>Show More ▼</span>
                    }
                </button>
            }
        </>
    )
}

export default Expandable