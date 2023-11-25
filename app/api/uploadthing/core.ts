import { auth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const handelAuth = () => {
  const { userId } = auth();

  if (!userId) throw new Error("Unauthorized user");
  return { userId };
};

export const ourFileRouter = {
  otherImage: f({ image: { maxFileSize: "10MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  farmerAttachment: f(["text", "image", "pdf"])
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
