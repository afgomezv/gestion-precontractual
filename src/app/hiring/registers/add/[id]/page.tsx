import UpdateEmployee from "@/components/registers/UpdateEmployee";

function PageUpdateEmployee({ params }: { params: { id: string } }) {
  return (
    <div className="h-[93%]">
      <UpdateEmployee params={params} />
    </div>
  );
}

export default PageUpdateEmployee;
