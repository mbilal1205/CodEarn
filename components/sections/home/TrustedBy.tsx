"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Code2 } from "lucide-react";

const TECH_STACK = [
  { id: 1, name: "Next.js", type: "Framework" },
  { id: 2, name: "React", type: "Library" },
  { id: 3, name: "TypeScript", type: "Language" },
  { id: 4, name: "Node.js", type: "Runtime" },
  { id: 5, name: "Tailwind CSS", type: "Styling" },
  { id: 6, name: "MongoDB", type: "Database" },
  { id: 7, name: "PostgreSQL", type: "Database" },
  { id: 8, name: "Prisma", type: "ORM" },
  { id: 9, name: "OpenAI API", type: "AI" },
  { id: 10, name: "Stripe", type: "Payments" },
  { id: 11, name: "Git", type: "Version Control" },
  { id: 12, name: "Docker", type: "DevOps" },
];

const INFINITE_STACK = [...TECH_STACK, ...TECH_STACK];

export const TrustedBy = memo(() => {
  const t = useTranslations("Home.stack");
  return (
    <section className="relative w-full py-16 bg-background overflow-hidden border-b border-primary/[0.06]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[20vh] bg-primary/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center justify-center text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/[0.02] border border-primary/10 mb-3"
          >
            <Code2 className="w-3.5 h-3.5 text-primary/70" />
            <span className="text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
              {t("badge")}
            </span>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-xs sm:text-sm font-medium tracking-wide text-muted-foreground/80 max-w-md"
          >
            {t("subtitle")}
          </motion.p>
        </div>

        <div className="relative w-full max-w-5xl mx-auto">
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />

          <div className="w-full overflow-hidden flex whitespace-nowrap py-4">
            <motion.div
              className="flex gap-8 sm:gap-12 pe-8 sm:pe-12 shrink-0 items-center"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ ease: "linear", duration: 30, repeat: Infinity }}
              whileHover={{ animationPlayState: "paused" }}
            >
              {INFINITE_STACK.map((tech, index) => (
                <div
                  key={`${tech.id}-${index}`}
                  className="group relative flex items-center justify-center h-14 w-36 sm:w-44 px-4 rounded-xl border border-primary/[0.03] bg-primary/[0.01] dark:bg-neutral-900/20 backdrop-blur-sm transition-all duration-300 hover:border-primary/20 hover:bg-background"
                >
                  <span className="absolute top-1 end-2 text-[8px] font-mono tracking-tighter opacity-0 group-hover:opacity-40 transition-opacity text-primary">
                    {tech.type}
                  </span>
                  <div className="text-sm font-semibold tracking-tight text-muted-foreground/40 group-hover:text-primary/80 transition-all duration-300">
                    {tech.name}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
});

TrustedBy.displayName = "TrustedBy";