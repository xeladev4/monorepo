"use client";

import { useState, useEffect } from "react";
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

interface WhistleblowerApplication {
  applicationId: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  linkedinProfile: string;
  facebookProfile: string;
  instagramProfile: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  updatedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  rejectionReason?: string;
  socialScore: number;
  greenFlags: string[];
  redFlags: string[];
}

export default function WhistleblowerVerificationPanel() {
  const [applications, setApplications] = useState<WhistleblowerApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedApplication, setSelectedApplication] = useState<string | null>(
    null
  );
  const [filterStatus, setFilterStatus] = useState<
    "pending" | "approved" | "rejected" | "all"
  >("pending");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Fetch applications on mount and when filter changes
  useEffect(() => {
    fetchApplications();
  }, [filterStatus]);

  const fetchApplications = async () => {
    setLoading(true);
    setError(null);
    try {
      const statusParam = filterStatus !== 'all' ? `?status=${filterStatus}` : '';
      const response = await fetch(`${API_BASE_URL}/api/admin/whistleblower-applications${statusParam}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to fetch applications');
      }
      
      setApplications(data.applications);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  const filtered = applications;
  const selected = selectedApplication
    ? applications.find((app) => app.applicationId === selectedApplication)
    : null;

  let selectedStatusBgClass = "";
  if (selected) {
    if (selected.status === "pending") {
      selectedStatusBgClass = "bg-accent";
    } else if (selected.status === "approved") {
      selectedStatusBgClass = "bg-secondary";
    } else {
      selectedStatusBgClass = "bg-destructive";
    }
  }

  const handleApprove = async (applicationId: string) => {
    setActionLoading(applicationId);
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/admin/whistleblower-applications/${applicationId}/approve`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ reviewedBy: 'admin' }),
        }
      );
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error?.message || 'Failed to approve application');
      }
      
      // Refresh applications
      await fetchApplications();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to approve');
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (applicationId: string) => {
    const reason = prompt('Enter rejection reason:');
    if (!reason) return;
    
    setActionLoading(applicationId);
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/admin/whistleblower-applications/${applicationId}/reject`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ reviewedBy: 'admin', reason }),
        }
      );
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error?.message || 'Failed to reject application');
      }
      
      // Refresh applications
      await fetchApplications();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reject');
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b-3 border-foreground bg-card p-4 md:p-6">
        <div className="container mx-auto">
          <h1 className="text-2xl font-black md:text-3xl">
            Whistleblower Verification Panel
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            Review and approve/reject whistleblower applications
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Application List */}
          <div className="lg:col-span-1">
            <div className="mb-4 border-3 border-foreground bg-card p-4 shadow-[4px_4px_0px_0px_rgba(26,26,26,1)]">
              <p className="text-sm font-bold mb-3 block">
                Filter by Status
              </p>
              <div className="grid grid-cols-2 gap-2">
                {["pending", "approved", "rejected", "all"].map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status as any)}
                    className={`border-2 border-foreground p-2 text-xs font-bold transition-all ${
                      filterStatus === status
                        ? "bg-primary shadow-[2px_2px_0px_0px_rgba(26,26,26,1)]"
                        : "bg-card"
                    }`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {loading && (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            )}
            
            {error && (
              <div className="mb-4 p-4 border-3 border-destructive bg-red-50 rounded-sm">
                <p className="text-sm text-destructive">{error}</p>
                <Button onClick={fetchApplications} variant="outline" className="mt-2">
                  Retry
                </Button>
              </div>
            )}
            
            <div className="space-y-3 max-h-[70vh] overflow-y-auto">
              {filtered.map((app) => (
                <Card
                  key={app.applicationId}
                  onClick={() => setSelectedApplication(app.applicationId)}
                  className={`border-3 border-foreground p-3 cursor-pointer transition-all ${
                    selectedApplication === app.applicationId
                      ? "bg-primary shadow-[4px_4px_0px_0px_rgba(26,26,26,1)]"
                      : "bg-card hover:bg-muted shadow-[2px_2px_0px_0px_rgba(26,26,26,1)]"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <div className="flex-1">
                      <p className="font-bold text-sm">{app.fullName}</p>
                      <p className="text-xs text-muted-foreground">
                        {app.address}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(app.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    {app.status === "pending" && (
                      <AlertCircle className="h-4 w-4 shrink-0 text-accent mt-0.5" />
                    )}
                    {app.status === "approved" && (
                      <CheckCircle className="h-4 w-4 shrink-0 text-secondary mt-0.5" />
                    )}
                    {app.status === "rejected" && (
                      <XCircle className="h-4 w-4 shrink-0 text-destructive mt-0.5" />
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {loading && (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}
          
          {error && (
            <div className="mb-4 p-4 border-3 border-destructive bg-red-50 rounded-sm">
              <p className="text-sm text-destructive">{error}</p>
              <Button onClick={fetchApplications} variant="outline" className="mt-2">
                Retry
              </Button>
            </div>
          )}
          
          <div className="space-y-3 max-h-[70vh] overflow-y-auto">
            {filtered.map((app) => (
              <Card
                key={app.applicationId}
                onClick={() => setSelectedApplication(app.applicationId)}
                className={`border-3 border-foreground p-3 cursor-pointer transition-all ${
                  selectedApplication === app.applicationId
                    ? "bg-primary shadow-[4px_4px_0px_0px_rgba(26,26,26,1)]"
                    : "bg-card hover:bg-muted shadow-[2px_2px_0px_0px_rgba(26,26,26,1)]"
                }`}
              >
                <div className="flex items-start gap-2">
                  <div className="flex-1">
                    <p className="font-bold text-sm">{app.fullName}</p>
                    <p className="text-xs text-muted-foreground">
                      {app.address}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(app.createdAt).toLocaleDateString()}
                      selectedStatusBgClass
                    }`}
                  >
                    {selected.status.toUpperCase()}
                  </div>
                </div>

                {/* Contact Info */}
                <div className="border-3 border-foreground p-4 mb-6 bg-muted">
                  <p className="text-xs font-bold text-muted-foreground mb-3">
                    CONTACT INFO
                  </p>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-bold">Email:</span> {selected.email}
                    </p>
                    <p>
                      <span className="font-bold">Phone:</span> {selected.phone}
                    </p>
                    <p>
                      <span className="font-bold">Applied:</span>{" "}
                      {new Date(selected.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Social Score */}
                <div className="mb-6 p-4 border-3 border-foreground bg-card">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-bold">
                      SOCIAL VERIFICATION SCORE
                    </p>
                    <div className="flex h-10 w-10 items-center justify-center border-3 border-foreground bg-secondary font-bold">
                      {selected.socialScore}
                    </div>
                  </div>
                  <div className="w-full border-2 border-foreground h-2 bg-muted">
                    <div
                      className="h-full bg-primary"
                      style={{ width: `${selected.socialScore}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Score above 70 = Generally safe • Below 30 = Likely fraud
                  </p>
                </div>

                {/* Green Flags */}
                {selected.greenFlags.length > 0 && (
                  <div className="mb-6 border-3 border-secondary bg-green-50 p-4">
                    <p className="font-bold text-sm text-secondary mb-2 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      VERIFIED SIGNALS
                    </p>
                    <ul className="space-y-2">
                      {selected.greenFlags.map((flag) => (
                        <li
                          key={`${selected.id}-green-${flag}`}
                          className="text-xs text-secondary flex gap-2"
                        >
                          <span className="mt-0.5">✓</span>
                          <span>{flag}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Red Flags */}
                {selected.redFlags.length > 0 && (
                  <div className="mb-6 border-3 border-destructive bg-red-50 p-4">
                    <p className="font-bold text-sm text-destructive mb-2 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      RED FLAGS
                    </p>
                    <ul className="space-y-2">
                      {selected.redFlags.map((flag) => (
                        <li
                          key={`${selected.id}-red-${flag}`}
                          className="text-xs text-destructive flex gap-2"
                        >
                          <span className="mt-0.5">!</span>
                          <span>{flag}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Social Links */}
                <div className="mb-6 border-3 border-foreground p-4">
                  <p className="text-xs font-bold text-muted-foreground mb-3">
                    SOCIAL PROFILES (Click to verify)
                  </p>
                  <div className="space-y-2">
                    <a
                      href={selected.linkedinProfile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-bold text-primary hover:underline border-b border-foreground pb-2"
                    >
                      <Eye className="h-4 w-4" />
                      LinkedIn Profile
                    </a>
                    <a
                      href={selected.facebookProfile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-bold text-primary hover:underline border-b border-foreground pb-2"
                    >
                      <Eye className="h-4 w-4" />
                      Facebook Profile
                    </a>
                    <a
                      href={selected.instagramProfile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-bold text-primary hover:underline"
                    >
                      <Eye className="h-4 w-4" />
                      Instagram Profile
                    </a>
                  </div>
                </div>

                {/* Action Buttons */}
                {selected.status === "pending" && (
                  <div className="flex gap-3">
                    <Button
                      onClick={() => handleApprove(selected.applicationId)}
                      disabled={actionLoading === selected.applicationId}
                      className="flex-1 border-3 border-foreground bg-secondary px-6 py-6 font-bold shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] disabled:opacity-50"
                    >
                      {actionLoading === selected.applicationId ? (
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      ) : (
                        <CheckCircle className="mr-2 h-5 w-5" />
                      )}
                      Approve
                    </Button>
                    <Button
                      onClick={() => handleReject(selected.applicationId)}
                      disabled={actionLoading === selected.applicationId}
                      className="flex-1 border-3 border-destructive bg-transparent px-6 py-6 font-bold shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] disabled:opacity-50"
                    >
                      {actionLoading === selected.applicationId ? (
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      ) : (
                        <XCircle className="mr-2 h-5 w-5" />
                      )}
                      Reject
                    </Button>
                  </div>
                )}
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
