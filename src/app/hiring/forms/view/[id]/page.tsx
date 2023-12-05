import AddDocuments from "@/components/forms/AddDocuments";

const ViewDocumentsPage = ({ params }: { params: { id: string } }) => {
  return (
    <div className="h-full">
      <AddDocuments params={params} />
    </div>
  );
};

export default ViewDocumentsPage;
