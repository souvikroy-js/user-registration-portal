"use client";

import { format } from "date-fns";
import { Prisma } from "../../../generated/prisma/client";
import { Button } from "../shadcnui/button";
import { Card, CardContent } from "../shadcnui/card";
import { finalSubmit } from "@/server/finalSubmit";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type FinalSubmitFormProps = {
  user: Prisma.UserGetPayload<{
    include: { personalDetail: true; files: true };
  }>;
};

const FinalSubmitForm = ({ user }: FinalSubmitFormProps) => {
  const { push } = useRouter();

  const { refNumber, personalDetail, files, email, createdAt } = user;

  const downloadPDF = () => {
    window.print();
  };

  const refNumbers = `WB-2026-${refNumber}`;

  const finalSubmitHandler = async () => {
    const { isSuccess, message } = await finalSubmit();

    if (isSuccess) {
      toast.success(message);
      // push(`/submission-success?ref=${res.refNumber}`);
      push(`/registration/submission-success?ref=${refNumbers}`);
    } else {
      toast.error(message);
    }
  };

  return (
    <div className="mx-auto max-w-5xl bg-white shadow-md">
      {/* HEADER */}
      <div className="flex items-start justify-between p-6 text-white">
        <div>
          <h1 className="text-2xl font-semibold">Job Application Form</h1>

          <p className="text-sm text-slate-300">
            State Employment Portal · Government of West Bengal
          </p>

          <p className="mt-2 text-xs text-slate-400">{refNumbers}</p>
        </div>

        {/* Passport Photo */}
        <div className="flex h-32 w-28 items-center justify-center overflow-hidden border border-white">
          {user.files.length > 0 ?
            <img
              src={files[0].photoUrl}
              alt="Passport Photo"
              className="h-full w-full object-cover"
            />
          : <span className="text-center text-xs">
              PASSPORT <br /> PHOTO
            </span>
          }
        </div>
      </div>

      {/* STEP BAR */}
      <div className="flex justify-between border-b bg-gray-50 px-8 py-4 text-sm">
        <span className="font-medium text-green-600">Account</span>
        <span className="font-medium text-green-600">Personal</span>
        <span className="font-medium text-green-600">Documents</span>
        <span className="font-semibold text-black">Review</span>
      </div>

      <div className="space-y-8 p-8">
        {/* ACCOUNT INFORMATION */}
        <Card>
          <CardContent className="p-6">
            <h2 className="mb-4 font-semibold text-gray-700">
              ACCOUNT INFORMATION
            </h2>

            <div className="grid grid-cols-4 gap-6 text-sm">
              <div>
                <p className="text-gray-500">Full Name</p>
                <p>{personalDetail?.fullName}</p>
              </div>

              <div>
                <p className="text-gray-500">Email Address</p>
                <p>{email}</p>
              </div>

              <div>
                <p className="text-gray-500">Email Verified</p>
                <span className="text-green-600">Verified</span>
              </div>

              <div>
                <p className="text-gray-500">Account Created</p>
                <p>{format(new Date(createdAt), "dd MMM yyyy, hh:mm a")}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* PERSONAL DETAILS */}
        <Card>
          <CardContent className="p-6">
            <h2 className="mb-4 font-semibold text-gray-700">
              PERSONAL DETAILS
            </h2>

            <div className="grid grid-cols-3 gap-6 text-sm">
              <div>
                <p className="text-gray-500">Full Name</p>
                <p>{personalDetail?.fullName}</p>
              </div>

              <div>
                <p className="text-gray-500">Email</p>
                <p>{personalDetail?.email}</p>
              </div>

              <div>
                <p className="text-gray-500">Phone Number</p>
                <p>{personalDetail?.phoneNumber}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ADDRESS DETAILS */}
        <Card>
          <CardContent className="p-6">
            <h2 className="mb-4 font-semibold text-gray-700">
              ADDRESS DETAILS
            </h2>

            <div className="grid grid-cols-4 gap-6 text-sm">
              <div>
                <p className="text-gray-500">State</p>
                <p>{personalDetail?.state}</p>
              </div>

              <div>
                <p className="text-gray-500">District</p>
                <p>{personalDetail?.district}</p>
              </div>

              <div>
                <p className="text-gray-500">City</p>
                <p>{personalDetail?.city}</p>
              </div>

              <div>
                <p className="text-gray-500">Pincode</p>
                <p>{personalDetail?.pincode}</p>
              </div>
            </div>

            <div className="mt-4 text-sm">
              <p className="text-gray-500">Place / Locality</p>
              <p>{personalDetail?.place}</p>
            </div>
          </CardContent>
        </Card>

        {/* DECLARATION */}
        <div className="border-t pt-4 text-xs text-gray-600">
          <p>
            I, Souvik Roy, hereby declare that the information furnished in this
            application is true, complete and correct to the best of my
            knowledge and belief.
          </p>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex justify-end gap-4 pt-4">
          <Button
            variant="outline"
            onClick={downloadPDF}>
            Download PDF
          </Button>

          <Button onClick={finalSubmitHandler}>Final Submit</Button>
        </div>
      </div>
    </div>
  );
};

export default FinalSubmitForm;
