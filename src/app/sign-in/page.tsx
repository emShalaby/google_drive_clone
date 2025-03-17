import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export default async function SignInPage() {
  const session = await auth();
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="w-full max-w-md">
        <Card className="border-white/20 bg-white/10 backdrop-blur-sm">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold text-white">
              Sign in
            </CardTitle>
            <CardDescription className="text-slate-300">
              Enter your account to continue
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center pt-4">
            {session.userId ? (
              <Link
                href={"/drive"}
                className={`flex w-full transform cursor-pointer items-center justify-center bg-white p-1 text-purple-900 transition-all duration-200 hover:scale-[1.02] hover:bg-slate-100`}
              >
                <p>Already signed in back to application</p>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            ) : (
              <div
                className={`flex w-full transform cursor-pointer items-center justify-center bg-white p-1 text-purple-900 transition-all duration-200 hover:scale-[1.02] hover:bg-slate-100`}
              >
                <>
                  <SignInButton></SignInButton>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 text-center text-sm text-slate-400"></CardFooter>
        </Card>

        <div className="mt-8 text-center text-sm text-slate-500">
          <Link
            href="/"
            className="text-slate-400 transition-colors hover:text-white"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
