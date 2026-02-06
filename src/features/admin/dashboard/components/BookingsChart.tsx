import { ResponsiveBar } from "@nivo/bar";

const data = [
    { day: "Mon", bookings: 12 },
    { day: "Tue", bookings: 18 },
    { day: "Wed", bookings: 15 },
    { day: "Thu", bookings: 22 },
    { day: "Fri", bookings: 28 },
    { day: "Sat", bookings: 35 },
    { day: "Sun", bookings: 24 },
];

export const BookingsChart = () => {
    return (
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm h-[350px]">
            <h3 className="text-lg font-bold text-slate-900 mb-4 font-heading">Weekly Bookings</h3>
            <div className="h-[280px]">
                <ResponsiveBar
                    data={data}
                    keys={["bookings"]}
                    indexBy="day"
                    margin={{ top: 10, right: 10, bottom: 30, left: 30 }}
                    padding={0.5}
                    valueScale={{ type: "linear" }}
                    indexScale={{ type: "band", round: true }}
                    colors="#1E293B"
                    borderRadius={4}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        tickSize: 0,
                        tickPadding: 16,
                    }}
                    axisLeft={{
                        tickSize: 0,
                        tickPadding: 16,
                    }}
                    enableLabel={false}
                    role="application"
                    ariaLabel="Weekly bookings bar chart"
                />
            </div>
        </div>
    );
};
