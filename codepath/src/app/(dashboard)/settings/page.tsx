"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Save, User, Bell, Shield, Trash2 } from "lucide-react";

export default function SettingsPage() {
  const { data: session, update } = useSession();
  const [name, setName] = useState(session?.user?.name || "");
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      await update();
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Pengaturan</h1>
        <p className="text-muted-foreground">
          Kelola profil dan pengaturan akun kamu.
        </p>
      </div>

      <div className="grid gap-6 max-w-2xl">
        {/* Profile */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              <CardTitle>Profil</CardTitle>
            </div>
            <CardDescription>Update informasi profil kamu</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={session?.user?.image || ""} />
                <AvatarFallback className="text-lg">
                  {session?.user?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm">
                Ubah Foto
              </Button>
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Nama</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama kamu"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={session?.user?.email || ""}
                disabled
                className="opacity-60"
              />
              <p className="text-xs text-muted-foreground">
                Email tidak dapat diubah
              </p>
            </div>
            <Button onClick={handleSave} disabled={isSaving}>
              <Save className="mr-2 h-4 w-4" />
              {saved ? "Tersimpan!" : isSaving ? "Menyimpan..." : "Simpan"}
            </Button>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              <CardTitle>Notifikasi</CardTitle>
            </div>
            <CardDescription>Kelola notifikasi yang kamu terima</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "Email notifikasi", desc: "Terima update via email" },
              { label: "Learning reminder", desc: "Pengingat belajar harian" },
              { label: "New features", desc: "Info fitur baru CodePath AI" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div>
                  <p className="font-medium text-sm">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 rounded border-gray-300 accent-primary"
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <CardTitle>Keamanan</CardTitle>
            </div>
            <CardDescription>Kelola keamanan akun kamu</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline">Ubah Password</Button>
            <Separator />
            <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4">
              <div className="flex items-start gap-3">
                <Trash2 className="h-5 w-5 text-destructive mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Hapus Akun</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Menghapus akun akan menghilangkan semua data secara permanen.
                    Tindakan ini tidak dapat dibatalkan.
                  </p>
                  <Button variant="destructive" size="sm" className="mt-3">
                    Hapus Akun
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
