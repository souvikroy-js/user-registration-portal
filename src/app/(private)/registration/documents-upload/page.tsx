import DocumentsUploadForm from "@/components/Forms/DocumentsUploadForm";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcnui/card";

const page = () => {
  return (
    <section className="py-4">
      <Card>
        <CardHeader>
          <CardTitle>Documents Upload</CardTitle>
        </CardHeader>

        <CardContent>
          <DocumentsUploadForm />
        </CardContent>
      </Card>
    </section>
  );
};

export default page;
