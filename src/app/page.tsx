"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-8">
      {/* Animated heading */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-4xl md:text-6xl font-bold tracking-tight text-center"
      >
        Framer Motion Playground
      </motion.h1>

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-muted-foreground text-center mt-4 max-w-xl"
      >
        Experiment with motion presets, tweak values, and see real-time animations.
        Built with Next.js, Framer Motion, and ShadCN UI — the same stack I use on my site.
      </motion.p>

      {/* Call-to-action */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="mt-8"
      >
        <Link href="/playground">
          <Button size="lg" className="text-lg px-6 py-3">
            Open Playground →
          </Button>
        </Link>
      </motion.div>

      {/* Footer animation */}
      <motion.div
        className="mt-16 text-sm text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        © {new Date().getFullYear()} FMPlay — Built with ❤️ using Framer Motion
      </motion.div>

      <footer className="w-full text-center text-sm text-muted-foreground mt-12">
  Built by{" "}
  <a
    href="https://edbelluti.com"
    target="_blank"
    rel="noopener noreferrer"
    className="underline hover:text-foreground transition-colors"
  >
    Eduardo Belluti
  </a>{" "}
  ·{" "}
  <a
    href="https://github.com/edbr/fmplay"
    target="_blank"
    rel="noopener noreferrer"
    className="underline hover:text-foreground transition-colors"
  >
    Source on GitHub
  </a>
</footer>

    </main>
  );
}
