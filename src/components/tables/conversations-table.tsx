"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table";
import { SearchX } from "lucide-react";
import { ConversationRecord, FeedbackRating } from "@/types/domain";
import { Badge } from "@/components/common/badge";
import { Button } from "@/components/common/button";
import { EmptyState } from "@/components/common/empty-state";
import { Input } from "@/components/common/input";
import { Select } from "@/components/common/select";
import { cn } from "@/lib/utils/cn";

const feedbackTone: Record<FeedbackRating, "teal" | "rose" | "neutral"> = {
  HELPFUL: "teal",
  NOT_HELPFUL: "rose",
  NONE: "neutral"
};

export const ConversationsTable = ({
  conversations,
  selectedScenario,
  onScenarioChange
}: {
  conversations: ConversationRecord[];
  selectedScenario: string;
  onScenarioChange: (value: string) => void;
}) => {
  const router = useRouter();
  const [sorting, setSorting] = useState<SortingState>([{ id: "updatedAt", desc: true }]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [feedbackFilter, setFeedbackFilter] = useState<string>("ALL");
  const [rowSelection, setRowSelection] = useState({});

  const filteredData = useMemo(() => {
    return conversations.filter((conversation) => {
      if (selectedScenario !== "ALL" && conversation.scenario !== selectedScenario) {
        return false;
      }

      if (statusFilter !== "ALL" && conversation.status !== statusFilter) {
        return false;
      }

      if (feedbackFilter !== "ALL" && conversation.feedback !== feedbackFilter) {
        return false;
      }

      const normalizedSearch = search.toLowerCase().trim();
      if (!normalizedSearch) return true;

      return `${conversation.customerLabel} ${conversation.topic} ${conversation.id}`
        .toLowerCase()
        .includes(normalizedSearch);
    });
  }, [conversations, feedbackFilter, search, selectedScenario, statusFilter]);

  const columns = useMemo<ColumnDef<ConversationRecord>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <input
            aria-label="Select all rows"
            type="checkbox"
            className="h-4 w-4 accent-[#4D74FF]"
            checked={table.getIsAllPageRowsSelected()}
            onChange={table.getToggleAllPageRowsSelectedHandler()}
          />
        ),
        cell: ({ row }) => (
          <input
            aria-label="Select row"
            type="checkbox"
            className="h-4 w-4 accent-[#4D74FF]"
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            onChange={row.getToggleSelectedHandler()}
            onClick={(event) => event.stopPropagation()}
          />
        ),
        size: 28
      },
      {
        accessorKey: "customerLabel",
        header: "Customer",
        cell: ({ row }) => (
          <div>
            <p className="text-sm font-semibold text-heading">{row.original.customerLabel}</p>
            <p className="text-xs text-muted">{row.original.id}</p>
          </div>
        )
      },
      {
        accessorKey: "topic",
        header: "Topic"
      },
      {
        accessorKey: "channel",
        header: "Channel"
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <Badge tone={row.original.status === "RESOLVED" ? "teal" : row.original.status === "ESCALATED" ? "amber" : "violet"}>
            {row.original.status.replace("_", " ")}
          </Badge>
        )
      },
      {
        accessorKey: "feedback",
        header: "Feedback",
        cell: ({ row }) => <Badge tone={feedbackTone[row.original.feedback]}>{row.original.feedback.replace("_", " ")}</Badge>
      },
      {
        accessorKey: "assignedOwner",
        header: "Owner",
        cell: ({ row }) => row.original.assignedOwner ?? "Unassigned"
      },
      {
        accessorKey: "updatedAt",
        header: "Updated",
        cell: ({ row }) => new Date(row.original.updatedAt).toLocaleString()
      }
    ],
    []
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { sorting, rowSelection },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableRowSelection: true
  });

  return (
    <div className="surface-card overflow-hidden">
      <div className="grid gap-3 border-b border-border/90 p-4 lg:grid-cols-[1.4fr_1fr_1fr_1fr_auto]">
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search conversations"
          aria-label="Search conversations"
        />
        <Select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
          <option value="ALL">All statuses</option>
          <option value="RESOLVED">Resolved</option>
          <option value="UNRESOLVED">Unresolved</option>
          <option value="ESCALATED">Escalated</option>
        </Select>
        <Select value={feedbackFilter} onChange={(event) => setFeedbackFilter(event.target.value)}>
          <option value="ALL">All feedback</option>
          <option value="HELPFUL">Helpful</option>
          <option value="NOT_HELPFUL">Not helpful</option>
          <option value="NONE">No feedback</option>
        </Select>
        <Select value={selectedScenario} onChange={(event) => onScenarioChange(event.target.value)}>
          <option value="ALL">All scenarios</option>
          <option value="SAAS">SaaS</option>
          <option value="CONSTRUCTION">Construction</option>
          <option value="DENTAL">Dental</option>
          <option value="ECOMMERCE">E-commerce</option>
          <option value="CONSULTING">Consulting</option>
        </Select>
        <Button
          variant="secondary"
          onClick={() => {
            setSearch("");
            setStatusFilter("ALL");
            setFeedbackFilter("ALL");
            onScenarioChange("ALL");
          }}
        >
          Clear
        </Button>
      </div>

      {filteredData.length === 0 ? (
        <div className="p-5">
          <EmptyState
            title="No conversations match these filters"
            description="Try adjusting status, feedback, scenario, or search terms."
            actionLabel="Reset filters"
            onAction={() => {
              setSearch("");
              setStatusFilter("ALL");
              setFeedbackFilter("ALL");
              onScenarioChange("ALL");
            }}
          />
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-surface text-left text-xs uppercase tracking-wide text-muted">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th key={header.id} className="px-3 py-2 font-semibold">
                        {header.isPlaceholder ? null : (
                          <button
                            type="button"
                            className={cn(
                              "inline-flex items-center gap-1",
                              header.column.getCanSort() ? "cursor-pointer" : "cursor-default"
                            )}
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                          </button>
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    onClick={() => router.push(`/conversations/${row.original.id}`)}
                    className={cn(
                      "table-row cursor-pointer",
                      row.getIsSelected() && "table-row-selected"
                    )}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-3 py-2.5 align-top">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/90 p-4">
            <p className="text-xs font-semibold text-muted">
              {table.getSelectedRowModel().rows.length} selected of {filteredData.length}
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <span className="rounded-lg border border-border bg-surface px-2 py-1 text-xs text-muted">
                Page {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
              </span>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </div>
          </div>
        </>
      )}

      <div className="border-t border-border/90 bg-surface px-4 py-2 text-xs text-muted">
        <span className="inline-flex items-center gap-1">
          <SearchX size={12} />
          Tip: click any row to open full transcript and escalation actions.
        </span>
      </div>
    </div>
  );
};

