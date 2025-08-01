# LifePilot – Technical Blueprint

## 🧠 System Diagram
```mermaid
graph TD
  User --> UI
  UI --> AI_Core
  AI_Core --> GoalPlanner
  AI_Core --> BudgetBot
  AI_Core --> DataStorage
  DataStorage --> Firebase
  OptionalWallet(Wallet/Identity) --> DataStorage
