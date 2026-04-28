# AI-Powered Player Lifecycle Strategy Platform

Live Demo: https://game-ai-strategy-ops-demo.vercel.app

A Node.js + Next.js prototype for game player lifecycle strategy operations, designed around core game operations scenarios such as churn recall, first-purchase conversion, high-value player maintenance, and segment-level campaign planning.

## Project Background

This project was built as a self-driven demo for AI strategy operations in the game industry.

Instead of creating a generic chatbot, I focused on a more business-relevant problem:

**How can player behavioral data be translated into actionable operation strategies and visualized through a lightweight operations dashboard?**

Using mock player data, this project simulates a lightweight workflow from:
- player identification
- lifecycle segmentation
- churn / conversion / LTV scoring
- profile lookup
- priority list filtering
- campaign suggestion generation
- campaign list export
- frontend dashboard visualization

## Core Features

### 1. Batch Player Scoring and Segmentation
The system reads mock player behavioral data and generates:
- lifecycle stage
- churn risk score
- conversion potential score
- LTV score
- user segment
- recommended action

### 2. Overall Distribution Summary
It provides aggregated statistics for:
- lifecycle stage distribution
- user segment distribution
- recommended action distribution
- high-risk / high-LTV / high-conversion user counts

### 3. Single-Player Profile Lookup
It supports player-level lookup to inspect:
- behavioral data
- payment data
- lifecycle stage
- segment label
- recommended operation action

### 4. Priority User List Filtering
It surfaces high-priority players such as:
- high churn risk users
- high LTV users
- high conversion users
- first-purchase opportunity users

### 5. Segment-Level Campaign Suggestion
It generates lightweight operation suggestions for different user segments, including:
- recall campaigns
- first-purchase conversion
- VIP maintenance
- light upsell
- new user growth guidance

### 6. Campaign List Export
It exports target user groups into CSV files for downstream operational use.

### 7. Lightweight Frontend Dashboard
A lightweight Next.js frontend prototype was added to visualize:
- dashboard-level summary metrics
- player profile lookup
- priority user lists
- segment-level campaign suggestions

---

## Example Business Scenarios

This prototype is designed around several common game operation scenarios:

- **Churn Recall**  
  Identify dormant players and generate recall-oriented actions.

- **First-Purchase Conversion**  
  Detect active but not-yet-paying users with high conversion potential.

- **VIP Maintenance**  
  Surface high-value stable payers for retention and premium engagement.

- **Light Upsell**  
  Identify highly active low payers for small-package upsell opportunities.

---

## Tech Stack

- Node.js
- Next.js
- React
- TypeScript
- Tailwind CSS
- csv-parser
- csv-writer

---

## Project Structure

```text
data/
  users.csv
  users_scored.csv
  high_potential_first_purchase_list.csv

scripts/
  exportUsersJson.js

src/
  processUsers.js
  scoring.js
  summary.js
  profile.js
  topUsers.js
  campaign.js
  exportCampaignList.js
  demo.js

frontend/
  src/app/page.tsx
  src/app/profile/page.tsx
  src/app/priority-lists/page.tsx
  src/app/campaign-suggestion/page.tsx
  src/components/Navbar.tsx
  src/lib/usersScored.json

```
## How to Run

### 1. Install project dependencies
```bash
npm install
```

### 2. Generate scored player output
```bash
node src/processUsers.js
```

### 3. Export scored data to frontend JSON
```bash
node scripts/exportUsersJson.js
```

### 4. Run frontend dashboard
```bash
cd frontend
npm install
npm run dev
```

### 5. Open local dashboard
```bash
http://localhost:3001
```

---

## Frontend Pages

The frontend dashboard currently includes:

- **Dashboard**

  Displays lifecycle stage count, high churn users, high LTV users, and first-purchase opportunity users based on actual scoring output.
- **Player Profile**

  Supports user-level search using exported scoring data.
- **Priority Lists**

  Displays high-priority users for recall, VIP maintenance, and first-purchase conversion.
- **Campaign Suggestion**

  Supports segment-level strategy review with campaign goal, recommendation, push copy, and matched sample users.

---

## Sample Outputs

This project can generate outputs such as:

- player lifecycle classification
- churn recall target lists
- first-purchase opportunity user lists
- segment-level campaign suggestions
- exportable CSV campaign files
- frontend dashboard views for player lookup and priority list review

---

## Why This Project Matters

This project is intended to demonstrate how AI strategy operations can be applied to game operations workflows.

Instead of focusing only on model APIs or generic content generation, it emphasizes:

- business-oriented user segmentation
- interpretable rule-based scoring
- strategy mapping
- operational output generation
- lightweight frontend visualization for decision support

This makes it closer to a practical strategy operations prototype than a pure technical demo.

---

## Future Improvements

Planned next steps include:

- adding chart-based visualizations for lifecycle stage, user segment, and recommended action distributions
- enabling direct navigation from priority lists to player profile pages
- improving campaign recommendation quality with LLM-based generation
- upgrading rule-based scoring with basic machine learning models
- deploying the frontend dashboard for easier demo access
