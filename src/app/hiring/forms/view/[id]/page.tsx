import AddDocuments from "@/components/forms/AddDocuments";

const ViewDocumentsPage = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <AddDocuments params={params} />
    </div>
  );
};

export default ViewDocumentsPage;
