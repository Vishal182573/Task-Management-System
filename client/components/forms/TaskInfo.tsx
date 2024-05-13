"use client"
import { useState,useEffect} from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {calculateDaysDifference} from "@/lib/dateUtils";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import CalendarForm from "@/components/shared/Calender"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"



export default function TaskInformation() {
    const [startDate, setStartDate] = useState('2024-05-10'); // Example input date
    const [daysDifference, setDaysDifference] = useState(0);
    useEffect(() => {
        setDaysDifference(calculateDaysDifference(startDate));
    }, [startDate]);
   return(
    <div className="w-full py-8 px-24 shadow-2xl">
    <div className=" w-full flex justify-between items-center ">
        <div className="flex space-x-4 justify-center items-center">
            <Label htmlFor="taskname">Task Name</Label>
            <Input id="taskname" type="taskname" placeholder="" required className="border-[1px] rounded-sm border-[#312c2c] w-80" />
        </div>
        <div className="flex space-x-4 justify-center items-center">
            <Label htmlFor="assignee">Assignee</Label>
            <DropdownMenu>
                <DropdownMenuTrigger className="border-[1px] border-[#312c2c] rounded-full p-1">DTU SE DEPT</DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>DTU IT DEPT</DropdownMenuItem>
                    <DropdownMenuItem>DTU CSE DEPT</DropdownMenuItem>
                    <DropdownMenuItem>DTU ECE DEPT</DropdownMenuItem>
                    <DropdownMenuItem>DTU EE DEPT</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    </div>
    <div className=" w-full flex justify-start items-center my-4">
        <div>
            <Label htmlFor="taskname">Description</Label>
            <Textarea className="resize-none h-20 w-[412px] border-[1px] rounded-sm border-[#312c2c] " />
        </div>
    </div>
    <div className="flex items-center space-x-20 my-4">
        <Label htmlFor="">Start Date</Label>
        <CalendarForm />
    </div>
    <div className="flex items-center space-x-20 my-4">
        <Label htmlFor="" >End Date</Label>
        <CalendarForm />
    </div>
    <div className="flex  items-center space-x-20 my-4">
        <Label htmlFor="">Days Exceeded</Label>
        <Input id="dateExceeded" type="" value={daysDifference} placeholder="" className="border-[1px] rounded-sm border-[#312c2c] w-10" disabled={true}/>
        Days
    </div>
    <div className="flex space-x-4 items-center">
        <Label htmlFor="assignee">Status</Label>
        <DropdownMenu>
            <DropdownMenuTrigger className="border-[1px] border-[#312c2c] rounded-full p-1">Completed</DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>In Progress</DropdownMenuItem>
                <DropdownMenuItem>Pending</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
    <div className="p-2  flex space-x-10 justify-end items-center my-4 ">
        <div>
            <AlertDialog>
                <AlertDialogTrigger className="bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 w-24 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 p-2">
                    Delete
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete this task from server.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction >Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
        <Button className="w-24 bg-green-700">Save</Button>
    </div>
</div>
   );
}