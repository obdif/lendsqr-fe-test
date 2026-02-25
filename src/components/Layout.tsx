import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Briefcase,
  Home,
  Users,
  UsersRound,
  PiggyBank,
  HandCoins,
  UserCheck,
  UserX,
  Building2,
  Coins,
  Receipt,
  BarChart,
  SlidersHorizontal,
  BadgePercent,
  ClipboardList,
  Search,
  Bell,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

import styles from "../styles/Layout.module.scss";
import avatarImg from "../assets/avater.jpeg";
import logo from "../assets/lendsqr-icon.jpeg";

interface LayoutProps {
  children: ReactNode;
}

const NAV_ITEMS = [
  {
    group: "CUSTOMERS",
    items: [
      { icon: Users, label: "Users", path: "/users" },
      { icon: UsersRound, label: "Guarantors", path: "#" },
      { icon: HandCoins, label: "Loans", path: "#" },
      { icon: HandCoins, label: "Decision Models", path: "#" },
      { icon: PiggyBank, label: "Savings", path: "#" },
      { icon: HandCoins, label: "Loan Requests", path: "#" },
      { icon: UserCheck, label: "Whitelist", path: "#" },
      { icon: UserX, label: "Karma", path: "#" },
    ],
  },
  {
    group: "BUSINESSES",
    items: [
      { icon: Briefcase, label: "Organization", path: "#" },
      { icon: HandCoins, label: "Loan Products", path: "#" },
      { icon: Building2, label: "Savings Products", path: "#" },
      { icon: Coins, label: "Fees and Charges", path: "#" },
      { icon: Receipt, label: "Transactions", path: "#" },
      { icon: BarChart, label: "Services", path: "#" },
      { icon: BadgePercent, label: "Service Account", path: "#" },
      { icon: ClipboardList, label: "Settlements", path: "#" },
      { icon: BarChart, label: "Reports", path: "#" },
    ],
  },
  {
    group: "SETTINGS",
    items: [
      { icon: SlidersHorizontal, label: "Preferences", path: "#" },
      { icon: BadgePercent, label: "Fees and Pricing", path: "#" },
      { icon: ClipboardList, label: "Audit Logs", path: "#" },
    ],
  },
];

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isActive = (path: string) =>
    path !== "#" && location.pathname.startsWith(path);

  return (
    <div className={styles.layout}>
      {/* Top Navbar */}
      <nav className={styles.navbar}>
        <div className={styles.navLeft}>
          <button
            className={styles.menuToggle}
            onClick={() => setIsSidebarOpen((prev) => !prev)}
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className={styles.logo}>
            <img src={logo} width={144.8} height={30} alt="" />
          </div>
        </div>

        <div className={styles.searchBar}>
          <input type="text" placeholder="Search for anything" />
          <button>
            <Search size={16} />
          </button>
        </div>

        <div className={styles.navRight}>
          <span className={styles.docsLink}>Docs</span>
          <Bell className={styles.notification} size={24} />
          <div className={styles.profile}>
            <img src={avatarImg} alt="Profile" />
            <span className={styles.profileName}>Adedeji</span>
            <ChevronDown size={16} />
          </div>
        </div>
      </nav>

      {/* Body */}
      <div className={styles.body}>
        {isSidebarOpen && (
          <div
            className={styles.overlay}
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`${styles.sidebar} ${
            isSidebarOpen ? styles.open : ""
          }`}
        >
          <div className={styles.switchOrg}>
            <Briefcase size={20} />
            <span>Switch Organization</span>
            <ChevronDown size={16} />
          </div>

          <div className={styles.sidebarSection}>
            <Link
              to="/dashboard"
              className={`${styles.navItem} ${
                isActive("/dashboard") ? styles.active : ""
              }`}
              onClick={() => setIsSidebarOpen(false)}
            >
              <Home size={20} />
              <span>Dashboard</span>
            </Link>
          </div>

          {NAV_ITEMS.map((section) => (
            <div key={section.group} className={styles.sidebarSection}>
              <h4>{section.group}</h4>

              {section.items.map((item) => (
                <Link
                  key={item.label}
                  to={item.path === "#" ? location.pathname : item.path}
                  className={`${styles.navItem} ${
                    isActive(item.path) ? styles.active : ""
                  }`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          ))}
        </aside>

        {/* Main Content */}
        <main className={styles.mainContent}>{children}</main>
      </div>
    </div>
  );
}