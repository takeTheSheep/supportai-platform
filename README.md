# SupportAI Platform

SupportAI is a production-minded AI customer support SaaS demo built with a modular full-stack architecture.

It demonstrates:
- premium public product UX
- authenticated SaaS dashboard flows
- conversation operations and escalation handling
- knowledge base management
- widget customization with live preview
- analytics surfaces and team oversight
- AI abstraction layer with guardrails and scenario-aware responses

## Product Concept

SupportAI enables businesses to deploy a controlled support assistant on their website, backed by:
- workspace-scoped knowledge content
- conversation review and human handoff workflows
- operational analytics and team management
- configurable assistant behavior with guardrails

## Core Features

### Public product area
- Landing page with premium product storytelling and interactive sections
- Product, Solutions, Security pages
- Interactive Demo sandbox with scenario presets and realistic chat behavior
- Pricing, Privacy, Terms pages
- Auth pages (Login, Register)

### Authenticated app area
- Dashboard with KPI cards, trends, escalation summary, AI performance, and recent activity
- Conversations management with filters, sorting, pagination, row selection, and detail view actions
- Knowledge Base manager with list/editor/category views, search, filters, duplicate/archive, and test-answer modal
- Widget customization page with live preview, embed snippet, and copy confirmation
- Analytics page with line, stacked bar, and donut chart views plus filters
- Inbox/Escalations queue with priority/SLA indicators and quick actions
- Team overview cards with role badges and performance sparkline
- Settings center with Workspace, Assistant Behavior, Notifications, Security, Team Permissions, Integrations tabs

## Tech Stack

### Frontend
- Next.js App Router
- TypeScript
- Tailwind CSS
- React Hook Form
- Zod
- TanStack Table
- Recharts
- Zustand

### Backend
- Next.js Route Handlers + Server Actions
- Prisma
- PostgreSQL schema design
- Auth.js (NextAuth credentials flow)
- Role-aware access boundaries
- Zod validation for mutations

### Security and infrastructure primitives
- input sanitization
- workspace/role-aware architecture
- rate-limit abstraction (Upstash Redis or in-memory fallback)
- safe error shaping
- audit log service boundary
- anti-abuse and guardrail architecture for chat flows

## AI Architecture

AI integration is separated behind a provider abstraction:
- `src/lib/ai/types.ts`: provider contract
- `src/lib/ai/provider.ts`: provider selector
- `src/lib/ai/mock-provider.ts`: scenario-aware simulated model behavior
- `src/lib/ai/guardrails.ts`: unsafe-topic and payload guardrails
- `src/lib/ai/service.ts`: orchestration entry point

This allows clean migration to real providers (OpenAI, Anthropic, etc.) without rewriting UI or domain services.

## Project Structure

```text
/
  public/
    images/
    icons/
    og/
  prisma/
    schema.prisma
    seed.ts
  src/
    app/
      (marketing)/
      (auth)/
      (dashboard)/
      api/
    components/
      marketing/
      dashboard/
      chat/
      widget/
      analytics/
      tables/
      forms/
      layout/
      common/
      modals/
    lib/
      auth/
      db/
      permissions/
      validation/
      ai/
      services/
      repositories/
      rate-limit/
      security/
      utils/
    server/
      actions/
      queries/
      mutations/
    hooks/
    store/
    types/
    constants/
    data/
```

## Domain Models (Prisma)

Implemented core models include:
- `User`, `Workspace`, `Membership`
- `Conversation`, `Message`, `ConversationFeedback`, `Escalation`, `ConversationTag`, `TeamNote`
- `KnowledgeCategory`, `KnowledgeArticle`
- `WidgetConfig`, `AssistantSettings`
- `Notification`, `AuditLog`, `PromptPreset`
- Auth models: `Session`, `Account`, `VerificationToken`

## Authentication and Roles

Auth is handled with NextAuth credentials provider.

Roles:
- `ADMIN`
- `SUPPORT_MANAGER`
- `SUPPORT_AGENT`

Route protection is enforced by middleware for all dashboard surfaces.

## Local Setup

### 1) Install dependencies

```bash
npm install
```

### 2) Configure environment

Copy `.env.example` to `.env` and update values:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/supportai"
REDIS_URL=""
REDIS_TOKEN=""
NEXTAUTH_SECRET="replace-with-long-random-secret"
NEXTAUTH_URL="http://localhost:3000"
AUTH_TRUST_HOST="true"
```

### 3) Initialize Prisma

```bash
npx prisma generate
npx prisma migrate dev
npm run prisma:seed
```

### 4) Run the app

```bash
npm run dev
```

## Demo Credentials (after seed)

- Admin: `admin@supportai.dev` / `DemoPass123!`
- Support Manager: `manager@supportai.dev` / `DemoPass123!`
- Support Agent: `agent@supportai.dev` / `DemoPass123!`

## API Highlights

Key endpoints:
- `POST /api/demo-chat`
- `GET /api/dashboard/stats`
- `GET /api/conversations`
- `POST /api/conversations/[id]/feedback`
- `POST /api/conversations/[id]/assign`
- `POST /api/conversations/[id]/escalate`
- `POST /api/conversations/[id]/resolve`
- `GET|POST|PATCH /api/knowledge`
- `GET|PATCH /api/widget`
- `GET|PATCH /api/settings`

## Security Notes

Implemented now:
- typed validation for key mutations
- auth-protected SaaS routes and API access checks
- role-aware service boundaries
- sanitized text input pathway
- rate-limit architecture for auth/chat endpoints
- no dangerous HTML rendering

Future hardening roadmap:
- anomaly detection and abuse monitoring
- conversation moderation layer
- webhook signature verification pipeline
- selective field encryption at rest
- suspicious login alerting
- full observability pipeline (Sentry, tracing, alerting)

## Deployment Notes

- Deploy as a Next.js app with a managed PostgreSQL database.
- Add managed Redis for distributed rate limiting.
- Replace mock AI provider with production provider adapter.
- Configure secure secrets and HTTPS-only deployment.

## Status

This repository is portfolio-grade and production-minded by architecture, while still using a simulated AI provider for deterministic demo behavior.

