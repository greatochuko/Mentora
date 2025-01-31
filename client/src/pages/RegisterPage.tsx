import { Link, useNavigate } from "react-router-dom";
import authImage from "../assets/authImage.jpg";
import { useState } from "react";
import LoadingIndicator from "../components/LoadingIndicator";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useFetch from "../hooks/useFetch";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const { error, loading, fetchData } = useFetch({
    url: "/auth/register",
    body: { firstName, lastName, email, password },
    onSuccess() {
      navigate("/", { replace: true });
    },
  });

  const passwordsDontMatch =
    !!password.trim() &&
    !!confirmPassword.trim() &&
    password !== confirmPassword;

  const cannotSubmit =
    !firstName.trim() ||
    !lastName.trim() ||
    !email.trim() ||
    !password.trim() ||
    !confirmPassword.trim() ||
    passwordsDontMatch;

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    if (cannotSubmit) return;
    await fetchData();
  }

  return (
    <main className="flex h-screen">
      <div className="flex h-full flex-1 overflow-y-auto">
        <div className="mx-auto flex w-full max-w-lg flex-1 flex-col items-center justify-center gap-8 p-8">
          <div className="flex flex-col items-center justify-center gap-2">
            <h2 className="font-medium text-blue-600">Fobework LMS</h2>
            <h1 className="text-2xl font-medium sm:text-[1.75rem]">
              Create your account! 🚀
            </h1>
            <p className="text-center text-zinc-500">
              Sign up now and take the first step toward something amazing.
            </p>
          </div>
          <form
            onSubmit={handleRegister}
            className="flex w-full flex-col gap-4"
          >
            <div className="flex gap-4">
              <div className="flex flex-1 flex-col gap-2">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  className="w-full flex-1 rounded-md border border-zinc-300 p-2 ring-zinc-300 ring-offset-1 outline-none focus-visible:ring-2"
                  placeholder="e.g. John"
                  id="firstName"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="flex flex-1 flex-col gap-2">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  className="w-full flex-1 rounded-md border border-zinc-300 p-2 ring-zinc-300 ring-offset-1 outline-none focus-visible:ring-2"
                  placeholder="e.g. Doe"
                  id="lastName"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
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
            <div className="flex flex-col gap-2">
              <label htmlFor="password">Password</label>
              <div className="relative">
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
                  className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer rounded-sm border border-transparent p-1 hover:border-zinc-300 hover:bg-zinc-100 focus-visible:border-zinc-300 focus-visible:bg-zinc-100"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {password && password.length < 8 && (
                <p className="text-sm text-red-400">
                  Password must be at least 8 characters long
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full rounded-md border border-zinc-300 p-2 ring-zinc-300 ring-offset-1 outline-none focus-visible:ring-2"
                  placeholder="Re-enter your Password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer rounded-sm border border-transparent p-1 hover:border-zinc-300 hover:bg-zinc-100 focus-visible:border-zinc-300 focus-visible:bg-zinc-100"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {passwordsDontMatch && (
                <p className="text-sm text-red-400">Passwords do not match</p>
              )}
            </div>
            {error && <p className="text-sm text-red-400">{error}</p>}
            <button
              type="submit"
              disabled={loading || cannotSubmit}
              className="flex h-10 cursor-pointer items-center justify-center rounded-md bg-blue-600 px-4 py-2 font-medium text-white ring-blue-500 ring-offset-2 duration-200 hover:bg-blue-600/90 focus-visible:ring-2 disabled:cursor-not-allowed disabled:bg-blue-600/60"
            >
              {loading ? <LoadingIndicator /> : "Register"}
            </button>
          </form>
          <p className="text-zinc-500">
            Already have an account?{" "}
            <Link to={"/login"} className="text-blue-600 hover:underline">
              Log In
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
