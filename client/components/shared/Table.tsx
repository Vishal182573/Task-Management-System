"use client";
import { useEffect, useState } from "react";
import {
  ColumnDef,
  flexRender,
  SortingState,
  getSortedRowModel,
  getCoreRowModel,
  useReactTable,
  ColumnFiltersState,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUpDown, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";
import { calculateDelay, cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getAllTasks } from "@/lib/api";
import { CalendarIcon } from "@radix-ui/react-icons";
import { ADMIN, LG, NODALOFFICER } from "@/global/constant";
import { useUserContext } from "@/global/userContext";
import { Task } from "@/global/types";


export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "assignedTo",
    header: "Institute",
  },
  {
    accessorKey: "assignedo",
    header: "Nodal Officer",
    cell: () => <span>Rinku Singh</span>,
  },
  {
    accessorKey: "taskId",
    header: "Task ID",
    cell: ({ row }) => {
      return (
        <Link
          href={`/view-task/${row.original.taskId}`}
          className="text-blue-500"
        >
          {row.original.taskId}
        </Link>
      );
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-black font-bold"
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <span className="pl-4">{row.original.title}</span>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Select
          onValueChange={(value) => {
            if (value === "all") {
              column.setFilterValue(undefined);
            } else {
              column.setFilterValue(value);
            }
          }}
        >
          <SelectTrigger className="text-black font-bold w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="pending">In Progress</SelectItem>
            <SelectItem value="delayed">Delayed</SelectItem>
          </SelectContent>
        </Select>
      );
    },
    cell: ({ row }) => {
      return <span className="pl-3">{row.original.status}</span>;
    },
  },
  {
    accessorKey: "startingDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-black font-bold"
        >
          Starting Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.original.startingDate);
      return <span className="pl-4">{date.toLocaleDateString()}</span>;
    },
  },
  {
    accessorKey: "endingDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-black font-bold"
        >
          Ending Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.original.startingDate);
      return <span className="pl-4">{date.toLocaleDateString()}</span>;
    },
  },
  {
    accessorKey: "delay",
    header: "Time Exceeded",
  },
];

interface DashboardTableProps<TData, TValue> {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
}

function DataTable<TData, TValue>({
  columns,
  data,
}: DashboardTableProps<TData, TValue>) {
  const { user } = useUserContext();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2024, 0, 1),
    to: new Date(),
  });
  const [filterDateType, setFilterDateType] = useState<
    "starting" | "ending" | "none"
  >("none");

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const filteredData = data.filter((task: any) => {
    if (filterDateType === "none" || !date?.from || !date?.to) return true;
    const taskDate =
      filterDateType === "starting"
        ? new Date(task.startingDate)
        : new Date(task.endingDate);
    return taskDate >= date.from && taskDate <= date.to;
  });

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    autoResetPageIndex: false,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      pagination,
    },
  });

  return (
    <div>
      <div className={`flex items-center py-4 ${user?.role === ADMIN || user?.role === LG ? "justify-between" : "justify-end"}`}> 
        {/* TODO: add search by title bar for admin and officers */}
        {
          (user?.role === ADMIN || user?.role === LG) &&
          <Input
            placeholder="Search by institute"
            value={ 
              (table.getColumn("assignedTo")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("assignedTo")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        }
        <div className="flex">
          <div className="mr-3">
            <Select
              onValueChange={(value) => {
                setFilterDateType(value as "starting" | "ending");
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No Filter </SelectItem>
                <SelectItem value="starting">Starting Date</SelectItem>
                <SelectItem value="ending">Ending Date</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="mr-3">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-[300px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, "LLL dd, y")} -{" "}
                        {format(date.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(date.from, "LLL dd, y")
                    )
                  ) : (
                    "Pick a date"
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className=" text-black font-bold"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="text-sm"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

const DashboardTable = () => {
  const { user, loading } = useUserContext();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {

    if (loading) return;

    const fetchData = async () => {
      let data = await getAllTasks();
      console.log(user)
      if (user?.role !== ADMIN && user?.role !== LG) {
        data = data.filter((item: any) => item.assignedTo === user?.institute);
      }

      const taskWithData = data.map((task: any) => {
        return {
          ...task,
          delay: calculateDelay(task.endingDate),
        };
      });

      setTasks(taskWithData);
    };
    fetchData();
  }, [user, loading]);

  if (loading) {
    return <div>Loading...</div>; // Add a loading state to handle the loading scenario
  }

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={tasks} />
    </div>
  );
};

export default DashboardTable;
