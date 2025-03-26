import { ArrowRight, Cloud, Share2, Smartphone } from "lucide-react";
import { Button } from "~/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { MUTATIONS, QUERIES } from "~/server/db/queries";

const getStartedAction = async () => {
  "use server";
  const session = await auth();
  if (!session.userId) redirect("/sign-in");
  const rootFolder = await QUERIES.getRootFolder(session.userId);
  if (!rootFolder) {
    const rootFolderId = await MUTATIONS.createRootFolder(session.userId);
    redirect(`/f/${rootFolderId}`);
  }
  redirect(`/f/${String(rootFolder?.id)}`);
};
export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <header className="container mx-auto py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cloud className="h-8 w-8 text-white" />
            <span className="text-xl font-bold text-white">CrashDrive</span>
          </div>
        </nav>
      </header>

      <main>
        <section className="container mx-auto px-4 py-20 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold leading-tight text-white md:text-6xl">
              Store, share, and collaborate on files and folders from any device
            </h1>
            <p className="mb-10 text-xl text-slate-300">
              Securely access your content anywhere with CrashDrive. Your files
              are always backed up and easy to share.
            </p>
            <form action={getStartedAction}>
              <Button className="rounded-full bg-white px-8 py-6 text-lg text-purple-900 transition-colors hover:bg-slate-100">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </div>
        </section>

        <section className="container mx-auto py-20">
          <div className="grid gap-10 px-4 md:grid-cols-3">
            <div className="rounded-xl bg-white/10 p-8 backdrop-blur-sm">
              <div className="mb-6 w-fit rounded-full bg-purple-500/20 p-3">
                <Cloud className="h-8 w-8 text-purple-300" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-white">
                Cloud Storage
              </h3>
              <p className="text-slate-300">
                Store all your files securely in the cloud and access them from
                anywhere, anytime.
              </p>
            </div>
            <div className="rounded-xl bg-white/10 p-8 backdrop-blur-sm">
              <div className="mb-6 w-fit rounded-full bg-purple-500/20 p-3">
                <Share2 className="h-8 w-8 text-purple-300" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-white">
                Easy Sharing
              </h3>
              <p className="text-slate-300">
                Share files and folders with anyone, even if they don&apos;t
                have a CrashDrive account.
              </p>
            </div>
            <div className="rounded-xl bg-white/10 p-8 backdrop-blur-sm">
              <div className="mb-6 w-fit rounded-full bg-purple-500/20 p-3">
                <Smartphone className="h-8 w-8 text-purple-300" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-white">
                Mobile Access
              </h3>
              <p className="text-slate-300">
                Access your files on the go with our mobile apps for iOS and
                Android devices.
              </p>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-20">
          <div className="flex flex-col items-center justify-center gap-10 md:flex-row">
            <div className="">
              <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
                Your files, organized and secure
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="mt-1 rounded-full bg-green-500/20 p-1">
                    <svg
                      className="h-4 w-4 text-green-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="text-slate-300">
                    Automatic backup of your important files
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 rounded-full bg-green-500/20 p-1">
                    <svg
                      className="h-4 w-4 text-green-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="text-slate-300">
                    Advanced search to find what you need quickly
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 rounded-full bg-green-500/20 p-1">
                    <svg
                      className="h-4 w-4 text-green-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="text-slate-300">
                    End-to-end encryption for maximum security
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-20">
          <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-white/5 p-10 text-center backdrop-blur-sm">
            <h2 className="mb-6 text-3xl font-bold text-white">
              Ready to get started?
            </h2>
            <p className="mb-8 text-xl text-slate-300">
              Join others who trust CrashDrive with their important files.
            </p>
            <form action={getStartedAction}>
              <Button className="rounded-full bg-white px-8 py-6 text-lg text-purple-900 transition-colors hover:bg-slate-100">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>
            <p className="mt-4 text-sm text-slate-400">
              No credit card required
            </p>
          </div>
        </section>
      </main>

      <footer className="container mx-auto border-t border-white/10 px-4 py-10">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="mb-4 flex items-center gap-2 md:mb-0">
            <Cloud className="h-6 w-6 text-white" />
            <span className="text-lg font-bold text-white">CrashDrive</span>
          </div>
        </div>
        <div className="mt-6 text-center text-sm text-slate-500 md:text-left">
          © {new Date().getFullYear()} CrashDrive. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
