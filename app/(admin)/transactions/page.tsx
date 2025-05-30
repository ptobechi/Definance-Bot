"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  ArrowUpDown,
  ChevronDown,
  MoreHorizontal
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import useAllUser from "@/hooks/all-users"
import Swal from "sweetalert2"
import { privateRequest } from "@/config"
import { toast } from "sonner"
import { formatDateToDDMMYY } from "@/_functions"
import { FaCheckCircle, FaQuestionCircle } from "react-icons/fa"
import { FaMarkdown } from "react-icons/fa6"


type User = {
  userid: string
  id: string
  name: string
  email: string
  amount: string
  date: string
  type: string
  info: string
  status: "pending" | "processing" | "success" | "failed"
}


export default function DataTableDemo() {
  // const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] =React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const {data: allUsers, isLoading, error} = useAllUser()
  const [data, setData] = React.useState<User[]>([])

  React.useEffect(() => {
    const reload = () => {
      if (allUsers) {
        // Collect transactions into a single array of User objects
        const users: User[] = allUsers.flatMap((user) => {
          if (user.transactions?.length > 0) {
            return user.transactions.map((transaction) => ({
              userid: transaction.userid || user.id,
              id: transaction.id,
              name: user.name || "N/A",
              email: user.email || "N/A",
              amount: transaction.transaction_amount || "N/A",
              date: transaction.transaction_date || "N/A",
              type: transaction.transaction_type || "N/A",
              info: transaction.transaction_info || "N/A",
              status: transaction.transaction_status === "pending" ? "pending" : "success"
            }));
          }
          return [];
        });
    
        // Update state with collected users
        setData(users);
      }
    }
    reload()
  }, [allUsers]);

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "type",
      enableHiding: false,
      header: "Type",
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="capitalize flex items-center space-x-2">
            {user.status === "pending" ? (
              <FaQuestionCircle className="text-yellow-500 text-2xl" />
            ) : (
              <FaCheckCircle className="text-green-500 text-2xl" />
            )}
            <span>{row.getValue("type")}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "info",
      header: "Currency - Address",
      cell: ({ row }) => <div className="capitalize">{row.getValue("info")}</div>,
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "amount",
      header: () => <div className="text-right">Amount</div>,
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("amount"));
  
        // Format the amount as USD
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);
  
        return <div className="text-right font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: "date", // Ensure transactions have a date field
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="capitalize">{formatDateToDDMMYY(row.getValue("date"))}</div>
      ),
      sortingFn: "datetime", // Use correct sorting function for dates
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const user = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {loading ? (
                <>processing..</>
              ) : (
                <DropdownMenuItem
                  onClick={() =>
                    ProcessTransaction({
                      id: user.id,
                      userid: user.userid,
                      name: user.name,
                      email: user.email,
                      status: user.status,
                      amount: user.amount,
                      type: user.type,
                      info: user.info,
                    })
                  }
                >
                  {user.status === "pending" ? "Accept" : "Reject"}
                  {isPending && "ing"}
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => Delete({ id: user.id, userid: user.userid })}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  
  
  
  const [loading, setLoading] = React.useState(false)
  const [isPending, startTransition] = React.useTransition()
  const ProcessTransaction = async (value: any) => {
    toast.success("updating transaction");
    setLoading(true)
    startTransition(() => {
        privateRequest.post("/update-transaction", value)
          .then((data) => {
              if (data.status === 200) {
                  toast.success("updated successful");
              }
          })
          .catch((error) => {
              toast.error(
                  error.error || "Unable to complete transaction at this time, please try again later"
              );
          });
          window.location.reload()
        setLoading(false)
    });
  }

  const Delete = async (value: any) => {
      Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
      }).then((result) => {
          if (result.isConfirmed) {
              toast.success("deleting record");
              startTransition(() => {
                  privateRequest
                      .delete(`/delete-transaction?id=${value.id}&userId=${value.userid}`)
                      .then((data) => {
                          if (data.status === 200) {
                              Swal.fire({
                                  title: "Deleted!",
                                  text: "Your transaction has been deleted.",
                                  icon: "success",
                              });
                              toast.success("Transaction deleted successfully");
                              window.location.reload()
                          }
                      })
                      .catch((error) => {
                          toast.error(
                              error.error || "Unable to delete transaction at this time, please try again later"
                          );
                      });
              });
          }
      });
  };

  const [sorting, setSorting] = React.useState<SortingState>([
    { id: "date", desc: true }, // Default sorting: Most Recent First
  ]);
  
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
      onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  // const table = useReactTable({
  //   data,
  //   columns,
  //   onSortingChange: setSorting,
  //   onColumnFiltersChange: setColumnFilters,
  //   getCoreRowModel: getCoreRowModel(),
  //   getPaginationRowModel: getPaginationRowModel(),
  //   getSortedRowModel: getSortedRowModel(),
  //   getFilteredRowModel: getFilteredRowModel(),
  //   onColumnVisibilityChange: setColumnVisibility,
  //   onRowSelectionChange: setRowSelection,
  //   state: {
  //     sorting,
  //     columnFilters,
  //     columnVisibility,
  //     rowSelection,
  //   },
  // })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Search..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
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
                  {
                    isLoading ? "fetching data" : " No results."
                  }
                 
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
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
    </div>
  )
}
