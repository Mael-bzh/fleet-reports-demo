# 📊 Fleet Reports Platform - Product Mockup

**Interactive prototype demonstrating product vision for a Principal PM role in Fleet Management / Transport Technology**

Built by **Mael Kerebel** - Product Manager specializing in European transport compliance and fleet management platforms.

## 🎯 Live Demo

[View Live Demo](https://your-vercel-url.vercel.app)

## ✨ Features Demonstrated

### Dashboard
- Real-time KPI tiles (Active Vehicles, Drivers, Compliance Rate, Safety Score)
- Weekly trend charts (Service Time, Infringements, Compliance, Fuel)
- EU Regulation 561/2006 compliance indicators
- Driver status distribution

### Custom Reports Builder
- **8 Datasets**: Organization, Assets, Drivers, Trips, Safety Events, Fuel & Energy, Hours of Service, Vehicle Inspections
- **Dataset Merging**: Join related data via driver_id, asset_id, or tag_id
- **Up to 15 columns** per report with drag-to-reorder
- **Filters, Grouping, Sorting** with aggregation (SUM, AVG, COUNT)
- **Visualizations**: Column, Line, Donut charts, Metric cards

### Sharing & Permissions
- Visibility levels: Private, Team, Organization
- Share with user groups (Fleet Managers, Compliance Team, Operations Leads, Executives)
- Share with individual users
- Permission levels (View/Edit)

### Report Scheduler
- Daily, Weekly, Monthly recurrence
- Multiple export formats (CSV, XLSX, PDF)
- Tag-based data filtering
- Multi-recipient email delivery

## 🛠 Tech Stack

- React 18
- Recharts (data visualization)
- Lucide React (icons)
- Tailwind-style utility classes

## 🚀 Run Locally

```bash
npm install
npm run dev
```

## 📋 Product Thinking Highlights

1. **Hierarchical Organization Model**: Region → Branch → Team structure mirrors real fleet operations
2. **Data Availability Indicators**: Blue dots on date picker show when telemetry data exists
3. **Persistent Filters**: Context filters persist across all pages
4. **EU Compliance Focus**: Tachograph downloads, Reg 561/2006 references, cross-border tracking

## 👤 About

**Mael Kerebel**  
Product Manager @ Platform Science Europe (ex-Trimble Transportation)  
4 years building SOLID platform for European fleet management & tachograph compliance  
Managing 22-person Franco-Indian team

---

*This mockup was created as a portfolio piece to demonstrate product vision and execution capabilities.*
