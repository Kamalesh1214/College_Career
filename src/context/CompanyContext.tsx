import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useCompanies } from "@/lib/companyApi";
import type { CompanySummary } from "@/lib/companyData";

export const STORAGE_KEY = "selected-company";

export interface StoredSelection {
  companyId: number;
  companyName: string;
  logoUrl: string;
}

interface CompanyContextValue {
  /** false until localStorage has been read on the client */
  ready: boolean;
  selection: StoredSelection | null;
  summary: CompanySummary | null;
  selectCompany: (selection: StoredSelection) => void;
  clearCompany: () => void;
}

const CompanyContext = createContext<CompanyContextValue | null>(null);

export function CompanyProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [selection, setSelection] = useState<StoredSelection | null>(null);
  const companiesQuery = useCompanies();

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as StoredSelection;
        if (parsed && Number.isFinite(Number(parsed.companyId))) {
          setSelection({
            companyId: Number(parsed.companyId),
            companyName: String(parsed.companyName ?? ""),
            logoUrl: String(parsed.logoUrl ?? ""),
          });
        }
      }
    } catch {
      /* ignore malformed storage */
    }
    setReady(true);
  }, []);

  const selectCompany = useCallback((next: StoredSelection) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* storage unavailable */
    }
    setSelection(next);
  }, []);

  const clearCompany = useCallback(() => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* storage unavailable */
    }
    setSelection(null);
  }, []);

  const value = useMemo<CompanyContextValue>(() => {
    const summary =
      companiesQuery.data?.find((company) => company.company_id === selection?.companyId) ?? null;
    return {
      ready,
      selection,
      summary,
      selectCompany,
      clearCompany,
    };
  }, [companiesQuery.data, ready, selection, selectCompany, clearCompany]);

  return <CompanyContext.Provider value={value}>{children}</CompanyContext.Provider>;
}

export function useCompany(): CompanyContextValue {
  const ctx = useContext(CompanyContext);
  if (!ctx) throw new Error("useCompany must be used inside CompanyProvider");
  return ctx;
}
