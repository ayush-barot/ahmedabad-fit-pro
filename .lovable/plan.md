# Plan: Push FITGURU Project to GitHub (ayush-barot/AayushBarot15)

## Goal
Push the complete FITGURU project to `https://github.com/ayush-barot/AayushBarot15` so that anyone who clones it can run `npm install && npm run dev` and have a fully working app.

## Current State
- Project is a git repo with a Lovable internal remote (not the user's GitHub).
- `lovable-tagger` (only Lovable-specific dependency) is publicly on npm — clones will install fine.
- `.env` is tracked by git and contains only public client-side values (Supabase URL, anon/publishable key, project ID — no service role key).
- `.gitignore` does NOT exclude `.env`.
- `README.md` is still the default Lovable template.
- No GitHub connector is connected yet.

## Steps

### 1. Prepare the project for clean cloning
- **`.gitignore`** — Add `.env`, `.lovable/`, and `*.tsbuildinfo` so internal/secrets files don't get pushed.
- **`.env.example`** (new) — Contains the actual public values (VITE_SUPABASE_URL, VITE_SUPABASE_PUBLISHABLE_KEY, VITE_SUPABASE_PROJECT_ID) so the app runs out of the box after `cp .env.example .env`.
- **`README.md`** — Rewrite with: project description, feature list, tech stack, clone-and-run instructions, env setup, admin access info, and project structure overview.

### 2. Connect the GitHub connector
- Call `standard_connectors--connect` with `connector_id: "github"`.
- User authorizes via GitHub OAuth with `repo` scope (needed to push to their repository).
- The user must authorize with the GitHub account that owns `ayush-barot/AayushBarot15`.

### 3. Push all project files to the repo via GitHub Git Database API
Using `standard_connectors--call_gateway_connection` through the gateway:

1. **Check repo state** — GET `/repos/ayush-barot/AayushBarot15` to see if it's empty or has existing content.
2. **Get base commit** (if repo has content) — GET `/repos/.../git/refs/heads/main` (or `master`) → get current commit SHA → GET `/repos/.../git/commits/{sha}` → get tree SHA.
3. **Create tree with all files** — POST `/repos/.../git/trees` with a `tree` array containing every project file:
   - Text files (`.tsx`, `.ts`, `.css`, `.json`, `.md`, etc.): inline `content` as utf-8 string.
   - Binary files (`favicon.ico`, `bun.lockb`): inline `content` as base64 with `"encoding": "base64"`.
   - If the body is too large for one call, split into multiple tree creations using `base_tree` to chain them.
   - Excludes: `node_modules/`, `dist/`, `.git/`, `.lovable/`, `.env`.
4. **Create commit** — POST `/repos/.../git/commits` with the new tree SHA and parent commit SHA.
5. **Update branch ref** — PATCH `/repos/.../git/refs/heads/main` (or create the ref if the repo is empty).

Result: a single clean commit with the entire project.

### 4. Verify the push
- GET `/repos/ayush-barot/AayushBarot15/contents/` to confirm the file tree is present.
- Spot-check key files (package.json, src/App.tsx, supabase/migrations/) exist in the repo.

### 5. Test clone-and-run (sandbox validation)
- Clone the repo into `/tmp/test-clone` using the GitHub API or `git clone`.
- Run `npm install` and `npm run build` to confirm the project compiles from the pushed files.
- If build passes, the project is ready for GitHub.

## Files to modify (Step 1 only)
- `.gitignore` — add `.env`, `.lovable/`
- `.env.example` — new file
- `README.md` — full rewrite

## Note
For ongoing two-way sync between Lovable and GitHub, the user can also enable **Lovable Git Sync** in workspace settings. This push is a one-time export to get the code into their repository.
