'use client'
import clsx from 'clsx';
import React, { useState } from 'react'
const Expandable = ({ text, className}: { text: string, className?: string }) => {
    const [expanded, setExpanded] = useState(false);
    const isLong = text.length > 400;
    const visibleText = isLong && !expanded ? text.slice(0, 500) : text
    const handleToggle = () => {
        setExpanded(!expanded);
    }
    return (
        <>
            <div className={clsx("relative", className)}>
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
                isLong && <button className='text-sm text-orange-400 bg-orange-50 cursor-pointer hover:text-orange-600 p-2 rounded'
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