"use client";

import { useMemo, useState } from "react";
import { KnowledgeArticleRecord } from "@/types/domain";
import { Button } from "@/components/common/button";
import { Card, CardContent, CardHeader } from "@/components/common/card";
import { Input } from "@/components/common/input";
import { Modal } from "@/components/common/modal";
import { Select } from "@/components/common/select";
import { SegmentedTabs } from "@/components/common/tabs";
import { Textarea } from "@/components/common/textarea";
import { Badge } from "@/components/common/badge";

type ViewMode = "list" | "editor" | "categories";

const blankArticle: KnowledgeArticleRecord = {
  id: "draft",
  title: "",
  summary: "",
  category: "Billing",
  content: "",
  tags: [],
  status: "DRAFT",
  sourceTag: "Internal",
  owner: "Current User",
  usageCount: 0,
  updatedAt: new Date().toISOString(),
  versionNote: ""
};

export const KnowledgeBaseManager = ({
  initialArticles
}: {
  initialArticles: KnowledgeArticleRecord[];
}) => {
  const [articles, setArticles] = useState(initialArticles);
  const [view, setView] = useState<ViewMode>("list");
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [selectedArticle, setSelectedArticle] = useState<KnowledgeArticleRecord | null>(null);
  const [editorDraft, setEditorDraft] = useState<KnowledgeArticleRecord>(blankArticle);
  const [testModalOpen, setTestModalOpen] = useState(false);
  const [statusNotice, setStatusNotice] = useState<string | null>(null);

  const categories = useMemo(() => {
    return Array.from(new Set(articles.map((article) => article.category)));
  }, [articles]);

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      if (categoryFilter !== "ALL" && article.category !== categoryFilter) {
        return false;
      }

      const search = query.trim().toLowerCase();
      if (!search) return true;

      return `${article.title} ${article.summary} ${article.tags.join(" ")}`
        .toLowerCase()
        .includes(search);
    });
  }, [articles, categoryFilter, query]);

  const openEditor = (article?: KnowledgeArticleRecord) => {
    const next = article ?? { ...blankArticle, id: `draft_${Date.now()}` };
    setSelectedArticle(article ?? null);
    setEditorDraft({ ...next });
    setView("editor");
  };

  const saveArticle = async () => {
    const payload = {
      ...editorDraft,
      tags: editorDraft.tags
    };

    if (selectedArticle) {
      const res = await fetch("/api/knowledge", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, articleId: selectedArticle.id })
      }).then((r) => r.json());

      if (res.data) {
        setArticles((prev) => prev.map((article) => (article.id === res.data.id ? res.data : article)));
        setStatusNotice("Article updated.");
      }
    } else {
      const res = await fetch("/api/knowledge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      }).then((r) => r.json());

      if (res.data) {
        setArticles((prev) => [res.data, ...prev]);
        setStatusNotice("Article created.");
      }
    }

    setView("list");
  };

  const duplicateArticle = async (articleId: string) => {
    const res = await fetch("/api/knowledge", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "duplicate", articleId })
    }).then((r) => r.json());

    if (res.data) {
      setArticles((prev) => [res.data, ...prev]);
      setStatusNotice("Draft duplicated.");
    }
  };

  const archiveArticle = async (articleId: string) => {
    const res = await fetch("/api/knowledge", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "archive", articleId })
    }).then((r) => r.json());

    if (res.data) {
      setArticles((prev) => prev.map((article) => (article.id === articleId ? res.data : article)));
      setStatusNotice("Article archived.");
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-border bg-surface px-4 py-3 text-sm text-body">
        Knowledge quality controls influence assistant confidence, fallback frequency, and escalation volume.
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <SegmentedTabs
          value={view}
          options={[
            { value: "list", label: "List View" },
            { value: "editor", label: "Article Editor" },
            { value: "categories", label: "Category Overview" }
          ]}
          onChange={(value) => setView(value as ViewMode)}
        />
        <Button onClick={() => openEditor()}>Create Article</Button>
      </div>
      {statusNotice ? (
        <p className="inline-flex rounded-lg border border-teal/25 bg-tealSoft px-2.5 py-1 text-xs font-semibold text-teal">
          {statusNotice}
        </p>
      ) : null}

      {view === "list" ? (
        <Card>
          <CardHeader className="grid gap-3 md:grid-cols-[1.4fr_1fr]">
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search knowledge base"
            />
            <Select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}>
              <option value="ALL">All categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Select>
          </CardHeader>
          <CardContent className="overflow-x-auto p-0">
            <table className="w-full text-sm">
              <thead className="bg-surface text-left text-xs uppercase tracking-wide text-muted">
                <tr>
                  <th className="px-3 py-2">Article</th>
                  <th className="px-3 py-2">Category</th>
                  <th className="px-3 py-2">Status</th>
                  <th className="px-3 py-2">Usage</th>
                  <th className="px-3 py-2">Owner</th>
                  <th className="px-3 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredArticles.map((article) => (
                  <tr
                    key={article.id}
                    className={`border-t border-border transition hover:bg-surface ${
                      article.status === "ARCHIVED" ? "opacity-60" : ""
                    }`}
                  >
                    <td className="px-3 py-3">
                      <button
                        type="button"
                        className="text-left"
                        onClick={() => openEditor(article)}
                      >
                        <p className="font-semibold text-heading">{article.title}</p>
                        <p className="text-xs text-muted">{article.summary}</p>
                      </button>
                    </td>
                    <td className="px-3 py-3 text-body">{article.category}</td>
                    <td className="px-3 py-3">
                      <Badge tone={article.status === "PUBLISHED" ? "teal" : article.status === "DRAFT" ? "violet" : "neutral"}>
                        {article.status}
                      </Badge>
                    </td>
                    <td className="px-3 py-3 text-body">{article.usageCount}</td>
                    <td className="px-3 py-3 text-body">{article.owner}</td>
                    <td className="px-3 py-3">
                      <div className="flex flex-wrap gap-1.5">
                        <Button variant="ghost" size="sm" onClick={() => openEditor(article)}>
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => duplicateArticle(article.id)}>
                          Duplicate
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => archiveArticle(article.id)}>
                          Archive
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedArticle(article);
                            setTestModalOpen(true);
                          }}
                        >
                          Test Answer
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      ) : null}

      {view === "editor" ? (
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-heading">
              {selectedArticle ? "Edit article" : "Create article"}
            </h2>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-2">
            <Input
              placeholder="Title"
              value={editorDraft.title}
              onChange={(event) => setEditorDraft((prev) => ({ ...prev, title: event.target.value }))}
            />
            <Input
              placeholder="Summary"
              value={editorDraft.summary}
              onChange={(event) => setEditorDraft((prev) => ({ ...prev, summary: event.target.value }))}
            />
            <Select
              value={editorDraft.category}
              onChange={(event) => setEditorDraft((prev) => ({ ...prev, category: event.target.value }))}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Select>
            <Select
              value={editorDraft.status}
              onChange={(event) =>
                setEditorDraft((prev) => ({
                  ...prev,
                  status: event.target.value as KnowledgeArticleRecord["status"]
                }))
              }
            >
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
              <option value="ARCHIVED">Archived</option>
            </Select>
            <Input
              className="md:col-span-2"
              placeholder="Tags comma separated"
              value={editorDraft.tags.join(", ")}
              onChange={(event) =>
                setEditorDraft((prev) => ({
                  ...prev,
                  tags: event.target.value
                    .split(",")
                    .map((tag) => tag.trim())
                    .filter(Boolean)
                }))
              }
            />
            <Textarea
              className="md:col-span-2"
              rows={8}
              placeholder="Article content"
              value={editorDraft.content}
              onChange={(event) => setEditorDraft((prev) => ({ ...prev, content: event.target.value }))}
            />
            <Input
              placeholder="Version note"
              value={editorDraft.versionNote}
              onChange={(event) => setEditorDraft((prev) => ({ ...prev, versionNote: event.target.value }))}
            />
            <Input
              placeholder="Source tag"
              value={editorDraft.sourceTag}
              onChange={(event) => setEditorDraft((prev) => ({ ...prev, sourceTag: event.target.value }))}
            />
            <div className="flex gap-2 md:col-span-2">
              <Button onClick={saveArticle}>Save Article</Button>
              <Button variant="secondary" onClick={() => setView("list")}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : null}

      {view === "categories" ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => {
            const count = articles.filter((article) => article.category === category).length;
            const usage = articles
              .filter((article) => article.category === category)
              .reduce((sum, article) => sum + article.usageCount, 0);

            return (
              <Card key={category}>
                <CardHeader>
                  <h3 className="text-base font-semibold text-heading">{category}</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-body">{count} articles</p>
                  <p className="text-sm text-muted">Usage count: {usage}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : null}

      <Modal
        open={testModalOpen}
        title="Test answer from this article"
        onClose={() => setTestModalOpen(false)}
      >
        <div className="space-y-3">
          <p className="text-sm text-muted">Sample question</p>
          <p className="rounded-xl bg-surface p-3 text-sm text-body">
            {selectedArticle ? `How should I answer a question about ${selectedArticle.title}?` : "No article selected"}
          </p>
          <p className="text-sm text-muted">Simulated assistant answer</p>
          <p className="rounded-xl bg-panel p-3 text-sm text-body shadow-soft">
            {selectedArticle
              ? `${selectedArticle.summary} ${selectedArticle.content.slice(0, 120)}...`
              : "Select an article to test answer quality."}
          </p>
        </div>
      </Modal>
    </div>
  );
};

