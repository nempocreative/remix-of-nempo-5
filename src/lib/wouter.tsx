/**
 * Compatibility layer: the NEMPO pages were written against wouter's API.
 * This module implements that API on top of TanStack Router so the app
 * keeps a single router.
 */
import {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  useContext,
  useEffect,
  type AnchorHTMLAttributes,
  type ComponentType,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
} from "react";
import { useRouter, useRouterState } from "@tanstack/react-router";

type Params = Record<string, string>;

const ParamsContext = createContext<Params>({});

function compile(pattern: string) {
  const keys: string[] = [];
  const src = pattern
    .replace(/\/+$/, "")
    .split("/")
    .map((seg) => {
      if (seg === "*") {
        keys.push("*");
        return "(?:/(.*))?";
      }
      if (seg.startsWith(":")) {
        const optional = seg.endsWith("?");
        const name = seg.slice(1).replace(/\?$/, "");
        keys.push(name);
        return optional ? "(?:/([^/]+))?" : "/([^/]+)";
      }
      return seg ? "/" + seg.replace(/[.+^${}()|[\]\\]/g, "\\$&") : "";
    })
    .join("");
  return { re: new RegExp(`^${src || ""}/?$`, "i"), keys };
}

export function matchPath(pattern: string, path: string): [boolean, Params | null] {
  const { re, keys } = compile(pattern);
  const m = re.exec(path);
  if (!m) return [false, null];
  const params: Params = {};
  keys.forEach((k, i) => {
    if (m[i + 1] !== undefined) params[k] = decodeURIComponent(m[i + 1]);
  });
  return [true, params];
}

function usePathname() {
  return useRouterState({ select: (s) => s.location.pathname });
}

type NavOpts = { replace?: boolean; state?: unknown };

export function useNavigate() {
  const router = useRouter();
  return (to: string, opts?: NavOpts) => {
    if (opts?.replace) router.history.replace(to);
    else router.history.push(to);
  };
}

export function navigate(to: string, opts?: NavOpts) {
  if (opts?.replace) window.history.replaceState(null, "", to);
  else window.history.pushState(null, "", to);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

export function useLocation(): [string, (to: string, opts?: NavOpts) => void] {
  return [usePathname(), useNavigate()];
}

export function useSearch(): string {
  const s = useRouterState({ select: (st) => st.location.searchStr });
  return s.startsWith("?") ? s.slice(1) : s;
}

export function useRoute(pattern: string): [boolean, Params | null] {
  return matchPath(pattern, usePathname());
}

export function useParams<T extends Params = Params>(): T {
  return useContext(ParamsContext) as T;
}

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href?: string;
  to?: string;
  replace?: boolean;
  asChild?: boolean;
  children?: ReactNode;
};

export function Link({ href, to, replace, asChild, onClick, children, ...rest }: LinkProps) {
  const nav = useNavigate();
  const target = href ?? to ?? "#";
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (
      e.defaultPrevented ||
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey ||
      rest.target === "_blank" ||
      /^(https?:|mailto:|tel:|#)/.test(target)
    )
      return;
    e.preventDefault();
    nav(target, { replace });
  };
  if (asChild && isValidElement(children)) {
    const child = children as ReactElement<Record<string, unknown>>;
    return cloneElement(child, { ...rest, href: target, onClick: handle });
  }
  return (
    <a {...rest} href={target} onClick={handle}>
      {children}
    </a>
  );
}

type RouteProps = {
  path?: string;
  component?: ComponentType<any>;
  children?: ReactNode | ((params: Params) => ReactNode);
};

export function Route({ path, component: C, children }: RouteProps) {
  const pathname = usePathname();
  const [ok, params] = path ? matchPath(path, pathname) : [true, {}];
  if (!ok) return null;
  return renderRoute(params ?? {}, C, children);
}

function renderRoute(params: Params, C?: ComponentType<any>, children?: RouteProps["children"]) {
  return (
    <ParamsContext.Provider value={params}>
      {C ? <C params={params} /> : typeof children === "function" ? children(params) : children}
    </ParamsContext.Provider>
  );
}

export function Switch({ children }: { children?: ReactNode }) {
  const pathname = usePathname();
  for (const child of Children.toArray(children)) {
    if (!isValidElement(child)) continue;
    const props = child.props as RouteProps;
    const [ok, params] = props.path ? matchPath(props.path, pathname) : [true, {}];
    if (ok) return renderRoute(params ?? {}, props.component, props.children);
  }
  return null;
}

export function Redirect({ to, href }: { to?: string; href?: string }) {
  const nav = useNavigate();
  useEffect(() => nav(to ?? href ?? "/", { replace: true }), [to, href]);
  return null;
}

export function Router({ children }: { base?: string; children?: ReactNode }) {
  return <>{children}</>;
}
