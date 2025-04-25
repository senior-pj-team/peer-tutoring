'use client'
import React, { useState } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Sparkles, Pencil } from 'lucide-react'
import { Input } from '@/components/ui/input'

const TutorHighLightBox = ({ highlight }: { highlight: string }) => {
    const [disable, setDisable] = useState(true)
    const handleToggle = () => {
        setDisable(!disable)
    }
    return (
        <Card>
            <CardHeader className="flex items-center justify-between">
                <h2 className="text-lg font-semibold flex items-center"><Sparkles className="w-5 h-5 mr-2 text-muted-foreground" />
                    Highlight</h2>
                <Button variant="ghost" size="icon" onClick={handleToggle} className='hover:bg-orange-200 cursor-pointer'><Pencil className="w-4 h-4" /></Button>
            </CardHeader>
            <CardContent>
                <Input
                    placeholder="Short highlight about you"
                    defaultValue={highlight}
                    disabled={disable}
                />
            </CardContent>
        </Card>
    )
}

export default TutorHighLightBox