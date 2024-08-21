import { getDocuments } from "@/actions/room.actions";
import AddDocumentBtn from "@/components/AddDocumentBtn";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const ClerkUser = await currentUser();

  if (!ClerkUser) redirect("/signin");

  const { emailAddresses, id } = ClerkUser;
  const userEmail = emailAddresses[0].emailAddress as string;

  const rooms = await getDocuments(userEmail);

  return (
    <div className="home-container">
      {rooms.data.length > 0 ? (
        <div className="document-list-container">
          <div className="document-list-title">
            <h3 className="text-28-semibold">All documents</h3>
            <AddDocumentBtn userId={id} email={userEmail} />
          </div>
          <ul className="document-ul">
            {rooms.data.map(({ id, metadata }: any) => (
              <li key={id} className="document-list-item">
                <Link
                  href={`/documents/${id}`}
                  className="flex flex-1 items-center gap-4"
                >
                  <div className="hidden rounded-md bg-dark-500 p-2 sm:block">
                    <Image
                      src="/assets/icons/doc.svg"
                      alt="file"
                      width={40}
                      height={40}
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="line-clamp-1 text-lg">{metadata.title}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="document-list-empty">
          <Image
            src="/assets/icons/doc.svg"
            alt="Document"
            width={40}
            height={40}
            className="mx-auto"
          />
          <AddDocumentBtn userId={id} email={userEmail} />
        </div>
      )}
    </div>
  );
}
