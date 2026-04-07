"use client";

import { useEffect, useState } from "react";
import {
  CheckCircle,
  Download,
  Home,
  Clock,
  Mail,
  FileText,
  ChevronRight,
  Printer,
  Badge,
} from "lucide-react";
import { Separator } from "../shadcnui/separator";
import { Button } from "../shadcnui/button";
import { useSearchParams } from "next/navigation";

const steps = [
  {
    icon: CheckCircle,
    title: "Application Submitted",
    description: "Your application has been received successfully.",
    status: "done",
    time: "Just now",
  },
  {
    icon: FileText,
    title: "Document Verification",
    description: "Our team will verify all uploaded documents.",
    status: "upcoming",
    time: "3–5 business days",
  },
  {
    icon: Mail,
    title: "Email Confirmation",
    description: "A confirmation will be sent to your registered email.",
    status: "upcoming",
    time: "Within 24 hours",
  },
  {
    icon: Clock,
    title: "Final Decision",
    description: "You'll be notified of the outcome via email & SMS.",
    status: "upcoming",
    time: "7–10 business days",
  },
];

export default function SubmissionSuccess() {
  const [visible, setVisible] = useState(false);
  const [countUp, setCountUp] = useState(0);

  const searchParams = useSearchParams();
  const ref = searchParams.get("ref");

  // const refNumber = "JB-2026-IMWFQU";
  const submittedAt = new Date().toLocaleString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!visible) return;
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setCountUp(i);
      if (i >= 100) clearInterval(interval);
    }, 12);
    return () => clearInterval(interval);
  }, [visible]);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      {/* TOP BANNER */}
      <div className="flex items-center justify-between bg-slate-800 px-6 py-3 text-sm text-white">
        <span className="font-medium tracking-wide">
          State Employment Portal · Government of West Bengal
        </span>
        <Badge className="border-slate-500 text-xs text-slate-300">
          Session Active
        </Badge>
      </div>

      <div className="flex flex-1 flex-col items-center justify-start px-4 py-12">
        <div
          className="w-full max-w-2xl transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
          }}>
          {/* SUCCESS CARD */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {/* GREEN TOP BAR */}
            <div className="h-1.5 w-full bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500" />

            <div className="px-8 py-10 text-center">
              {/* ICON */}
              <div
                className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full border-4 border-green-100 bg-green-50 transition-all duration-500"
                style={{
                  transform: visible ? "scale(1)" : "scale(0.6)",
                  opacity: visible ? 1 : 0,
                  transitionDelay: "200ms",
                }}>
                <CheckCircle
                  className="h-10 w-10 text-green-500"
                  strokeWidth={1.5}
                />
              </div>

              <h1 className="mb-2 text-2xl font-semibold text-slate-800">
                Application Submitted!
              </h1>
              <p className="mx-auto max-w-sm text-sm leading-relaxed text-slate-500">
                Your job application has been successfully submitted to the
                State Employment Portal.
              </p>

              {/* PROGRESS BAR */}
              <div className="mt-6 mb-2">
                <div className="mb-1.5 flex justify-between text-xs text-slate-400">
                  <span>Completion</span>
                  <span>{countUp}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-75"
                    style={{ width: `${countUp}%` }}
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* REFERENCE NUMBER */}
            <div className="flex flex-col items-center justify-between gap-4 bg-slate-50 px-8 py-6 sm:flex-row">
              <div>
                <p className="mb-1 text-xs tracking-widest text-slate-400 uppercase">
                  Application Reference
                </p>
                <p className="text-sm">{ref}</p>
                <p className="mt-1 text-xs text-slate-400">
                  Submitted on {submittedAt}
                </p>
              </div>
              <button
                onClick={() => navigator.clipboard?.writeText(ref as string)}
                className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-medium text-emerald-600 transition-colors hover:bg-emerald-100">
                Copy Reference
              </button>
            </div>

            <Separator />

            {/* WHAT HAPPENS NEXT */}
            <div className="px-8 py-7">
              <h2 className="mb-6 text-sm font-semibold tracking-widest text-slate-600 uppercase">
                What Happens Next
              </h2>

              <div className="space-y-0">
                {steps.map((step, i) => {
                  const Icon = step.icon;
                  const isDone = step.status === "done";
                  return (
                    <div
                      key={i}
                      className="flex gap-4">
                      {/* LINE + ICON */}
                      <div className="flex flex-col items-center">
                        <div
                          className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 transition-all duration-500 ${
                            isDone ?
                              "border-green-500 bg-green-500"
                            : "border-slate-200 bg-white"
                          }`}
                          style={{
                            transitionDelay: `${i * 120 + 400}ms`,
                            opacity: visible ? 1 : 0,
                            transform: visible ? "scale(1)" : "scale(0.7)",
                          }}>
                          <Icon
                            className={`h-3.5 w-3.5 ${isDone ? "text-white" : "text-slate-300"}`}
                            strokeWidth={2}
                          />
                        </div>
                        {i < steps.length - 1 && (
                          <div
                            className={`my-1 w-px flex-1 ${isDone ? "bg-green-300" : "bg-slate-100"}`}
                            style={{ minHeight: "28px" }}
                          />
                        )}
                      </div>

                      {/* CONTENT */}
                      <div className="pb-6">
                        <div className="mb-0.5 flex items-center gap-2">
                          <p
                            className={`text-sm font-medium ${isDone ? "text-slate-800" : "text-slate-500"}`}>
                            {step.title}
                          </p>
                          {isDone && (
                            <Badge className="border border-green-200 bg-green-50 px-2 py-0 text-xs font-normal text-green-700">
                              Completed
                            </Badge>
                          )}
                        </div>
                        <p className="mb-1 text-xs text-slate-400">
                          {step.description}
                        </p>
                        <p className="flex items-center gap-1 text-xs text-slate-400">
                          <Clock className="h-3 w-3" />
                          {step.time}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <Separator />

            {/* ACTION BUTTONS */}
            <div className="flex flex-col gap-3 px-8 py-6 sm:flex-row">
              <Button
                variant="outline"
                className="flex-1 gap-2 border-slate-200 text-slate-600 hover:bg-slate-50"
                onClick={() => window.print()}>
                <Printer className="h-4 w-4" />
                Print / Save PDF
              </Button>

              <Button
                variant="outline"
                className="flex-1 gap-2 border-slate-200 text-slate-600 hover:bg-slate-50">
                <Download className="h-4 w-4" />
                Download Receipt
              </Button>

              <Button
                className="flex-1 gap-2 bg-slate-800 text-white hover:bg-slate-700"
                onClick={() => (window.location.href = "/dashboard")}>
                <Home className="h-4 w-4" />
                Go to Dashboard
                <ChevronRight className="ml-auto h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* FOOTER NOTE */}
          <p className="mt-6 text-center text-xs leading-relaxed text-slate-400">
            Keep your reference number safe. You will need it to track your
            application.
            <br />
            For queries, contact{" "}
            <span className="font-medium text-slate-600">
              support@wbemployment.gov.in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
