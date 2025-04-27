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
// import { useCurrentRole } from "@/hooks/use-current-role"
// import { useRouter } from "next/navigation"
import Swal from "sweetalert2"
import { formatDateToDDMMYY } from "@/_functions"
import { privateRequest } from "@/config"
import { toast } from "sonner"

type User = {
  userid: string
  id: string
  name: string
  iname: string
  sector: string
  amount: string
  roi: string
  open_date: string
  closing_date: string
}

export default function DataTableDemo() {
    // const role = useCurrentRole();
    // const navigate = useRouter();
    // React.useEffect(() => {
    //     if (role !== "ADMIN") {
    //         navigate.back(); // Redirects the user to the previous page
    //     }
    // }, [role, navigate]);

    // const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
    const {data: allUsers, isLoading, error} = useAllUser()
    const [data, setData] = React.useState<User[]>([])
    React.useEffect(() => {
      if (allUsers) {
        // Collect transactions into a single array of User objects
        const users: User[] = allUsers.flatMap((user) => {
          if (user.userPortfolio?.length > 0) {
            return user.userPortfolio.map((transaction) => ({
              userid: transaction.userid || user.id,
              id: transaction.id,
              name: user.name || "N/A",
              iname: transaction.name || "N/A",
              sector: transaction.sector,
              amount: transaction.amount || "N/A",
              roi: transaction.roi || "N/A",
              open_date: (transaction.opened_date) || "N/A",
              closing_date:(transaction.close_date)
            }));
          }
          return [];
        });
    
        // Update state with collected users
        setData(users);
      }
    }, [allUsers]);


    const columns: ColumnDef<User>[] = [
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
      },
      {
        accessorKey: "iname",
        header: "Investment",
        cell: ({ row }) => <div className="capitalize">{row.getValue("iname")}</div>,
      },
      {
        accessorKey: "sector",
        header: "Sector",
        cell: ({ row }) => <div className="capitalize">{row.getValue("sector")}</div>,
      },
      {
        accessorKey: "amount",
        header: () => <div className="text-right">Amount</div>,
        cell: ({ row }) => {
          const amount = parseFloat(row.getValue("amount"));
    
          // Format the amount as a dollar amount
          const formatted = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(amount);
    
          return <div className="text-right font-medium">{formatted}</div>;
        },
      },
      {
        accessorKey: "roi",
        header: "ROI",
        cell: ({ row }) => <div className="capitalize">{row.getValue("roi") + "%"}</div>,
      },
      {
        accessorKey: "open_date",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Open Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => (
          <div className="capitalize">{formatDateToDDMMYY(row.getValue("open_date"))}</div>
        ),
        sortingFn: "datetime", // Ensures correct sorting for date fields
      },
      {
        accessorKey: "closing_date",
        header: "Closing Date",
        cell: ({ row }) => (
          <div className="capitalize">{formatDateToDDMMYY(row.getValue("closing_date"))}</div>
        ),
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
                <DropdownMenuItem onClick={() => Delete({ id: user.id, userid: user.userid })}>
                  Delete {isPending && "ing"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ];
    

    const [isPending, startTransition] = React.useTransition()
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
                        .delete(`/delete-investment?id=${value.id}&userId=${value.userid}`)
                        .then((data) => {
                            if (data.status === 200) {
                                Swal.fire({
                                    title: "Deleted!",
                                    text: "Your transaction has been deleted.",
                                    icon: "success",
                                });
                                toast.success("Transaction deleted successfully");
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
      { id: "open_date", desc: true }, // Default sorting: Most Recent First
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
      onRowSelectionChange: setRowSelection,
      onColumnFiltersChange: setColumnFilters,
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
