"use client"

import Image from "next/image";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { useState } from "react";
import Modal from "@/app/(protected)/_components/modal";

interface StakeCardProps {
    name:       string;
    price:      string;
    volume:     string;
    btnLabel:   string;
    change:     string;
    url:     string;
}
const StockCard = ({
    name,
    price,
    volume,
    btnLabel,
    change,
    url,
}: StakeCardProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <>
        <Card className="text-white mx-auto shadow-md"
            style={{
                background: "linear-gradient(145deg, #a43862, #4a031f)"
            }}>
            <CardHeader className="flex justify-between p-4">
                {/* Aligning image and text to the left */}
                <div className="flex items-center">
                    <Image 
                        src={url}
                        alt="icon"
                        className="w-6 h-6 mx-2"
                        width={100}
                        height={100}
                    />
                    <h6 className="text-lg font-semibold">{name}</h6>
                </div>
                {/* Aligning button to the right */}
                <Button
                    onClick={openModal}
                    className="ml-auto bg-[#033b19] hover:bg-[#0c3426] text-white"
                >
                    {btnLabel}
                </Button>
            </CardHeader>
            <CardContent className="flex justify-between p-4">
                <div className="flex flex-col items-start">
                    <label className="text-[0.75rem] opacity-60 font-bold">Price</label>
                    <p className="text-sm font-semibold">{price}</p>
                </div>
                <div className="flex flex-col items-start">
                    <label className="text-[0.75rem] opacity-60 font-bold">24H Change</label>
                    <p className="text-sm text-green-500 font-semibold">{change}</p>
                </div>
                <div className="flex flex-col items-start">
                    <label className="text-[0.75rem] opacity-60 font-bold">24H Volume</label>
                    <p className="text-sm font-semibold">{volume}</p>
                </div>
            </CardContent>
        </Card>

        <Modal 
            isOpen={isModalOpen} 
            onClose={closeModal}
            cardInfo={{ name, price, volume, change, url }}
        /></>
    );
};
export default StockCard;
