'use server';

import { assignmentTripsAPI } from "@/components/api/assignmentTripsApi";

const AssignmentTripsPage = async () => {
  const response = await assignmentTripsAPI();
  const trips = response?.data || [];

  return (
    <div>
      {trips.map((trip: any) => (
        <div key={trip.id}>{trip.name}</div>
      ))}
    </div>
  );
};

export default AssignmentTripsPage;
