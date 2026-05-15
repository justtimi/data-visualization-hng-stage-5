# Real-Time Data Visualization Platform

Live Demo: [https://data-visualization-hng-stage-5.vercel.app/dashboard](https://data-visualization-hng-stage-5.vercel.app/dashboard)
GitHub Repo: [https://github.com/justtimi/data-visualization-hng-stage-5](https://github.com/justtimi/data-visualization-hng-stage-5)

---

## Overview

This is a real-time analytics dashboard built with Vue 3 that simulates live system telemetry data such as CPU usage, memory consumption, latency, and error rates.

The platform behaves like a lightweight observability system similar to:

- DevOps monitoring dashboards
- Trading terminals
- IoT telemetry systems
- System health monitoring tools

The UI is a live reflection of streaming state rather than static data.

---

## Core Features

- Real-time simulated data streaming engine
- Live updating charts for CPU, memory, latency, and error rate
- Metric cards with trend analysis
- Activity feed with severity-based logs
- Analytics table with filtering
- Pause and resume streaming control
- Log filtering by severity
- Dark mode support
- Responsive layout

---

## Architecture Overview

The system is built around a reactive event-driven architecture. The pipeline is below:

```
Engine → Metrics Generator → Pinia Store → UI Components
```

Instead of traditional CRUD flows, the application continuously streams and reacts to data changes in real time.

---

## Tech Stack

- Vue 3 (Composition API)
- TypeScript
- Pinia (State Management)
- TanStack Table
- Apache ECharts
- Tailwind CSS
- Vite

---

## Architecture and Design Decisions

### Overall Architecture Style

The application follows a client-side reactive dashboard architecture built with Vue 3.

It is designed as a real-time observability system similar to monitoring tools like DevOps dashboards or analytics platforms.

UI is a live reflection of streaming state rather than static pages.

---

### State Management Strategy

All runtime data is centralized in a single Pinia store:

- metrics
- logs
- time-series datasets
- connection state

This approach ensures a single source of truth, enables cross-page synchronization, and avoids prop drilling.

---

### Real-Time Engine Design

The system uses a frontend simulation engine instead of backend WebSockets.

It:

- Generates metrics at intervals
- Simulates CPU, memory, latency, and error behavior
- Injects log events dynamically
- Supports pause and resume control

This design simulates production-grade streaming systems without backend complexity.

---

### Component Architecture

The UI is split into three layers:

#### Layout Layer

- Sidebar navigation
- Router views

#### Feature Layer

- Dashboard
- Analytics
- Logs inspector

#### Reusable Layer

- MetricCard
- BaseChart
- ActivityFeed
- ActivityTable

This improves reusability, isolates domain logic, and makes scaling easier.

---

### Data Visualization Strategy

Charts are abstracted into a reusable BaseChart component.

Benefits include:

- Consistent chart behavior
- Easy replacement of chart libraries
- Isolated performance optimization

---

### Performance Decisions

To handle continuous streaming data:

- Logs are limited using slicing
- Computed filters avoid unnecessary mutations
- Table rendering is capped for performance
- Vue reactivity is used instead of manual DOM updates

Future improvements considered:

- Virtualized log rendering
- Throttled chart updates
- Memoized computed selectors

---

### Routing Strategy

The application uses simple page-based routing:

- dashboard
- analytics
- logs

State persists across navigation to maintain continuous system behavior.

---

### UI and UX Decisions

- Dark-first interface design
- Optional light mode via global store
- Real-time visual feedback
- Smooth transitions
- Filterable logs and analytics tables

---

### Sidebar System

- Persistent desktop sidebar
- Collapsible mobile sidebar
- Shared across all routes

This ensures continuous navigation without breaking application state.

---

### Dark Mode Strategy

Dark mode is implemented using a global UI store.

This allows:

- Runtime theme switching
- Centralized control
- Component-level styling flexibility

---

### Key Tradeoffs

Chosen:

- Simulation engine instead of backend streaming
- Pinia instead of heavier state management solutions
- Component-based chart abstraction

Reason:

- Faster development
- Easier debugging
- Strong portfolio clarity

---

## Future Improvements

- WebSocket backend integration
- Multi-stream dashboards
- Virtualized log rendering
- Plugin-based chart system
- Production-grade observability features

---

## Summary

This project demonstrates a real-time reactive analytics system built with a simulation-driven engine, centralized state management, and modular UI architecture.

It is designed to evolve into a production-grade observability platform.
