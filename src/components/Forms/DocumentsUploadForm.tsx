"use client";

import {
  CheckCircle2Icon,
  Loader2Icon,
  TrashIcon,
  UploadCloudIcon,
  UserCircle2Icon,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useFilePicker } from "use-file-picker";
import { FileSizeValidator } from "use-file-picker/validators";
import { Button } from "../shadcnui/button";
import uploadPhoto from "@/server/uploadPhoto";
import { useRouter } from "next/navigation";
import { getPhoto } from "@/server/getPhoto";

const DocumentsUploadForm = () => {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [isPhotoFile, setIsPhotoFile] = useState(false);
  const [draftPhotoUrl, setDraftPhotoUrl] = useState<string | null>(null);

  useEffect(() => {
    const loadDraft = async () => {
      const data = await getPhoto();
      if (data?.photoUrl) setDraftPhotoUrl(data.photoUrl);
    };
    loadDraft();
  }, []);

  const {
    openFilePicker: openPhotoPicker,
    filesContent: photoContent,
    plainFiles: photoFiles,
    errors: photoErrors,
    clear: clearPhoto,
  } = useFilePicker({
    readAs: "DataURL",
    accept: "image/*",
    multiple: false,
    validators: [new FileSizeValidator({ maxFileSize: 5 * 1024 * 1024 })],
    onFilesSuccessfullySelected: () => setIsPhotoFile(true),
    onClear: () => setIsPhotoFile(false),
  });

  // ✅ new selection takes priority, falls back to draft, falls back to null
  const photoSrc = photoContent[0]?.content ?? draftPhotoUrl;

  const handleNext = async () => {
    // ✅ draft exists, no new file — just navigate
    if (!photoFiles[0] && draftPhotoUrl) {
      router.push("/registration/final-submit");
      return;
    }

    // ✅ no file and no draft — block
    if (!photoFiles[0]) {
      toast.error("Please upload a photo.");
      return;
    }

    setIsSaving(true);
    try {
      const { isSuccess, message } = await uploadPhoto(photoFiles[0]);
      if (isSuccess) {
        toast.success(message);
        clearPhoto();
        router.push("/registration/final-submit");
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const formatBytes = (bytes: number) =>
    bytes < 1024 * 1024 ?
      `${(bytes / 1024).toFixed(1)} KB`
    : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;

  return (
    <div className="space-y-6">
      <div className="border-b pb-5">
        <h1 className="text-xl font-semibold tracking-tight">Documents</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Manage your profile photo and skill certifications.
        </p>
      </div>

      <div className="bg-card rounded-2xl border shadow-sm">
        <div className="flex items-center gap-3 border-b px-6 py-4">
          <span className="bg-primary/10 text-primary flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold">
            01
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold">Profile Photo</p>
            <p className="text-muted-foreground text-xs">
              JPG · PNG · WEBP &nbsp;·&nbsp; Max 5 MB
            </p>
          </div>
          {/* ✅ show checkmark if new file selected OR draft exists */}
          {(isPhotoFile || draftPhotoUrl) && !photoErrors[0] && (
            <CheckCircle2Icon className="h-4 w-4 shrink-0 text-emerald-500" />
          )}
        </div>

        <div className="p-6">
          {photoErrors[0] && (
            <div className="bg-destructive/10 text-destructive mb-4 rounded-lg px-4 py-2.5 text-center text-xs font-medium">
              File exceeds 5 MB limit. Please choose a smaller image.
            </div>
          )}

          <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start">
            {/* ✅ avatar — shows new preview, draft, or icon */}
            <div className="relative shrink-0">
              <div className="ring-border h-20 w-20 overflow-hidden rounded-lg ring-4">
                {photoSrc ?
                  <Image
                    src={photoSrc}
                    alt="Profile photo"
                    width={80}
                    height={80}
                    className="h-full w-full object-cover"
                  />
                : <UserCircle2Icon className="text-muted-foreground h-full w-full p-2" />
                }
              </div>
            </div>

            {/* ✅ show file info if new file selected, else show upload zone */}
            {isPhotoFile ?
              <div className="bg-muted/50 flex w-full flex-col gap-3 rounded-xl px-4 py-3">
                <div>
                  <p className="truncate text-sm leading-tight font-medium">
                    {photoFiles[0]?.name}
                  </p>
                  <p className="text-muted-foreground mt-0.5 text-xs">
                    {photoFiles[0] && formatBytes(photoFiles[0].size)}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearPhoto}
                  className="w-fit cursor-pointer">
                  <TrashIcon className="mr-1.5 h-3.5 w-3.5" />
                  Discard
                </Button>
              </div>
            : <button
                type="button"
                onClick={openPhotoPicker}
                className="border-border hover:border-primary/60 hover:bg-muted/40 group flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-6 py-8 transition-all duration-200 focus:outline-none focus-visible:ring-2">
                <UploadCloudIcon className="text-muted-foreground group-hover:text-primary h-7 w-7 transition-colors" />
                <div className="text-center">
                  <p className="text-sm font-medium">
                    {draftPhotoUrl ? "Replace photo" : "Click to upload"}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    or drag and drop
                  </p>
                </div>
              </button>
            }
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <Button
          type="button"
          onClick={() => router.push("/registration/personal-details")}
          className="h-11 w-28 rounded-xl bg-violet-600 py-3 text-sm font-bold text-white transition-colors hover:bg-violet-700">
          ← Previous
        </Button>

        <Button
          type="button"
          onClick={handleNext}
          disabled={isSaving}
          className="h-11 w-28 rounded-xl bg-violet-600 py-3 text-sm font-bold text-white transition-colors hover:bg-violet-700">
          {isSaving ?
            <>
              <Loader2Icon className="mr-1.5 h-3.5 w-3.5 animate-spin" />
              Saving…
            </>
          : "Next →"}
        </Button>
      </div>
    </div>
  );
};

export default DocumentsUploadForm;
