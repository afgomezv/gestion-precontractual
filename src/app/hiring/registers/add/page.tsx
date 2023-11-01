import AddEmployee from "@/components/registers/AddEmployee";

function AddEmployeePage({ params }: { params: { id: string } }) {
  return (
    <div>
      <AddEmployee params={params} />
    </div>
  );
}

export default AddEmployeePage;
