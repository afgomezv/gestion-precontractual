import ViewDocuments from "@/components/registers/ViewDocuments";

function ViewPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <ViewDocuments params={params} />
    </div>
  );
}

export default ViewPage;
