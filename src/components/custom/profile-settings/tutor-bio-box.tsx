'use client'
import React, { useState } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { BookText, Pencil } from 'lucide-react'

const TutorBioBox = ({ bio }: { bio: string }) => {
    const [disable, setDisable] = useState(true)
    const handleToggle = () => {
        setDisable(!disable)
    }
    return (
        <Card>
            <CardHeader className="flex items-center justify-between">
                <h2 className="text-lg font-semibold flex items-center"><BookText className="w-5 h-5 mr-2 text-muted-foreground" />Bio</h2>
                <Button variant="ghost" size="icon" onClick={handleToggle} className='hover:bg-orange-200 cursor-pointer'><Pencil className="w-4 h-4" /></Button>
            </CardHeader>
            <CardContent>
                <Textarea
                    rows={6}
                    defaultValue={bio}
                    placeholder="Tell students more about your experience and teaching style"
                    disabled={disable}
                />
            </CardContent>
        </Card>
    )
}

export default TutorBioBox