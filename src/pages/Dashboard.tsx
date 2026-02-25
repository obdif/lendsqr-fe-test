import { useNavigate } from 'react-router-dom';
import {
  Users,
  UserCheck,
  FileText,
  Database,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Activity,
  CreditCard,
  AlertCircle,
} from 'lucide-react';

import { Layout } from '../components/Layout';
import styles from '../styles/Dashboard.module.scss';
import { dashboardStats, recentUsers, loanSummary, monthlyData } from '../mocks/dashboardData';

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className={styles.page}>
        <div className={styles.pageHeader}>
          <div>
            <h1 className={styles.title}>Dashboard</h1>
            <p className={styles.subtitle}>Welcome back — here's what's happening today.</p>
          </div>
        </div>

        {/* Stat Cards */}
        <div className={styles.statsGrid}>
          {dashboardStats.map((stat, i) => (
            <div key={i} className={styles.statCard} style={{ animationDelay: `${i * 80}ms` }}>
              <div className={styles.statTop}>
                <div className={`${styles.iconBox} ${styles[stat.color]}`}>
                  {stat.icon === 'users' && <Users size={20} />}
                  {stat.icon === 'active' && <UserCheck size={20} />}
                  {stat.icon === 'loans' && <FileText size={20} />}
                  {stat.icon === 'savings' && <Database size={20} />}
                </div>
                <span className={`${styles.trend} ${stat.trendUp ? styles.up : styles.down}`}>
                  {stat.trendUp ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
                  {stat.trend}
                </span>
              </div>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Middle row — Monthly bars + Loan summary */}
        <div className={styles.midRow}>
          {/* Monthly Activity Chart */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div>
                <h2 className={styles.cardTitle}>Monthly Activity</h2>
                <p className={styles.cardSub}>User registrations per month</p>
              </div>
              <Activity size={18} className={styles.cardIcon} />
            </div>
            <div className={styles.barChart}>
              {monthlyData.map((item, i) => (
                <div key={i} className={styles.barGroup}>
                  <div className={styles.barWrap}>
                    <div
                      className={styles.bar}
                      style={{
                        height: `${(item.value / 120) * 100}%`,
                        animationDelay: `${i * 60}ms`,
                      }}
                    />
                  </div>
                  <span className={styles.barLabel}>{item.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Loan Summary */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div>
                <h2 className={styles.cardTitle}>Loan Summary</h2>
                <p className={styles.cardSub}>Current loan portfolio</p>
              </div>
              <CreditCard size={18} className={styles.cardIcon} />
            </div>
            <div className={styles.loanList}>
              {loanSummary.map((item, i) => (
                <div key={i} className={styles.loanItem}>
                  <div className={styles.loanLeft}>
                    <div className={`${styles.loanDot} ${styles[item.color]}`} />
                    <span className={styles.loanLabel}>{item.label}</span>
                  </div>
                  <div className={styles.loanRight}>
                    <span className={styles.loanValue}>{item.value}</span>
                    <div className={styles.loanBar}>
                      <div
                        className={`${styles.loanFill} ${styles[item.color]}`}
                        style={{ width: `${item.percent}%` }}
                      />
                    </div>
                    <span className={styles.loanPercent}>{item.percent}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Users */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div>
              <h2 className={styles.cardTitle}>Recent Users</h2>
              <p className={styles.cardSub}>Last 8 registered accounts</p>
            </div>
            <button
              className={styles.viewAll}
              onClick={() => navigate('/users')}
            >
              View all <ArrowRight size={14} />
            </button>
          </div>

          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Organization</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.map((user, i) => (
                  <tr key={i} onClick={() => navigate('/users')} className={styles.clickableRow}>
                    <td>
                      <div className={styles.userName}>
                        <div className={styles.userAvatar}>
                          {user.username.charAt(0).toUpperCase()}
                        </div>
                        {user.username}
                      </div>
                    </td>
                    <td>{user.organization}</td>
                    <td className={styles.emailCell}>{user.email}</td>
                    <td>{user.phoneNumber}</td>
                    <td>
                      <span className={`${styles.badge} ${styles[user.status.toLowerCase()]}`}>
                        {user.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom row — Quick Actions + Alerts */}
        <div className={styles.bottomRow}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Quick Actions</h2>
            </div>
            <div className={styles.actionGrid}>
              <button className={styles.actionBtn} onClick={() => navigate('/users')}>
                <Users size={20} />
                <span>Manage Users</span>
              </button>
              <button className={styles.actionBtn}>
                <FileText size={20} />
                <span>View Loans</span>
              </button>
              <button className={styles.actionBtn}>
                <Database size={20} />
                <span>View Savings</span>
              </button>
              <button className={styles.actionBtn}>
                <CreditCard size={20} />
                <span>Transactions</span>
              </button>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>System Alerts</h2>
              <AlertCircle size={18} className={styles.cardIcon} />
            </div>
            <div className={styles.alertList}>
              <div className={`${styles.alert} ${styles.alertWarning}`}>
                <div className={styles.alertDot} />
                <div>
                  <p className={styles.alertTitle}>12 pending KYC verifications</p>
                  <p className={styles.alertTime}>2 hours ago</p>
                </div>
              </div>
              <div className={`${styles.alert} ${styles.alertInfo}`}>
                <div className={styles.alertDot} />
                <div>
                  <p className={styles.alertTitle}>Monthly report is ready</p>
                  <p className={styles.alertTime}>5 hours ago</p>
                </div>
              </div>
              <div className={`${styles.alert} ${styles.alertDanger}`}>
                <div className={styles.alertDot} />
                <div>
                  <p className={styles.alertTitle}>3 accounts flagged for review</p>
                  <p className={styles.alertTime}>Yesterday</p>
                </div>
              </div>
              <div className={`${styles.alert} ${styles.alertSuccess}`}>
                <div className={styles.alertDot} />
                <div>
                  <p className={styles.alertTitle}>System backup completed</p>
                  <p className={styles.alertTime}>Yesterday</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}