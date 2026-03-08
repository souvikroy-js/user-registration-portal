import PersonalDetailsForm from "@/components/Forms/PersonalDetailsForm";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcnui/card";

const page = () => {
  return (
    <section>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Personal Details</CardTitle>
        </CardHeader>

        <CardContent>
          <PersonalDetailsForm />
        </CardContent>
      </Card>
    </section>
  );
};

export default page;
