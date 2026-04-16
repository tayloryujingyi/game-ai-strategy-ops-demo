# AI-Powered Player Lifecycle Strategy Platform

A Node.js-based prototype for game player lifecycle strategy operations, designed around core game operations scenarios such as churn recall, first-purchase conversion, and high-value player maintenance.

## Project Background
This project was built as a self-driven demo for AI strategy operations in the game industry.  
Instead of creating a generic chatbot, I focused on a more business-relevant problem:

**How can player behavioral data be translated into actionable operation strategies?**

Using mock player data, this project simulates a lightweight workflow from:
- player identification
- lifecycle segmentation
- churn / conversion / LTV scoring
- strategy recommendation
- campaign list export

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
- csv-parser
- csv-writer

---

## Project Structure

```text
data/
  users.csv
  users_scored.csv
  high_potential_first_purchase_list.csv

src/
  processUsers.js
  scoring.js
  summary.js
  profile.js
  topUsers.js
  campaign.js
  exportCampaignList.js
  demo.js

```
## How to Run
Install dependencies
npm install csv-parser csv-writer
1. Generate scored player output
node src/processUsers.js
2. Check overall summary
node src/summary.js
3. Query a single player profile
node src/profile.js U0015
4. View top priority users
node src/topUsers.js
5. Generate campaign suggestion by segment
node src/campaign.js "High Potential First Purchase"
6. Export a target campaign list
node src/exportCampaignList.js "High Potential First Purchase"
7. View project demo guide
node src/demo.js
Sample Outputs

This project can generate outputs such as:

player lifecycle classification
churn recall target lists
first-purchase opportunity user lists
segment-level campaign suggestions
exportable CSV campaign files
Why This Project Matters

This project is intended to demonstrate how AI strategy operations can be applied to game operations workflows.

Instead of focusing only on model APIs or generic content generation, it emphasizes:

business-oriented user segmentation
interpretable rule-based scoring
strategy mapping
operational output generation

This makes it closer to a lightweight strategy operations prototype than a pure technical demo.

Future Improvements

Planned next steps include:

adding a lightweight visualization dashboard
supporting interactive player search in a local web interface
upgrading rule-based scoring with basic machine learning models
improving campaign recommendation quality with LLM-based generation
