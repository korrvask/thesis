"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signup } from "@/app/components/client/account/actions";

export default function SignUpModal({ onClose, isVisible, setIsVisible }: { onClose?: () => void, isVisible: boolean, setIsVisible: (visible: boolean) => void }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  
  // Set visible after mount for animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 10);
    return () => clearTimeout(timer);
  }, [isVisible, setIsVisible]);

  const handleClose = () => {
    setIsVisible(false);
    // Delay actual unmounting to allow for animation
    setTimeout(() => {
      if (onClose) onClose();
    }, 300);
  };

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);

    try {
      const result = await signup(formData);

      if (result.error) {
        setError(result.error);
      } else if (result.success) {
        router.push("/account");
        router.refresh();
        handleClose();
      }
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div
      className={`fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4 transition-opacity duration-300${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleClose}
    >
      <div
        className={`bg-[#212121] p-20 max-w-[500px] w-full relative shadow-xl transition-transform duration-300 ${
          isVisible ? "scale-100 translate-y-0" : "scale-95 translate-y-8"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-white transition-colors duration-200 cursor-pointer"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div
          className={`transition-opacity duration-300 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <h2 className="text-center text-xl mb-6 text-white">
            create an account
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded animate-fadeIn">
              {error}
            </div>
          )}

          <form onSubmit={handleSignup}>
            <div className="grid grid-cols-2 gap-4 mb-4 placeholder:text-black text-white">
              <input
                type="name"
                name="firstName"
                autoComplete="given-name"
                placeholder="first name"
                className="p-3 border border-gray-300 rounded-lg transition-all bg-white placeholder:text-black text-black"
                required
              />
              <input
                type="name"
                name="lastName"
                autoComplete="family-name"
                placeholder="last name"
                className="p-3 border border-gray-300 rounded-lg transition-all bg-white placeholder:text-black text-black"
                required
              />
            </div>

            <div className="mb-4 placeholder:text-black text-white">
              <input
                type="email"
                name="email"
                placeholder="email"
                className="w-full p-3 border border-gray-300 rounded mb-3 bg-white placeholder:text-black text-black focus:border-transparent transition-all"
                required
              />
              <input
                type="email"
                name="confirmEmail"
                placeholder="confirm email"
                className="w-full p-3 border border-gray-300 rounded mb-3 bg-white placeholder:text-black text-black focus:border-transparent transition-all"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="password"
                className="w-full p-3 border border-gray-300 rounded mb-3 bg-white placeholder:text-black focus:border-transparent transition-all text-black"
                required
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="confirm password"
                className="w-full p-3 border border-gray-300 rounded mb-3 bg-white placeholder:text-black focus:border-transparent transition-all text-black"
                required
              />
            </div>

            <div className="mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="acceptsMarketing"
                  className="mr-2"
                />
                <span className="text-sm text-white">
                  email me with news and offers.
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full text-xl py-2 border-b border-gray-300 font-medium mb-4 hover:underline transition-all duration-200 text-white cursor-pointer"
            >
              {isLoading ? "creating account..." : "create your account"}
            </button>
          </form>

          <p className="text-xs text-center mb-4 text-white">
            By signing up for an account you accept our{" "}
            <a href="/tos" className="underline text-white cursor-pointer">
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="/privacy"
              className="underline text-white cursor-pointer"
            >
              Privacy Policy
            </a>
            .
          </p>

          <div className="text-center text-white">
            <button
              onClick={handleClose}
              className="text-sm text-white hover:underline block mx-auto transition-colors duration-200 cursor-pointer"
            >
              track without an account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
