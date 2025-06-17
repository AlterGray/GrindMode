# 📊 Feature Planning: User Statistics for GrindMode App

---

## 🧠 Goal

Enable users to track their ritual stage over the time:

- Visualize progress and current ritual phase on ritual items
- Add chart to show user how fast his grow and what is space for more growth
- Motivate users through visible growth

---

## 🧩 Problem

Users complete tasks and grind daily, but:

- They don’t see tangible feedback on performance
- Don't understand that rituals has phases and its purpose
- Harder to build habit loops without stats

---

## ✅ Solution

Implement Statistics Module that shows:

- 📈 Daily / weekly / monthly breakdown
- ⏱ Total possible ritual completition/actual
- ✅ Tasks done
- 🔁 Ritual consistency
- 🔥 Streaks and discipline level(show at ritual?)

---

## 🧱 Feature Breakdown

### 1. Data to Track (Zustand / AsyncStorage)

| Metric          | Description                              |
| --------------- | ---------------------------------------- |
| habitsCompleted | Based on daily habit checkbox            |
| disciplineScore | Custom: taskDone + habits + noBreak etc. |
| streakDays      | Consecutive days with X discipline level |

---

### 2. UI Components

- 📅 StatsCalendar — calendar with color-coded performance
- 📈 DisciplineChart — line chart for streaks / habits
- updated ritual item to show its phase and status(also strick)

---

### 3. features

- when app loads then rituals initialize, status calculating based on current day if user completed/fail it today then pick this status, if no data about particular ritual for current day then status is 'undone'
- when user complete ritual then it create or update the record into storage which have structure like this:

      {
        id: string,
        days: [
          {
            date: Date,
            status: string,
          }
        ],
      }

- if user delete ritual ask if keep statistic(allow delete it on StatsDashboard)
- introudce ritual phases(based on the stats)
- introudce streeks(will calculate based on the stats)
