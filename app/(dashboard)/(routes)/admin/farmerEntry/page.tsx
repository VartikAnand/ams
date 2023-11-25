import { FarmerTable } from "./_components/farmerTable";
import { db } from "@/lib/db";

const FarmerEntry = async () => {
  const farmer = await db.farmer.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      farmerDetails: true,
      farmerNotes: {
        orderBy: {
          createdAt: "desc",
        },
      },
      farmerPayments: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
  return (
    <div>
      <FarmerTable farmerId={farmer.id} initialData={farmer} />
    </div>
  );
};

export default FarmerEntry;
