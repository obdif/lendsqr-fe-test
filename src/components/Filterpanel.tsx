import { useState, useRef, useEffect } from "react";
import { Filter } from "lucide-react";
import styles from "../styles/FilterPanel.module.scss";

export interface FilterState {
  organization: string;
  username: string;
  email: string;
  date: string;
  phoneNumber: string;
  status: string;
}

export const defaultFilters: FilterState = {
  organization: "",
  username: "",
  email: "",
  date: "",
  phoneNumber: "",
  status: "",
};

interface FilterPopoverProps {
  filters: FilterState;
  onFilter: (filters: FilterState) => void;
  onReset: () => void;
}

export function FilterPopover({ filters, onFilter, onReset }: FilterPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [local, setLocal] = useState<FilterState>(filters);
  const popoverRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const set = (key: keyof FilterState, value: string) =>
    setLocal((prev) => ({ ...prev, [key]: value }));

  const handleFilter = () => {
    onFilter(local);
    setIsOpen(false);
  };

  const handleReset = () => {
    setLocal(defaultFilters);
    onReset();
    setIsOpen(false);
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = Object.values(filters).some(Boolean);

  return (
    <div className={styles.wrapper}>
      <button
        ref={buttonRef}
        className={`${styles.filterIcon} ${isActive ? styles.filterIconActive : ""}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Toggle filter"
      >
        <Filter size={14} />
      </button>

      {isOpen && (
        <div ref={popoverRef} className={styles.popover}>
          <div className={styles.fields}>
            <div className={styles.field}>
              <label>Organization</label>
              <select
                value={local.organization}
                onChange={(e) => set("organization", e.target.value)}
              >
                <option value="">Select</option>
                <option value="Lendsqr">Lendsqr</option>
                <option value="Irorun">Irorun</option>
                <option value="Lendstar">Lendstar</option>
              </select>
            </div>

            <div className={styles.field}>
              <label>Username</label>
              <input
                type="text"
                placeholder="User"
                value={local.username}
                onChange={(e) => set("username", e.target.value)}
              />
            </div>

            <div className={styles.field}>
              <label>Email</label>
              <input
                type="text"
                placeholder="Email"
                value={local.email}
                onChange={(e) => set("email", e.target.value)}
              />
            </div>

            <div className={styles.field}>
              <label>Date</label>
              <input
                type="date"
                value={local.date}
                onChange={(e) => set("date", e.target.value)}
              />
            </div>

            <div className={styles.field}>
              <label>Phone Number</label>
              <input
                type="text"
                placeholder="Phone Number"
                value={local.phoneNumber}
                onChange={(e) => set("phoneNumber", e.target.value)}
              />
            </div>

            <div className={styles.field}>
              <label>Status</label>
              <select
                value={local.status}
                onChange={(e) => set("status", e.target.value)}
              >
                <option value="">Select</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Pending">Pending</option>
                <option value="Blacklisted">Blacklisted</option>
              </select>
            </div>
          </div>

          <div className={styles.actions}>
            <button className={styles.resetBtn} onClick={handleReset}>
              Reset
            </button>
            <button className={styles.filterBtn} onClick={handleFilter}>
              Filter
            </button>
          </div>
        </div>
      )}
    </div>
  );
}