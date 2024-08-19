"use client";
 
import FormError from "@/components/form-error";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { privateRequest } from "@/config";
import axios from "axios";
import Image from "next/image"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";


interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    cardInfo: {
        name: string;
        price: string;
        volume: string;
        change: string;
        url: string;
    };
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, cardInfo }) => {
    const router = useRouter()
    const [loading, setLoading] = useState(false);
    const [amount, setAmount] = useState("");
    const [period, setHoldPeriod] = useState("");
    const [error, setError] = useState("");

    const buyStockOption = () => {
        setLoading(true);
        if (!amount || !period) {
            setError('Invalid form data enter amount and select a hold period')
            toast.error("Invalid form data enter amount and select a hold period");
            setLoading(false);
            return;
        }

        if (amount &&  parseFloat(amount) < 100) {
            setLoading(false);
            setError(`Minimum amount is 100 usd`);
            toast.error(`Minimum amount is 100 usd`);
            return;
        }

        const data = {
            name: cardInfo.name,
            sector: "stocks",
            amount: parseFloat(amount),
            roi: parseFloat(cardInfo.change),
            close_date: period
        };

        privateRequest
            .post("/wallet-portfolio", data)
            .then((response: any) => {
                if (response["status"] === 201) {
                toast(
                    `You have successfully purchased ${cardInfo.name }`, {
                    description:`
                    Started:Today (${new Date()}
                    Holding Period: ${new Date(new Date().getTime() + parseFloat(period) * 24 * 60 * 60 * 1000)})
                    `,
                    action: {
                    label: "View Portfolio",
                    onClick: () => router.push('/portfolio'),
                    },
                })
                router.push('/portfolio')
                }
            })
            .catch((error: any) => {
                // Check if the error is an AxiosError
                if (axios.isAxiosError(error)) {
                // Check if the status code is 403
                if (error.response && error.response.status === 403) {
                } else {
                    toast("Error: try again"); // Handle 403 error here
                }
                } else {
                toast("Error:unknown error occured please try again later");
                }
            })
            .finally(() => {
                setLoading(false);
            });
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg w-full">
                <Card>
                    <CardHeader>
                        <CardTitle>
                        <div className="flex items-center mb-4">
                            <Image 
                                src={cardInfo.url}
                                alt="icon"
                                className="w-16 h-16 mr-4"
                                height={100}
                                width={100}
                            />
                            <h2 className="text-xl font-bold">{cardInfo.name}</h2>
                        </div>
                        </CardTitle>
                        <CardDescription>Deploy your new project in one-click.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Input id="name" defaultValue={cardInfo.name} />
                                </div>

                                <div className="flex flex-col space-y-1.5">
                                    <Input 
                                        id="roi"
                                        defaultValue={parseFloat(cardInfo.change).toFixed(2)+"%"}
                                    />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="amount">
                                        Amount
                                    </Label>
                                    <Input 
                                        id="amount"
                                        placeholder="100"
                                        type="number"
                                        onChange={(e) => setAmount(e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="period">Hodl Period</Label>
                                    <Select 
                                        onValueChange={(value) => setHoldPeriod(value)}
                                    >
                                        <SelectTrigger id="period">
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent position="popper">
                                            <SelectItem value="90">3 Months</SelectItem>
                                            <SelectItem value="180">6 Months</SelectItem>
                                            <SelectItem value="360">1 Year</SelectItem>
                                            <SelectItem value="720">2 years</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormError message={error} />
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button onClick={onClose}  variant="outline">Cancel</Button>
                        <Button onClick={buyStockOption}>
                            {
                                !loading ? "Buy Stock" : "processing"
                            }
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default Modal;
