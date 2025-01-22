"use client";

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import useUser from "@/hooks/user";
import { useEffect, useState, useTransition } from "react";
import { coinDetail, formatDateToDDMMYY, formatToUSD } from "@/_functions";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { 
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import FormError from "@/components/form-error";
import FormSucces from "@/components/form-success";
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
    ChevronDown,
} from "lucide-react"
import {
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { toast } from "sonner";
import { privateRequest } from "@/config";

interface CryptoPortfolio {
    crypto_name:            string;
    crypto_symbol:          string;
    crypto_bal:             string;
    crypto_prev_bal?:       string;
    logo_url?:              string;
    usd_balance?:           string;
    crypto_rate?:           string;
}

type User = {
    iname: string
    amount: string
    roi: string
    open_date: string
    closing_date: string
    // status: "pending" | "processing" | "success" | "failed"
}

const columns: ColumnDef<User>[] = [
    {
        accessorKey: "iname",
        header: "Invesment",
        cell: ({ row }) => (
        <div className="capitalize">{row.getValue("iname")}</div>
        ),
    },
    {
        accessorKey: "amount",
        header: () => <div className="text-right">Amount</div>,
        cell: ({ row }) => {
        const amount = parseFloat(row.getValue("amount"))

        // Format the amount as a dollar amount
        const formatted = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(amount)

        return <div className="text-right font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "roi",
        header: "ROI",
        cell: ({ row }) => (
        <div className="capitalize">{row.getValue("roi")+"%"}</div>
        ),
    },
    {
        accessorKey: "open_date",
        header: "Open",
        cell: ({ row }) => (
        <div className="capitalize">{row.getValue("open_date")}</div>
        ),
    },
    {
        accessorKey: "closing_date",
        header: "Closing",
        cell: ({ row }) => (
        <div className="capitalize">{row.getValue("closing_date")}</div>
        ),
    },
]

type UserTransaction = {
    date: string
    amount: string
    type: string
    info: string
}

const usertransactions: ColumnDef<UserTransaction>[] = [
    {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => (
        <div className="capitalize">{row.getValue("type")}</div>
        ),
    },
    {
        accessorKey: "info",
        header: "Currency - Address",
        cell: ({ row }) => (
        <div className="capitalize">{row.getValue("info")}</div>
        ),
    },
    {
        accessorKey: "amount",
        header: () => <div className="text-right">Amount</div>,
        cell: ({ row }) => {
        const amount = parseFloat(row.getValue("amount"))

        // Format the amount as a dollar amount
        const formatted = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(amount)

        return <div className="text-right font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }) => (
        <div className="capitalize">{formatDateToDDMMYY(row.getValue("date"))}</div>
        ),
    },
]

const Page = ({params} : {params:{id: string}}) => {
    const {data: user, isLoading, error} = useUser(params.id);
    const [walletBal, setWalletBal] = useState(0);
    const [investmentSum, setInvestmentSum] = useState(0);
    const [isPending, startTransition] = useTransition()
    const [error_msg, setErrorMsg] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")
    const [profile, setProfile] = useState<
        {
            name: string;
            email: string;
            password?: string;
            emailVerified?: string;
        }
    >()

    const [formData, setFormData] = useState<
        {
            crypto_name: string; 
            usd_balance?: string;
            crypto_bal: string;
            crypto_symbol: string;
            crypto_rate?: string;
        }[]
    >([]);

    const handleInputChange = async (
        index: number,
        field: keyof typeof formData[number],
        value: string
    ) => {
        const updatedFormData = [...formData];

        updatedFormData[index][field] = value;

        setFormData(updatedFormData);
    };

    const handleWalletUpdate = (e: any) => {
        e.preventDefault();

        if (user && user.cryptoPortfolio) {
            const updatedPortfolio = user.cryptoPortfolio.map(item => {
                // Find matching item in updatedData
                const matchingItem = formData.find(
                  update => update.crypto_symbol === item.crypto_symbol
                );
            
                // If a match is found, update the balances
                if (matchingItem && matchingItem.usd_balance && matchingItem.crypto_rate) {
                    const newBal = parseFloat(matchingItem.usd_balance) / parseFloat(matchingItem.crypto_rate)
                  return {
                    ...item,
                    crypto_prev_bal: item.crypto_bal, // Store current balance as previous balance
                    crypto_bal: newBal // Update with the new balance
                  };
                }
            
                // If no match is found, return the original item
                return item;
            });

            startTransition(() => {
                privateRequest.post("/update-user-bal", updatedPortfolio)
                    .then((data) => {
                        if (data.status === 200) {
                            setSuccess("Successful")
                            toast.success("updated successful");
                            // setTimeout(() => {
                            //     window.location.reload(); // Reload only if absolutely necessary
                            // }, 3000);
                        }
                    })
                    .catch((error) => {
                        setErrorMsg("Failed, try again")
                        toast.error(
                            error.error || "Unable to complete transaction at this time, please try again later"
                        );
                    });
            });
        }
    }

    useEffect(() => {
        const getWalletPortfolio = async () => {
            if (user)
                setProfile(user)
            const walletInfo: CryptoPortfolio[] = [];
            let totalBal = 0;

            if (user && user.cryptoPortfolio) {
                for (let i = 0; i < user.cryptoPortfolio.length; i++) {
                    const coinInfo = await (await coinDetail(user.cryptoPortfolio[i].crypto_symbol)).json()
                    
                    const usdBal: any = parseFloat(user.cryptoPortfolio[i].crypto_bal) * parseFloat(coinInfo.rate);
                    totalBal += parseFloat(usdBal);

                    walletInfo.push({
                        crypto_name: coinInfo.name,
                        crypto_symbol: user.cryptoPortfolio[i].crypto_symbol,
                        crypto_bal: Number.isInteger(user.cryptoPortfolio[i].crypto_bal) ? user.cryptoPortfolio[i].crypto_bal : parseFloat(user.cryptoPortfolio[i].crypto_bal).toFixed(5),
                        usd_balance: (parseFloat(user.cryptoPortfolio[i].crypto_bal) * parseFloat(coinInfo.rate)).toString(),
                        crypto_rate: (coinInfo.rate).toString(),
                        logo_url: coinInfo.webp64,
                    });
                }
            }
            setWalletBal(totalBal)
            setFormData(walletInfo)

        }
        getWalletPortfolio()
    }, [user])

    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})
    const [data, setData] = useState<User[]>([])
    const [transacionData, setTransactionData] = useState<UserTransaction[]>([])
    const [transactionSum, setTransactionSum] = useState(0);

    useEffect(() => {
        if (user && user.userPortfolio) {
            // Collect transactions into a single array of User objects
            const users: User[] = user.userPortfolio?.length
            ?   user.userPortfolio.map((transaction) => ({
                    iname: transaction.name || "N/A",
                    amount: transaction.amount || "N/A",
                    roi: transaction.roi || "N/A",
                    open_date: formatDateToDDMMYY(transaction.opened_date) || "N/A",
                    closing_date: formatDateToDDMMYY(transaction.close_date) || "pending",
                }))
            : [];
            
            let totalInvestment = 0;
            for (let i = 0; i < user.userPortfolio?.length; i++) {
                totalInvestment += parseFloat(user.userPortfolio[i].amount);
            }
        
            // Update state with collected users
            setData(users);
            setInvestmentSum(totalInvestment)
        }

        if (user && user.transactions) {
            // Collect transactions into a single array of Transaction objects
            const trnx: UserTransaction[] = user.transactions?.length
                ?   user.transactions.map((transaction) => ({
                        date: transaction.transaction_date || "N/A",
                        amount: transaction.transaction_amount || "N/A",
                        type: transaction.transaction_type || "N/A",
                        info: transaction.transaction_info || "N/A",
                    }))
                : [];
            
            let totalTrnx= 0;
            for (let i = 0; i < user.transactions?.length; i++) {
                totalTrnx += parseFloat(user.transactions[i].transaction_amount);
            }
        
            // Update state with collected users
            setTransactionData(trnx);
            setTransactionSum(totalTrnx)
        }
    }, [user]);

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

    const transactionTable = useReactTable({
        data: transacionData, // Corrected from 'transacionData' to 'data'
        columns: usertransactions,
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

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>
                    Profile Information {isLoading && "Loading..."}
                    {error && !user && (<> <br /><br />
                        <span className="text-red-600">
                            unable to load data at this moment, 
                            kindly refresh the page and check internet connectivity
                        </span>
                    </>)}
                </CardTitle>
            </CardHeader>

            <CardContent className="grid gap-4">
                <div>
                    <form>
                        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4">
                            {/* Name Input */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    placeholder="Enter Name"
                                    defaultValue={profile?.name}
                                />
                            </div>

                            {/* Framework Select */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    placeholder="Enter Email"
                                    defaultValue={profile?.email}
                                />
                            </div>

                            {/* Second Row - Name Input */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    placeholder="Enter Password"
                                    defaultValue={profile?.password}
                                />
                            </div>

                            {/* Second Row - Framework Select */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="status">Account Status</Label>
                                <Input
                                    id="status"
                                    placeholder="Status"
                                    defaultValue={profile?.emailVerified ? "active" : "not active"}
                                />
                            </div>
                        </div>
                    </form>
                </div>

                <div className=" flex items-center space-x-4 rounded-md border p-4">
                    <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">
                            Wallet Portfolio
                        </p>
                        <p className="text-sm text-muted-foreground">
                            {formatToUSD(walletBal)}
                        </p>
                    </div>
                    <DropdownMenu>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="outline" className="ml-auto">
                                    View All
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="w-screen max-w-full">
                                <AlertDialogTitle>Wallet Portfolio</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This is a user wallet portfolio
                                </AlertDialogDescription>
                                <form className="space-y-8" onSubmit={handleWalletUpdate}>
                                    {
                                        formData?.map((data, index) => (
                                            <div key={index} className="grid w-full items-center gap-1.5">
                                                <Label htmlFor={`address-${index}`}>
                                                    {data.crypto_name.toUpperCase()}
                                                </Label>

                                                <div className="flex items-center gap-2">
                                                    {/* "Use" Label Before the First Input */}
                                                    <Label htmlFor={`address-${index}`} className="text-sm font-medium">
                                                        USD
                                                    </Label>
                                                    <Input
                                                        id={`usd-${index}`}
                                                        placeholder="USD Balance"
                                                        type="text"
                                                        value={data.usd_balance}
                                                        disabled={isPending}
                                                        onChange={(e) => handleInputChange(index, "usd_balance", e.target.value)}
                                                    />
                                                    <Input
                                                        id={`address-${index}`}
                                                        placeholder="Crypto Equivalent"
                                                        type="text"
                                                        defaultValue={data.crypto_bal}
                                                        disabled={true}
                                                    />
                                                    {/* Crypto Symbol After the Second Input */}
                                                    <span className="text-sm font-medium">
                                                        {data.crypto_symbol.toUpperCase()}
                                                    </span>
                                                </div>
                                                <hr />
                                            </div>
                                        ))
                                    }

                                    <FormError message={error_msg}/>
                                    <FormSucces message={success}/>

                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <Button className="mx-5" disabled={isPending} type="submit">
                                        {isPending ? "updating balance": "Update Balance"}
                                    </Button>
                                </form>
                            </AlertDialogContent>
                        </AlertDialog>
                    </DropdownMenu>
                </div>

                <div className="flex items-center space-x-4 rounded-md border p-4">
                    <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">
                            Investment Portfolio
                        </p>
                        <p className="text-sm text-muted-foreground">
                            {formatToUSD(investmentSum)}
                        </p>
                    </div>
                    <DropdownMenu>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="outline" className="ml-auto">
                                    View All
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="w-screen max-w-full">
                                <AlertDialogTitle>
                                    Investment Portfolio
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    This is a user investment portfolio so far
                                </AlertDialogDescription>

                                <div className="w-full">
                                    <div className="flex items-center py-4">
                                        <Input
                                            placeholder="Search..."
                                            value={(table.getColumn("iname")?.getFilterValue() as string) ?? ""}
                                            onChange={(event) =>
                                                table.getColumn("iname")?.setFilterValue(event.target.value)
                                            }
                                            className="max-w-sm"
                                        />
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="outline" className="ml-auto">
                                                    Columns <ChevronDown />
                                                </Button>
                                            </DropdownMenuTrigger>
                                        </DropdownMenu>
                                    </div>
                                    <div className="rounded-md border">
                                        <Table>
                                            <TableHeader>
                                                {table.getHeaderGroups().map((headerGroup) => (
                                                    <TableRow key={headerGroup.id}>
                                                        {headerGroup.headers.map((header) => (
                                                            <TableHead key={header.id}>
                                                                {header.isPlaceholder
                                                                    ? null
                                                                    : flexRender(
                                                                        header.column.columnDef.header,
                                                                        header.getContext()
                                                                    )}
                                                            </TableHead>
                                                        ))}
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
                                                            {isLoading ? "Fetching data..." : "No results."}
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
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                            </AlertDialogContent>
                        </AlertDialog>
                    </DropdownMenu>
                </div>

                <div className=" flex items-center space-x-4 rounded-md border p-4">
                    <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">
                            Transactions
                        </p>
                        <p className="text-sm text-muted-foreground">
                            {formatToUSD(transactionSum)}
                        </p>
                    </div>
                    <DropdownMenu>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="outline" className="ml-auto">
                                    View All
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="w-screen max-w-full">
                                <AlertDialogTitle>
                                    Investment Portfolio
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    This is a user investment portfolio so far
                                </AlertDialogDescription>

                                <div className="w-full">
                                    <div className="flex items-center py-4">
                                        <Input
                                        placeholder="Search..."
                                        value={(transactionTable.getColumn("type")?.getFilterValue() as string) ?? ""}
                                        onChange={(event) =>
                                            transactionTable.getColumn("type")?.setFilterValue(event.target.value)
                                        }
                                        className="max-w-sm"
                                        />
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="outline" className="ml-auto">
                                                Columns <ChevronDown />
                                                </Button>
                                            </DropdownMenuTrigger>
                                        </DropdownMenu>
                                    </div>
                                    <div className="rounded-md border">
                                        <Table>
                                        <TableHeader>
                                            {transactionTable.getHeaderGroups().map((headerGroup) => (
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
                                            {transactionTable.getRowModel().rows?.length ? (
                                            transactionTable.getRowModel().rows.map((row) => (
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
                                        {transactionTable.getFilteredSelectedRowModel().rows.length} of{" "}
                                        {transactionTable.getFilteredRowModel().rows.length} row(s) selected.
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
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                            </AlertDialogContent>
                        </AlertDialog>
                    </DropdownMenu>
                </div>
            </CardContent>
        </Card>
    )

}
export default Page;
