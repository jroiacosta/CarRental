import { ResponsiveLine } from "@nivo/line";

const data = [
    {
        id: "Revenue",
        data: [
            { x: "Mon", y: 1200 },
            { x: "Tue", y: 1900 },
            { x: "Wed", y: 1500 },
            { x: "Thu", y: 2400 },
            { x: "Fri", y: 3200 },
            { x: "Sat", y: 3800 },
            { x: "Sun", y: 2900 },
        ],
    },
];

export const RevenueChart = () => {
    return (
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm h-[350px]">
            <h3 className="text-lg font-bold text-slate-900 mb-4 font-heading">Revenue Trend</h3>
            <div className="h-[280px]">
                <ResponsiveLine
                    data={data}
                    margin={{ top: 10, right: 10, bottom: 30, left: 40 }}
                    xScale={{ type: "point" }}
                    yScale={{ type: "linear", min: "auto", max: "auto", stacked: true, reverse: false }}
                    curve="natural"
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        tickSize: 0,
                        tickPadding: 16,
                    }}
                    axisLeft={{
                        tickSize: 0,
                        tickPadding: 16,
                        format: (value) => `$${value}`,
                    }}
                    enableGridX={false}
                    colors={["#DC2626"]}
                    pointSize={0}
                    enableArea={true}
                    areaOpacity={0.1}
                    useMesh={true}
                    enableCrosshair={false}
                />
            </div>
        </div>
    );
};
