import LoadDocuments from "@/components/registers/LoadDocuments";

function DocumentsPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <LoadDocuments params={params} />
    </div>
  );
}

export default DocumentsPage;
