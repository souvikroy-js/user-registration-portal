import DocumentsUploadForm from "@/components/Forms/DocumentsUploadForm";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcnui/card";

const page = () => {
  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle>Documents Upload</CardTitle>
        </CardHeader>

        <CardContent>
          <DocumentsUploadForm />
        </CardContent>

        <CardFooter></CardFooter>
      </Card>
    </section>
  );
};

export default page;
