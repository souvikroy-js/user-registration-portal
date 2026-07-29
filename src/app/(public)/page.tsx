import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next.js Starter Fullstack",
  description: "Production grade Fullstack Next.js starter template",
};

const page = () => {
  return (
    <section className="grid min-h-dvh place-items-center px-6 transition-colors duration-300 dark:bg-gray-950">
      <div className="space-y-6 text-center">
        {/* Welcome */}
        <h1 className="bg-linear-to-r from-blue-600 via-violet-600 to-pink-600 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent md:text-7xl">
          Welcome to
        </h1>

        {/* Portal Name */}
        <h2 className="text-4xl font-bold tracking-tight text-gray-900 transition-colors duration-300 md:text-6xl dark:text-white">
          User Registration Portal
        </h2>

        {/* Subtitle */}
        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600 transition-colors duration-300 dark:text-gray-400">
          Create your account securely and access all services through one
          modern, fast, and reliable registration platform.
        </p>

        {/* Decorative Line */}
        <div className="mx-auto h-1 w-28 rounded-full bg-linear-to-r from-blue-500 via-violet-500 to-pink-500"></div>
      </div>
    </section>
  );
};

export default page;
