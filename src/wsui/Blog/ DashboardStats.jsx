import { Card, CardBody } from "@nextui-org/react";

const stats = [
    {
        total: "58,339",
        title: "Total Products",
        values: [
            { count: "57,134", label: "Active Product", color: "text-green-500" },
            { count: "1,134", label: "In Draft", color: "text-red-500" },
        ],
    },
    {
        total: "4,927",
        title: "Total Category",
        values: [
            { count: "4,368", label: "Active", color: "text-green-500" },
            { count: "559", label: "In Draft", color: "text-red-500" },
        ],
    },
    {
        total: "110",
        title: "Total Stores",
        values: [
            { count: "108", label: "Active", color: "text-green-500" },
            { count: "5", label: "Opening Soon", color: "text-orange-500" },
            { count: "5", label: "Close", color: "text-red-500" },
        ],
    },
    {
        total: "350",
        title: "Total Vendor",
        values: [
            { count: "100", label: "Active", color: "text-green-500" },
            { count: "250", label: "In Draft", color: "text-red-500" },
        ],
    },
];

export default function DashboardStats() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-6">
            {stats.map((stat, index) => (
                <Card key={index} className="shadow-md p-4">
                    <CardBody className="text-center">
                        <h2 className="text-3xl font-bold">{stat.total}</h2>
                        <p className="text-gray-500">{stat.title}</p>
                        <div className="flex justify-between mt-4 text-sm font-semibold">
                            {stat.values.map((val, idx) => (
                                <div key={idx} className="flex flex-col items-center">
                                    <span className="text-black">{val.count}</span>
                                    <span className={`${val.color}`}>{val.label}</span>
                                </div>
                            ))}
                        </div>
                    </CardBody>
                </Card>
            ))}
        </div>
    );
}
