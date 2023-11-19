import AddEmployee from "@/components/registers/AddEmployee";

function AddEmployeePage({ params }: { params: { id: string } }) {
  return (
    <div className="h-[93%]">
      <AddEmployee params={params} />
    </div>
  );
}

export default AddEmployeePage;
