import type { ReactNode } from "react";
import { motion } from "framer-motion";

const easeOutExpo = [0.22, 1, 0.36, 1] as const;

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export const Reveal = ({ children, delay = 0, className }: RevealProps) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 28 }}
    transition={{ duration: 0.55, delay, ease: easeOutExpo }}
    viewport={{ once: true, margin: "-80px" }}
    whileInView={{ opacity: 1, y: 0 }}
  >
    {children}
  </motion.div>
);
