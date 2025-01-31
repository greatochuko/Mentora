import { Link, useNavigate } from "react-router-dom";
import authImage from "../assets/authImage.jpg";
import { useState } from "react";
import LoadingIndicator from "../components/LoadingIndicator";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useFetch from "../hooks/useFetch";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const { error, loading, fetchData } = useFetch({
    url: "/auth/login",
    body: { email, password },
    onSuccess() {
      navigate("/", { replace: true });
    },
  });

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    await fetchData();
  }
  return (
    <main className="flex min-h-dvh">
      <div className="flex flex-1">
        <div className="mx-auto flex w-full max-w-lg flex-1 flex-col items-center justify-center gap-8 p-8">
          <div className="flex flex-col items-center justify-center gap-2">
            <h2 className="font-medium text-blue-600">Fobework LMS</h2>
            <h1 className="text-2xl font-medium sm:text-[1.75rem]">
              Welcome Back! 👋
            </h1>
            <p className="text-center text-zinc-500">
              Welcome back! Continue your learning journey with ease.
            </p>
          </div>
          <form onSubmit={handleLogin} className="flex w-full flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="w-full rounded-md border border-zinc-300 p-2 ring-zinc-300 ring-offset-1 outline-none focus-visible:ring-2"
                placeholder="hello@example.com"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative flex flex-col gap-2">
              <label htmlFor="password">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full rounded-md border border-zinc-300 p-2 ring-zinc-300 ring-offset-1 outline-none focus-visible:ring-2"
                placeholder="Enter your Password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-3 bottom-3 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="flex h-10 cursor-pointer items-center justify-center rounded-md bg-blue-600 px-4 py-2 font-medium text-white duration-200 hover:bg-blue-600/90 disabled:cursor-not-allowed disabled:bg-blue-600/60"
            >
              {loading ? <LoadingIndicator /> : "Login"}
            </button>
          </form>
          <p className="text-zinc-500">
            Don&apos;t have an account?{" "}
            <Link to={"/register"} className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
      <div className="relative hidden flex-1 md:block">
        <img
          src={authImage}
          alt=""
          className="absolute top-0 left-0 h-full w-full object-cover"
        />
      </div>
    </main>
  );
}
