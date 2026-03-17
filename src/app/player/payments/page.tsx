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
          <h1 className="text-2xl font-extrabold text-white mb-1">Payment History</h1>
          <p className="text-text-muted/40 text-sm">Review your transactions and receipts.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-white hover:bg-white/[0.05] transition-all font-bold text-[10px] uppercase tracking-wider">
          <Calendar size={14} className="text-primary" />
          <span>Last 30 Days</span>
          <ChevronRight size={12} className="rotate-90 text-text-muted/40" />
        </button>
      </div>

      <div className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.01]">
                <th className="px-6 py-4 text-[9px] font-bold uppercase tracking-widest text-text-muted/40">Date</th>
                <th className="px-6 py-4 text-[9px] font-bold uppercase tracking-widest text-text-muted/40">Venue & Court</th>
                <th className="px-6 py-4 text-[9px] font-bold uppercase tracking-widest text-text-muted/40">Amount</th>
                <th className="px-6 py-4 text-[9px] font-bold uppercase tracking-widest text-text-muted/40">Status</th>
                <th className="px-6 py-4 text-[9px] font-bold uppercase tracking-widest text-text-muted/40 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {mockTransactions.map((tx) => (
                <tr 
                  key={tx.id} 
                  className="group hover:bg-white/[0.02] transition-colors cursor-pointer"
                  onClick={() => setSelectedTransaction(tx)}
                >
                  <td className="px-6 py-4">
                    <div className="text-xs font-bold text-white">{tx.date}</div>
                    <div className="text-[9px] text-text-muted/30 font-bold uppercase tracking-wider">{tx.id}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs font-bold text-white">{tx.venueName}</div>
                    <div className="text-[10px] text-text-muted/50 font-medium">{tx.courtName}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs font-bold text-white">${tx.amount.toFixed(2)}</div>
                    <div className="text-[9px] text-text-muted/30 font-medium">{tx.method}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2 py-0.5 rounded-md text-[8px] font-bold uppercase tracking-wider",
                      tx.status === "Paid" && "bg-primary/10 text-primary border border-primary/10",
                      tx.status === "Refunded" && "bg-red-500/10 text-red-400 border border-red-500/10",
                      tx.status === "Pending" && "bg-white/5 text-text-muted/60 border border-white/10"
                    )}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1.5 rounded-lg bg-white/5 text-text-muted/40 hover:text-primary hover:bg-primary/10 transition-all">
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-bg-dark/80 backdrop-blur-sm">
          <div className="bg-bg-dark border border-white/10 rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <FileText size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Receipt</h3>
                  <p className="text-[10px] text-text-muted/40 font-bold uppercase">{selectedTransaction.id}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedTransaction(null)}
                className="text-text-muted/40 hover:text-white transition-colors"
              >
                <ChevronRight size={18} className="rotate-180" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <DetailRow label="Venue" value={selectedTransaction.venueName} />
              <DetailRow label="Court" value={selectedTransaction.courtName} />
              <DetailRow label="Date" value={selectedTransaction.date} />
              <DetailRow label="Method" value={selectedTransaction.method} />
              <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                <span className="text-xs font-bold text-text-muted/40 uppercase tracking-widest">Amount</span>
                <span className="text-xl font-bold text-primary">${selectedTransaction.amount.toFixed(2)}</span>
              </div>
            </div>

            <div className="p-6 pt-0">
              <button className="w-full py-3 rounded-xl bg-primary text-text-dark text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-all">
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
      <span className="text-text-muted/40 font-medium">{label}</span>
      <span className="text-white font-bold">{value}</span>
    </div>
  );
}
