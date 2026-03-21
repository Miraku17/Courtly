"use client";

import { useState } from "react";
import { mockTransactions, Transaction } from "@/lib/mock-data";
import { Calendar, Download, ChevronRight, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

export default function PaymentsPage() {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-section-dark mb-1">Payment History</h1>
          <p className="text-section-dark/50 text-sm">Review your transactions and receipts.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#f5f5f5] border border-section-dark/10 text-section-dark hover:bg-white transition-all font-bold text-[10px] uppercase tracking-wider">
          <Calendar size={14} className="text-section-dark/50" />
          <span>Last 30 Days</span>
          <ChevronRight size={12} className="rotate-90 text-section-dark/30" />
        </button>
      </div>

      <div className="bg-[#f5f5f5] border border-section-dark/10 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-section-dark/10 bg-section-dark/3">
                <th className="px-6 py-4 text-[9px] font-bold uppercase tracking-widest text-section-dark/40">Date</th>
                <th className="px-6 py-4 text-[9px] font-bold uppercase tracking-widest text-section-dark/40">Venue & Court</th>
                <th className="px-6 py-4 text-[9px] font-bold uppercase tracking-widest text-section-dark/40">Amount</th>
                <th className="px-6 py-4 text-[9px] font-bold uppercase tracking-widest text-section-dark/40">Status</th>
                <th className="px-6 py-4 text-[9px] font-bold uppercase tracking-widest text-section-dark/40 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-section-dark/6">
              {mockTransactions.map((tx) => (
                <tr
                  key={tx.id}
                  className="group hover:bg-section-dark/3 transition-colors cursor-pointer"
                  onClick={() => setSelectedTransaction(tx)}
                >
                  <td className="px-6 py-4">
                    <div className="text-xs font-bold text-section-dark">{tx.date}</div>
                    <div className="text-[9px] text-section-dark/30 font-bold uppercase tracking-wider">{tx.id}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs font-bold text-section-dark">{tx.venueName}</div>
                    <div className="text-[10px] text-section-dark/50 font-medium">{tx.courtName}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs font-bold text-section-dark">₱{tx.amount.toFixed(2)}</div>
                    <div className="text-[9px] text-section-dark/30 font-medium">{tx.method}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2 py-0.5 rounded-md text-[8px] font-bold uppercase tracking-wider",
                      tx.status === "Paid" && "bg-emerald-50 text-emerald-600 border border-emerald-200",
                      tx.status === "Refunded" && "bg-red-50 text-red-500 border border-red-200",
                      tx.status === "Pending" && "bg-amber-50 text-amber-600 border border-amber-200"
                    )}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1.5 rounded-lg bg-section-dark/5 text-section-dark/30 hover:text-section-dark hover:bg-section-dark/10 transition-all">
                      <Download size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transaction Detail Panel */}
      {selectedTransaction && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
          <div className="bg-white border border-section-dark/10 rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-section-dark/8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-lg bg-section-dark/10 flex items-center justify-center text-section-dark">
                  <FileText size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-section-dark">Receipt</h3>
                  <p className="text-[10px] text-section-dark/40 font-bold uppercase">{selectedTransaction.id}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedTransaction(null)}
                className="text-section-dark/30 hover:text-section-dark transition-colors"
              >
                <ChevronRight size={18} className="rotate-180" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <DetailRow label="Venue" value={selectedTransaction.venueName} />
              <DetailRow label="Court" value={selectedTransaction.courtName} />
              <DetailRow label="Date" value={selectedTransaction.date} />
              <DetailRow label="Method" value={selectedTransaction.method} />
              <div className="pt-4 border-t border-section-dark/8 flex justify-between items-center">
                <span className="text-xs font-bold text-section-dark/40 uppercase tracking-widest">Amount</span>
                <span className="text-xl font-bold text-section-dark">₱{selectedTransaction.amount.toFixed(2)}</span>
              </div>
            </div>

            <div className="p-6 pt-0">
              <button className="w-full py-3 rounded-xl bg-section-dark text-white text-xs font-bold uppercase tracking-wider hover:bg-section-dark/90 transition-all">
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center text-xs">
      <span className="text-section-dark/40 font-medium">{label}</span>
      <span className="text-section-dark font-bold">{value}</span>
    </div>
  );
}
