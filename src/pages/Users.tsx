import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

import {
  Users as UsersIcon,
  UserCheck,
  FileText,
  Database,
  MoreVertical,
  Eye,
  UserX,
  UserCheck as ActivateIcon,
} from "lucide-react";

import { Layout } from "../components/Layout";
import { SkeletonLoader } from "../components/SkeletonLoader";
import { FilterPopover, defaultFilters } from "../components/FilterPanel";
import type { FilterState } from "../components/FilterPanel";
import styles from "../styles/Users.module.scss";
import type { UserProfile } from "../types/user";
import { fetchUsers } from "../services/user.service";

export default function Users() {
  const navigate = useNavigate();

  const [users, setUsers] = useState<UserProfile[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // UI state
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
        setFilteredUsers(data);
      } catch (err) {
        console.error("Failed to fetch users:", err);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadUsers();
  }, []);

  /* ───========== Filter logic ======─── */
  const applyFilters = (newFilters: FilterState) => {
    setFilters(newFilters);
    setCurrentPage(1);

    const result = users.filter((user) => {
      const matchOrg =
        !newFilters.organization ||
        user.organization.toLowerCase().includes(newFilters.organization.toLowerCase());
      const matchUsername =
        !newFilters.username ||
        user.username.toLowerCase().includes(newFilters.username.toLowerCase());
      const matchEmail =
        !newFilters.email ||
        user.email.toLowerCase().includes(newFilters.email.toLowerCase());
      const matchPhone =
        !newFilters.phoneNumber ||
        user.phoneNumber.includes(newFilters.phoneNumber);
      const matchDate =
        !newFilters.date ||
        user.dateJoined.startsWith(newFilters.date);
      const matchStatus =
        !newFilters.status ||
        user.status === newFilters.status;

      return matchOrg && matchUsername && matchEmail && matchPhone && matchDate && matchStatus;
    });

    setFilteredUsers(result);
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
    setFilteredUsers(users);
    setCurrentPage(1);
  };

  if (isLoading) {
    return (
      <Layout>
        <h1 className={styles.title}>Users</h1>
        <SkeletonLoader />
      </Layout>
    );
  }

  if (isError) {
    return (
      <Layout>
        <div style={{ padding: 40, color: "red" }}>Failed to load users.</div>
      </Layout>
    );
  }

  // Pagination 
  const totalItems = filteredUsers.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  const handleViewDetails = (user: UserProfile) => {
    navigate(`/users/${user.id}`, { state: { user } });
  };

  const toggleMenu = (id: string) => {
    setActiveMenuId((prev) => (prev === id ? null : id));
  };

  const TABLE_HEADERS = [
    "ORGANIZATION",
    "USERNAME",
    "EMAIL",
    "PHONE NUMBER",
    "DATE JOINED",
    "STATUS",
  ];

  return (
    <Layout>
      <h1 className={styles.title}>Users</h1>

      {/* Stats cards */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={`${styles.iconWrapper} ${styles.users}`}>
            <UsersIcon size={20} />
          </div>
          <div className={styles.label}>USERS</div>
          <div className={styles.value}>2,453</div>
        </div>
        <div className={styles.statCard}>
          <div className={`${styles.iconWrapper} ${styles.active}`}>
            <UserCheck size={20} />
          </div>
          <div className={styles.label}>ACTIVE USERS</div>
          <div className={styles.value}>2,453</div>
        </div>
        <div className={styles.statCard}>
          <div className={`${styles.iconWrapper} ${styles.loans}`}>
            <FileText size={20} />
          </div>
          <div className={styles.label}>USERS WITH LOANS</div>
          <div className={styles.value}>12,453</div>
        </div>
        <div className={styles.statCard}>
          <div className={`${styles.iconWrapper} ${styles.savings}`}>
            <Database size={20} />
          </div>
          <div className={styles.label}>USERS WITH SAVINGS</div>
          <div className={styles.value}>102,453</div>
        </div>
      </div>

      {/* User count e */}
      <p className={styles.resultCount}>
        {totalItems === users.length
          ? `Showing all ${users.length} users`
          : `Showing ${totalItems} of ${users.length} users`}
      </p>
{/* <div>
  filter 
   <FilterPopover
                      filters={filters}
                      onFilter={applyFilters}
                      onReset={resetFilters}
                    />
</div> */}
                 
      {/* Table */}
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              {TABLE_HEADERS.map((header) => (
                <th key={header}>
                  <div className={styles.headerCell}>
                    {header}
                    <FilterPopover
                      filters={filters}
                      onFilter={applyFilters}
                      onReset={resetFilters}
                    />
                  </div>
                </th>
              ))}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  style={{
                    textAlign: "center",
                    padding: "48px 0",
                    color: "#545f7d",
                  }}
                >
                  No users match the selected filters.
                </td>
              </tr>
            ) : (
              currentUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.organization}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.phoneNumber}</td>
                  <td>{format(new Date(user.dateJoined), "MMM d, yyyy h:mm a")}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${styles[user.status]}`}>
                      {user.status}
                    </span>
                  </td>
                  <td style={{ position: "relative" }}>
                    <button
                      className={styles.actionBtn}
                      onClick={() => toggleMenu(user.id)}
                    >
                      <MoreVertical size={20} />
                    </button>

                    {activeMenuId === user.id && (
                      <div className={styles.actionMenu}>
                        <button onClick={() => handleViewDetails(user)}>
                          <Eye size={16} /> View Details
                        </button>
                        <button onClick={() => setActiveMenuId(null)}>
                          <UserX size={16} /> Blacklist User
                        </button>
                        <button onClick={() => setActiveMenuId(null)}>
                          <ActivateIcon size={16} /> Activate User
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className={styles.pagination}>
        <div className={styles.info}>
          Showing
          <select defaultValue={itemsPerPage}>
            <option value={10}>10</option>
          </select>
          out of {totalItems}
        </div>
        <div className={styles.controls}>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          >
            &lt;
          </button>
          <div className={styles.pageNumbers}>
            {[1, 2, 3].map((p) => (
              <span
                key={p}
                className={currentPage === p ? styles.active : ""}
                onClick={() => p <= totalPages && setCurrentPage(p)}
                style={{
                  opacity: p > totalPages ? 0.3 : 1,
                  cursor: p > totalPages ? "default" : "pointer",
                }}
              >
                {p}
              </span>
            ))}
            {totalPages > 4 && <span>...</span>}
            {totalPages > 3 && (
              <span
                className={currentPage === totalPages ? styles.active : ""}
                onClick={() => setCurrentPage(totalPages)}
              >
                {totalPages}
              </span>
            )}
          </div>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
          >
            &gt;
          </button>
        </div>
      </div>
    </Layout>
  );
}