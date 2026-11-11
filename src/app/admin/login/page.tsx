"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, User, Shield, ArrowLeft, Loader2, Sparkles, CheckCircle2 } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("molsac2026");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username.trim(), password }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Identifiants invalides");
      }

      // Successful login, navigate to admin dashboard
      router.push("/admin");
      router.refresh();
    } catch (err: any) {
      setErrorMsg(err.message || "Erreur de connexion. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d0a08] via-[#17120e] to-[#0d0a08] text-[#f6f3ee] flex flex-col justify-between p-4 sm:p-6 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#d4af37]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Bar with back to site link */}
      <div className="max-w-md w-full mx-auto flex items-center justify-between pt-2 relative z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs text-[#d4af37] hover:text-[#fff2cc] font-semibold py-2 px-4 rounded-full bg-white/5 border border-[#d4af37]/30 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Retour à la boutique</span>
        </Link>
        <span className="text-[11px] text-[#c5a880]/70 uppercase tracking-widest font-serif-luxury">Tétouan 🇲🇦</span>
      </div>

      {/* Main Login Card */}
      <div className="max-w-md w-full mx-auto my-auto py-8 relative z-10">
        <div className="bg-[#17120e]/95 backdrop-blur-xl rounded-[32px] p-6 sm:p-9 border border-[#d4af37]/40 shadow-[0_0_50px_rgba(212,175,55,0.2)] relative overflow-hidden">
          {/* Subtle gold glow inside card */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Logo & Header */}
          <div className="text-center mb-8 relative z-10">
            <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-[#d4af37] shadow-[0_0_25px_rgba(212,175,55,0.35)] bg-[#0d0a08] mb-4">
              <Image
                src="/images/logo.png"
                alt="Mol Sac Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 border border-[#d4af37]/35 text-[#d4af37] text-xs font-semibold mb-2">
              <Shield className="w-3.5 h-3.5 text-[#d4af37]" />
              <span className="tracking-wider uppercase">Gérance • iPhone Ready</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-serif-luxury text-[#fbf8f3] tracking-wider">
              MOL SAC
            </h1>
            <p className="text-xs text-[#c5a880] font-arabic-luxury mt-1">
              لوحة التحكم الخاصة بمحل قيسارية الحمامة رقم 6
            </p>
          </div>

          {/* Error alert */}
          {errorMsg && (
            <div className="mb-5 p-3.5 rounded-2xl bg-rose-950/80 border border-rose-500/40 text-xs text-rose-200">
              {errorMsg}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4 relative z-10">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#d4af37] mb-1.5">
                Nom d&apos;utilisateur
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#d4af37] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  required
                  autoCapitalize="none"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full pl-10 pr-4 py-3.5 bg-[#0d0a08] rounded-2xl border border-[#d4af37]/35 text-sm text-[#f6f3ee] placeholder-[#e8e0d5]/30 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#d4af37] mb-1.5">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#d4af37] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3.5 bg-[#0d0a08] rounded-2xl border border-[#d4af37]/35 text-sm text-[#f6f3ee] placeholder-[#e8e0d5]/30 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all"
                />
              </div>
            </div>

            {/* Quick credentials hint */}
            <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 text-[11px] text-[#e8e0d5]/75 space-y-1">
              <div className="flex items-center gap-1.5 text-[#d4af37] font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Accès gérant enregistré :</span>
              </div>
              <p>Identifiant : <code className="bg-white/10 px-1.5 py-0.5 rounded text-[#d4af37]">admin</code></p>
              <p>Mot de passe : <code className="bg-white/10 px-1.5 py-0.5 rounded text-[#d4af37]">molsac2026</code></p>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 px-6 rounded-full font-bold text-xs uppercase tracking-wider bg-gold-metallic text-[#0d0a08] shadow-[0_5px_25px_rgba(212,175,55,0.3)] hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Connexion en cours...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Accéder à l&apos;espace gérance</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Footer info */}
      <div className="text-center text-xs text-[#e8e0d5]/40 pb-2 relative z-10">
        <p>Mol Sac • قيسارية الحمامة محل 6 • تطوان</p>
      </div>
    </div>
  );
}
