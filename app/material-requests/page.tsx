"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { useMaterialRequests } from "@/hooks/useMaterialRequests";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PageHeader } from "@/components/common/PageHeader";
import { MaterialTable } from "@/components/material-requests/MaterialTable";
import { FilterBar } from "@/components/material-requests/FilterBar";
import { CreateRequestDialog } from "@/components/material-requests/CreateRequestDialog";
import { EditRequestDialog } from "@/components/material-requests/EditRequestDialog";
import { Plus } from "lucide-react";
import type { MaterialRequest, Status } from "@/types";
import type { MaterialRequestWithUser } from "@/hooks/useMaterialRequests";
import type { User } from "@supabase/supabase-js";

export default function MaterialRequestsPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<Status | "all">("all");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editingRequest, setEditingRequest] = useState<MaterialRequest | null>(
    null
  );

  // Check authentication
  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/auth/login");
        return;
      }

      setUser(session.user);
      setIsLoading(false);
    };

    checkAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        router.push("/auth/login");
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [router, supabase]);

  const { data: requests, isLoading: requestsLoading } = useMaterialRequests(
    statusFilter === "all" ? undefined : statusFilter
  );

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  if (isLoading || !user) {
    return null; // Loading state handled by loading.tsx
  }

  // Calculate statistics
  const stats = {
    total: requests?.length || 0,
    pending: requests?.filter((r) => r.status === "pending").length || 0,
    approved: requests?.filter((r) => r.status === "approved").length || 0,
    fulfilled: requests?.filter((r) => r.status === "fulfilled").length || 0,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="container mx-auto px-6 py-4 max-w-7xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">Material Request Tracker</h1>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
            <Button onClick={handleSignOut} variant="outline">
              Sign Out
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 max-w-7xl">
        <PageHeader
          title="Material Requests"
          description="Manage and track material requests for your construction projects"
        />

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Requests</CardDescription>
              <CardTitle className="text-3xl">{stats.total}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Pending</CardDescription>
              <CardTitle className="text-3xl text-yellow-600">
                {stats.pending}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Approved</CardDescription>
              <CardTitle className="text-3xl text-blue-600">
                {stats.approved}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Fulfilled</CardDescription>
              <CardTitle className="text-3xl text-green-600">
                {stats.fulfilled}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Main Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>All Requests</CardTitle>
                <CardDescription>
                  View and manage material requests
                </CardDescription>
              </div>
              <Button onClick={() => setCreateDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                New Request
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <FilterBar
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
            />

            <MaterialTable
              requests={requests || []}
              isLoading={requestsLoading}
              onEdit={setEditingRequest}
            />
          </CardContent>
        </Card>

        {/* Dialogs */}
        <CreateRequestDialog
          open={createDialogOpen}
          onOpenChange={setCreateDialogOpen}
        />

        {editingRequest && (
          <EditRequestDialog
            request={editingRequest}
            open={!!editingRequest}
            onOpenChange={(open) => !open && setEditingRequest(null)}
          />
        )}
      </main>
    </div>
  );
}
