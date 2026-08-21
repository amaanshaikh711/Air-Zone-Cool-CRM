# Air Zone Cool CRM

An operations-focused customer relationship management (CRM) application for HVAC and air-conditioning service businesses. Air Zone Cool CRM brings lead handling, service dispatch, customer management, quotations, annual maintenance contracts, payments, and reviews into one responsive workspace.

## Highlights

- **Lead management** — capture, track, filter, and convert enquiries into customer records.
- **Customer management** — maintain customer profiles, service history, revenue, and active AMC status.
- **Quotations and jobs** — create quotations, mark them accepted, and convert approved work into service jobs.
- **Technician dispatch** — assign field technicians, balance workloads, and monitor active jobs across service zones.
- **AMC operations** — manage annual maintenance contracts, preventive visits, renewal workflows, and reminders.
- **Payments and analytics** — record payments and review operational performance from a central dashboard.
- **Customer engagement** — prepare WhatsApp messages, simulate automated service booking, and draft review responses.
- **Public website** — includes customer-facing pages for services, brands, AMC plans, and enquiries.

## Tech Stack

- React 19 and TypeScript
- Vite 6
- Tailwind CSS 4
- Lucide React icons
- Browser LocalStorage for demo data persistence

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm

### Installation

```bash
git clone https://github.com/amaanshaikh711/Air-Zone-Cool-CRM.git
cd Air-Zone-Cool-CRM
npm install
```

### Run locally

```bash
npm run dev
```

The application starts on `http://localhost:3000`.

### Production build

```bash
npm run build
npm run preview
```

## Application Areas

| Area | Purpose |
| --- | --- |
| Dashboard | Business snapshot, activity feed, and operational metrics |
| Leads | Pipeline tracking and customer conversion |
| Customers | Profiles, contact details, service history, and value tracking |
| Quotations | Quote creation, approval status, and job conversion |
| Jobs & Dispatch | Service workflow, technician assignment, and priorities |
| AMC | Contract lifecycle, scheduled visits, and renewals |
| Payments | Payment log and settlement tracking |
| Reviews & WhatsApp | Customer follow-up, booking flow, and response drafting |

## Data and Configuration

This is a frontend demonstration application. Its seeded records and user changes are stored in the browser's LocalStorage, so data is specific to the browser profile in use. Clearing site data resets the application state.

Use [`.env.example`](.env.example) as the reference for optional environment configuration. Do not commit real API keys or credentials.

## Project Structure

```text
src/
├── components/   # Reusable UI and layout components
├── context/      # Shared CRM state and business workflows
├── data/         # Initial demo data
├── pages/        # CRM and public-facing screens
├── services/     # Browser storage services
└── types/        # Shared TypeScript models
```

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server on port 3000 |
| `npm run build` | Create a production build |
| `npm run preview` | Serve the production build locally |

## Contributing

1. Create a feature branch from `main`.
2. Make focused, well-tested changes.
3. Run `npm run build` before opening a pull request.
4. Describe the user-facing impact in the pull request.

## License

This project is currently unlicensed. Add a license file before distributing or reusing the code outside the project team.
