"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { ReactNode } from "react";

interface GlassModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: ReactNode;
}

export function GlassModal({ open, onOpenChange, title, children }: GlassModalProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <DialogPrimitive.Portal forceMount>
            <DialogPrimitive.Overlay asChild forceMount>
              <motion.div
                className="fixed inset-0 z-50 backdrop-blur-sm"
                style={{ backgroundColor: "rgba(11,12,10,0.55)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            </DialogPrimitive.Overlay>
            <DialogPrimitive.Content asChild forceMount aria-describedby={undefined}>
              <motion.div
                className="fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-[92vw] max-w-md -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl p-6 backdrop-blur-xl backdrop-saturate-[1.4]"
                style={{
                  backgroundColor: "rgba(19,21,18,0.72)",
                  border: "1px solid rgba(242,245,238,0.10)",
                  boxShadow:
                    "inset 0 1px 0 0 rgba(205,232,51,0.14), 0 24px 60px -20px rgba(0,0,0,0.8)",
                }}
                initial={{ opacity: 0, scale: 0.92, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 12 }}
                transition={{ type: "spring", stiffness: 320, damping: 28 }}
              >
                <div className="mb-4 flex items-center justify-between">
                  <DialogPrimitive.Title className="font-heading text-xl font-semibold text-foreground">
                    {title}
                  </DialogPrimitive.Title>
                  <DialogPrimitive.Close className="flex h-11 w-11 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                    <X className="h-4 w-4" />
                  </DialogPrimitive.Close>
                </div>
                {children}
              </motion.div>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        )}
      </AnimatePresence>
    </DialogPrimitive.Root>
  );
}
