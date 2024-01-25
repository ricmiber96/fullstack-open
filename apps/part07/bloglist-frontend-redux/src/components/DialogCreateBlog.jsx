import React from 'react';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from './ui/button';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Save } from 'lucide-react';
import { Plus } from 'lucide-react';

export default function DialogCreateBlog(props) {
    return (
        <Dialog>
        <DialogTrigger asChild>
            <Button>
                <Plus className='mr-2 w-4 h-4' /> Create Blog
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Blog</DialogTitle>
            <DialogDescription>
                Fill out the form below to add a new blog.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Title
              </Label>
              <Input
                id="name"
                defaultValue="New Blog"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Author
              </Label>
              <Input
                id="username"
                defaultValue="johndoe"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Url
              </Label>
              <Input
                id="username"
                defaultValue="https://www.google.com/"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">
               <Save className='mr-2 w-4 h-4'/> Save changes
            </Button>
            <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
}
