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
  MoreHorizontal
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
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
import { FaPlus } from "react-icons/fa6"
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { uploadWalletAddress } from "@/actions/upload-address"
import FormError from "@/components/form-error"
import FormSucces from "@/components/form-success"
import useAllPaymentAddress from "@/hooks/all-wallet"
import { useCurrentRole } from "@/hooks/use-current-role"
import { useRouter } from "next/navigation"

type Address = {
  id: string
  name: string
  network: string
  symbol: string
  address: string
}

const columns: ColumnDef<Address>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "network",
    header: "Network",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("network")}</div>
    ),
  },
  {
    accessorKey: "symbol",
    header: "Symbol",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("symbol")}</div>
    ),
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("address")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original

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
            <DropdownMenuItem 
            onClick={() => navigator.clipboard.writeText(user.id)}
            >Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export default function DataTableDemo() {
    const role = useCurrentRole();
    const navigate = useRouter();

    React.useEffect(() => {
        if (role !== "ADMIN") {
            navigate.back(); // Redirects the user to the previous page
        }
    }, [role, navigate]);

    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
    )
    const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const {data: allAddress, isLoading} = useAllPaymentAddress();
    const [data, setData] = React.useState<Address[]>([]);
    React.useEffect(() => {
      if (allAddress) {
        // Transform allUsers into User[] and update state
        const addresses: Address[] = allAddress.map((addr) => ({
          id: addr.id || "N/A", // Default value if id is not present
          name: addr.name || "N/A",
          network: addr.network || "N/A",
          symbol: addr.symbol || "N/A",
          address: addr.publicAddress || "N/A",
        }));
        setData(addresses);
      }
    }, [allAddress]);

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    const [address, setAddress] = React.useState('');
    const [symbol, setSymbol] = React.useState('');
    /**
     * built in state transition function to monitor form submit states
     */
    const [isPending, startTransition] = React.useTransition()
    const [error, setError] = React.useState<string | undefined>("")
    const [success, setSuccess] = React.useState<string | undefined>("")
    
    const handleSubmit = (e: any) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        let name;

        if (symbol === "btc")
            name = "Bitcoin";
        else if (symbol === "eth")
            name = "Ethereum";
        else if (symbol === "usdt")
            name = "Tether USDT"
        else
            name = "N/A"
        
        startTransition(() => {
            uploadWalletAddress({name, address, symbol, network: ""})
                .then((data) => {
                    setError(data.error)
                    setSuccess(data.success)
                })
        });
    }

    return (
        <div className="w-full">
            <div className="flex items-center py-4">
                <Input placeholder="Search..."
                    value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                    table.getColumn("name")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <DropdownMenu>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="outline" className="ml-auto">Add Wallet <FaPlus /></Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogTitle>Add Deposit Wallet</AlertDialogTitle>
                                <form className="space-y-8" onSubmit={handleSubmit}>
                                    <div className="grid w-full max-w-sm items-center gap-1.5">
                                        <Label htmlFor="address">Address</Label>
                                        <Input
                                            id="address"
                                            placeholder="Address"
                                            type="text"
                                            value={address}
                                            disabled={isPending}
                                            onChange={(e) => setAddress(e.target.value)}
                                        />
                                    </div>

                                    <div className="grid w-full max-w-sm items-center gap-1.5">
                                        <Label htmlFor="address">Symbol</Label>
                                        <Select
                                            onValueChange={(e) => setSymbol(e)}
                                            value={symbol}
                                             disabled={isPending}

                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a symbol" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Select address symbol</SelectLabel>
                                                    <SelectItem value="btc">Bitcoin</SelectItem>
                                                    <SelectItem value="eth">Ethereum</SelectItem>
                                                    <SelectItem value="usdt">Tether USDT</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <FormError message={error}/>
                                    <FormSucces message={success}/>
                                    <Button disabled={isPending} type="submit">Submit</Button>
                                </form>
                        </AlertDialogContent>
                    </AlertDialog>
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
