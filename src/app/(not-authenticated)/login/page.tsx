import { GoogleLoginButton } from "@/components/auth/google-login";

function LoginPage() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="bg-gray-900 flex flex-col text-white p-6 rounded-md min-w-64 gap-4 border">
        <h1 className="font-medium italic text-xl text-center">ToDo App</h1>
        <div className="flex flex-col gap-2 justify-center items-center">
          <GoogleLoginButton />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
