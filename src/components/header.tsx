import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

const Header = () => {
  return (
    <header className="sticky top-0 z-10 border-b border-gray-700 bg-gray-900">
      <div className="mx-auto max-w-[2000px]">
        <div className="flex h-16 items-center px-4 md:px-6">
          <h1 className="text-xl font-semibold text-white">Crash Drive</h1>

          <div className="ml-auto flex items-center gap-3">
            <SignedOut>
              <SignInButton>
                <button className="rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-700">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: "border-2 border-gray-700",
                  },
                }}
              />
            </SignedIn>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
