# Emi birthday implementation plan

> **For agentic workers:** Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Ship the approved interactive birthday terminal for Emi.
**Architecture:** Buildless static HTML, token-based CSS, browser-local state machine, deferred local video. No backend or real payment.
**Tech Stack:** HTML, CSS, JavaScript, inline SVG.
**MCP Servers:** Existing Sites connector and local browser tooling.
**Spec:** ../specs/2026-11-16-emi-birthday.md

## Global constraints
Portuguese; pink after login; exact supplied credentials; High tier; original artwork; no sound before click; reduced motion; one website.

## Review focus
Incorrect login recovers; phone keyboard does not clip fields; rejected autoplay has a manual path; media errors show feedback; logout stops media and resets state.

## Tasks
- [ ] Build terminal, pink birthday view and olive-oil finale in dist/index.html, dist/style.css and dist/app.js.
- [ ] Copy video to dist/assets/birthday.mp4; defer source until login.
- [ ] Verify state transitions and video with browser checks, desktop/mobile captures and reduced motion.
- [ ] Commit on feature branch; open PR if remote access supports it. Package and privately publish with Sites; report actual blockers.
