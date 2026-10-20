# Bounded Worker Delegation Skill

## Overview

Use this procedure only when a task gains from separate context or parallel work. The orchestrator remains responsible for decisions and implementation.

## Procedure

1. Check whether the task can be completed directly in one pass. If so, do that.
2. Define one independent task, its relevant files, constraints, evidence, and expected output.
3. Delegate it to the generic worker only if the runtime supports delegation.
4. Consolidate the worker's findings and verify evidence before acting.
5. Stop when the task is complete. Do not start nested or redundant delegation.
