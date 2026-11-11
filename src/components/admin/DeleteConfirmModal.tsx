"use client";

import { AlertTriangle, Trash2, X, Loader2 } from "lucide-react";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  productName: string;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  isDeleting: boolean;
}

export default function DeleteConfirmModal({
  isOpen,
  productName,
  onClose,
  onConfirm,
  isDeleting,
}: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-sm bg-[#17120e] border border-rose-500/40 rounded-[28px] shadow-[0_0_40px_rgba(244,63,94,0.2)] p-6 text-center text-[#f6f3ee]">
        <div className="w-14 h-14 rounded-full bg-rose-950/80 text-rose-400 flex items-center justify-center mx-auto mb-4 border border-rose-500/40">
          <AlertTriangle className="w-7 h-7" />
        </div>

        <h3 className="text-lg font-bold font-serif-luxury text-[#fbf8f3] mb-2">
          Supprimer cet article ?
        </h3>
        <p className="text-xs text-[#e8e0d5]/75 mb-6 leading-relaxed font-light">
          Êtes-vous sûr de vouloir supprimer définitivement <strong className="text-rose-300">&quot;{productName}&quot;</strong> ? Cette action est irréversible.
        </p>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="py-3 px-4 rounded-full bg-white/5 hover:bg-white/10 text-xs font-bold text-[#e8e0d5] border border-white/10 transition-colors cursor-pointer"
          >
            Annuler
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="py-3 px-4 rounded-full bg-rose-600 hover:bg-rose-500 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-rose-900/30 flex items-center justify-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
          >
            {isDeleting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <Trash2 className="w-4 h-4" />
                <span>Supprimer</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
