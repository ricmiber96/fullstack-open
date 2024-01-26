import React from 'react'
import { Button } from '@/components/ui/button'
import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'
import { useSelector } from 'react-redux'

export default function ToastButton ({ icon, text, title, description, action, variant }) {
  const notification = useSelector((state) => state.notification)
  const { toast } = useToast()
  const error = false

  return (
    <Button
      type="submit"
      onClick={() => {
        toast({
          variant: `${error ? 'destructive' : ''}`,
          title,
          description
        })
      }}>
        {icon}{text}
    </Button>
  )
}
