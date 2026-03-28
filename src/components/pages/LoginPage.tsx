import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/shadcn/input";
import { Button } from "@/components/shadcn/button";
import { login } from "@/services/userService";
import logo from "@/assets/logo/Tomapo_light.png";

export default function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await login(
        import.meta.env.VITE_TEST_EMAIL,
        import.meta.env.VITE_TEST_PASSWORD,
      );
      navigate("/");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="bg-card rounded-xl shadow-sm p-8 w-full max-w-sm flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-sidebar-primary flex items-center justify-center overflow-hidden">
            <img
              src={logo}
              alt="Tomapo"
              className="w-full h-full object-contain"
            />
          </div>
          <span className="font-bold text-lg text-foreground">Tomapo</span>
        </div>

        <div className="flex flex-col gap-1">
          <h1 className="text-base font-semibold text-foreground">Sign in</h1>
          <p className="text-xs text-muted-foreground">
            Enter your credentials to continue
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input type="text" placeholder="you@example.com" />
          <Input type="password" placeholder="••••••••" />
          <Button
            type="submit"
            variant="secondary"
            className="w-full cursor-pointer mt-1"
            disabled={loading}
          >
            {loading ? "Signing in…" : "Sign in"}
          </Button>
        </form>
      </div>
    </div>
  );
}
