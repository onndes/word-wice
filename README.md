# 📘 Word Wice

Word Wice is a vocabulary learning application designed to help users systematically build and reinforce foreign language vocabulary.

The application focuses on **controlled word progression**, **adaptive repetition**, and **offline-first usage**, allowing users to study consistently across different devices and connection states.

---

## 🧠 Core Concept

The main goal of Word Wice is to make vocabulary learning:

- Structured
- Predictable
- Adaptive to memory retention
- Suitable for short, regular study sessions

The app is built around the idea that **each word has a measurable knowledge state**, and repetition frequency should be derived from that state.

---

## 📊 Knowledge Levels System

Each word is assigned a **knowledge level** that represents how well the user remembers it:

- **A0** — New  
- **A1** — Started  
- **A2** — Low  
- **B1** — Medium  
- **B2** — High  
- **C1** — Known  
- **C2** — Learned  

These levels directly influence:
- When a word appears for study
- How often it should be repeated
- Whether it belongs to learning or repetition flows

---

## 🔁 Learning & Repetition Logic

The learning process is intentionally simple and decision-based:

- **Remembered** → level increases by one
- **Forgotten** → level decreases by one

Each level has an associated **time delay** before the word becomes available again.

Examples:
- **B2 → C1**: approximately 2 hours  
- **C1 → C2**: approximately 24 hours  

Once a word reaches **C2**, it is moved to the *learned* category.

---

## 🔄 Learned Words Repetition

Learned words follow a separate repetition flow:

- Repeated up to **five times**
- Initial repetition interval: **~3 days**
- Interval increases with each successful repetition

If a learned word is forgotten:
- Its level is reset to **B2**
- Repetition counter is reset

This prevents false long-term retention and keeps vocabulary accurate.

---

## 📚 Vocabulary Management

- Recommended active learning size: **5 words**
- Configurable up to **50 words per session**

If the vocabulary size is too small:
- The application notifies the user
- Words can be automatically promoted from **A0** to **A1**

This ensures a continuous learning flow.

---

## 🌐 Offline-First Architecture

Word Wice is designed to function fully **without an active internet connection**:

- All learning actions are available offline
- Local data is persisted on the device
- Synchronization occurs automatically once connectivity is restored

### Synchronization Strategy

When multiple devices are used:
- Conflicts may occur due to different progress states
- By default, older edits are discarded

An alternative strategy is available:
- Conflict resolution based on **knowledge level priority**

---

## 📦 Built-in Dictionaries

The application includes predefined vocabulary sets:

- Grouped by language level
- Categorized by topic

These dictionaries allow users to quickly populate their vocabulary, especially when starting a new language or learning a new topic.

---

## ⚙️ Customization Options

Users can configure:
- Number of words per learning session
- Conflict resolution strategy during synchronization
- Learning flow preferences

Some advanced timing controls are planned but not yet implemented.

---

## 🛠️ Technologies & Technical Approach

### Frontend
- **React**
- **TypeScript**
- Component-based UI architecture
- Custom hooks for learning and repetition logic

### State Management
- Centralized state for vocabulary and learning sessions
- Predictable state transitions based on user actions
- Separation between learning and repetition flows

### Offline & Storage
- Local persistence (offline-first)
- Deferred synchronization
- Conflict detection and resolution strategies

### Architecture Principles
- Clear separation between UI and learning logic
- Deterministic word progression rules
- Extensible level and timing system
- Focus on maintainability over premature optimization

---

## 🚧 Project Status

The application is under active conceptual development.
Some features are still in progress and may evolve as the project grows.

