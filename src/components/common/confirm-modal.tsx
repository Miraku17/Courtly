"use client";

import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ConfirmModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "default" | "danger";
  isPending?: boolean;
  onConfirm: () => void;
}

export function ConfirmModal({
  open,
  onOpenChange,
  title = "Save Changes",
  description = "Are you sure you want to save these changes?",
  confirmLabel = "Save Changes",
  cancelLabel = "Cancel",
  variant = "default",
  isPending = false,
  onConfirm,
}: ConfirmModalProps) {
  return (
    <Dialog open={open} onOpenChange={isPending ? undefined : onOpenChange}>
      <DialogContent className="sm:max-w-[420px] rounded-2xl border border-border-light bg-surface p-0 gap-0 shadow-xl overflow-hidden">
        {/* Top accent bar */}
        <div
          className={`h-1 w-full ${
            variant === "danger" ? "bg-red-400" : "bg-section-dark"
          }`}
        />

        <div className="p-6 space-y-5">
          <DialogHeader className="space-y-1.5">
            <DialogTitle className="text-[1.05rem] font-extrabold text-text-dark tracking-tight">
              {title}
            </DialogTitle>
            <DialogDescription className="text-[0.85rem] text-muted-light leading-relaxed">
              {description}
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2 pt-1">
            <button
              type="button"
              disabled={isPending}
              onClick={() => onOpenChange(false)}
              className="flex-1 rounded-xl border border-border-light bg-surface px-4 py-2.5 text-[0.82rem] font-bold text-text-dark transition-all hover:bg-surface-hover active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {cancelLabel}
            </button>
            <button
              type="button"
              disabled={isPending}
              onClick={onConfirm}
              className={`flex-1 flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-[0.82rem] font-bold transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-sm ${
                variant === "danger"
                  ? "bg-red-500 hover:bg-red-600 text-white shadow-red-500/20"
                  : "bg-section-dark hover:bg-section-dark/90 text-white shadow-section-dark/15"
              }`}
            >
              {isPending ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Saving...
                </>
              ) : (
                confirmLabel
              )}
            </button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
