"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function IndexPage() {
  const [address, setAddress] = useState<string>(
    "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
  );
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  return (
    <section className="flex flex-col justify-center gap-6 md:py-10 h-[calc(100vh-150px)] items-center ">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl">
          GoldRush Bitcoin Wallet UI
        </h1>
        <p className="text-lg text-muted-foreground font-medium">
          Accessible and customizable components that you can copy and paste
          into your apps. Free. Open Source. And Next.js 14 Ready.
        </p>
        <div className="flex items-start gap-4">
          <div className="flex flex-col gap-2">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setLoading(true);
                router.push(`/wallet/${address}`);
              }}
            >
              <div className="flex flex-col gap-2">
                <Label htmlFor="contract_address">
                  Enter a Bitcoin Wallet Address
                </Label>
                <Input
                  className="w-[400px]"
                  type="input"
                  id="address"
                  placeholder="Contract Address"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />
                <Button
                  disabled={address.length === 0}
                  type="submit"
                  className="w-28 mt-2"
                >
                  {
                    <div className="flex items-center gap-2">
                      {loading ? (
                        <LoaderCircleIcon size={16} className="animate-spin" />
                      ) : (
                        "Continue"
                      )}
                    </div>
                  }
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
