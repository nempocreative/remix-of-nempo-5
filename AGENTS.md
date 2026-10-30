<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Architecture rules
- The NEMPO site (migrated from Replit repo nempocreative/organizer, artifact nempo-garut-web) renders client-only through `src/components/nempo-shell.tsx`, mounted by `src/routes/index.tsx` and the catch-all `src/routes/$.tsx`; why: its 100+ pages rely on browser APIs and were ported as-is.
- Page-level routing inside the NEMPO app goes through `src/lib/wouter.tsx`, a wouter-compatible API backed by TanStack Router; why: keeps one router without rewriting every page. New pages are added to the `Switch` in `src/nempo-app.tsx`.
- tsconfig strict extras (noUncheckedIndexedAccess, exactOptionalPropertyTypes, etc.) are off; why: the imported code was written without them.
- Other Replit artifacts live in `src/apps/<key>/` (own `@/apps/<key>/` imports, `entry.tsx`, public files under `public/<base>/`) and mount at `/<base>` via `src/routes/<base>.index.tsx` + `<base>.$.tsx` using `AppShell`; why: each was a separate Vite app and they must not collide.
