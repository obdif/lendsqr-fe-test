import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, User as UserIcon, Star } from 'lucide-react';

import { Layout } from '../components/Layout';
import type { UserProfile } from '../types/user';
import styles from '../styles/UserDetails.module.scss';

export default function UserDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const passed = location.state?.user as UserProfile | undefined;

    if (!passed) {
      navigate('/users');
      return;
    }

    setUser(passed);
  }, [location.state, navigate]);

  if (!user) {
    return (
      <Layout>
        <div style={{ padding: 40 }}>Loading details...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Link to="/users" className={styles.backLink}>
        <ArrowLeft size={20} />
        Back to Users
      </Link>

      <div className={styles.header}>
        <h1>User Details</h1>
        <div className={styles.actions}>
          <button className={styles.blacklist}>Blacklist User</button>
          <button className={styles.activate}>Activate User</button>
        </div>
      </div>

      {/* Profile Summary */}
      <div className={styles.profileCard}>
        <div className={styles.profileTop}>
          <div className={styles.avatar}>
            <UserIcon size={32} />
          </div>

          <div className={styles.basicInfo}>
            <h2>{user.personalInfo.fullName}</h2>
            <p>{user.id}</p>
          </div>

          <div className={styles.divider} />

          <div className={styles.tier}>
            <p>User's Tier</p>
            <div className={styles.stars}>
              {[1, 2, 3].map((i) => (
                <Star
                  key={i}
                  size={16}
                  className={i <= user.tier ? styles.filled : ''}
                />
              ))}
            </div>
          </div>

          <div className={styles.divider} />

          <div className={styles.finances}>
            <h3>{user.balance}</h3>
            <p>
              {user.accountNumber} / {user.bankName}
            </p>
          </div>
        </div>

        <div className={styles.tabs}>
          <button className={styles.active}>General Details</button>
          <button>Documents</button>
          <button>Bank Details</button>
          <button>Loans</button>
          <button>Savings</button>
          <button>App and System</button>
        </div>
      </div>

      {/* Details Sections */}
      <div className={styles.detailsContainer}>
        {/* Personal Info */}
        <div className={styles.section}>
          <h3>Personal Information</h3>
          <div className={styles.grid}>
            <Info label="FULL NAME" value={user.personalInfo.fullName} />
            <Info label="PHONE NUMBER" value={user.personalInfo.phoneNumber} />
            <Info label="EMAIL ADDRESS" value={user.personalInfo.email} />
            <Info label="BVN" value={String(user.personalInfo.bvn)} />
            <Info label="GENDER" value={user.personalInfo.gender} />
            <Info label="MARITAL STATUS" value={user.personalInfo.maritalStatus} />
            <Info label="CHILDREN" value={String(user.personalInfo.children)} />
            <Info label="TYPE OF RESIDENCE" value={user.personalInfo.typeOfResidence} />
          </div>
        </div>

        {/* Education */}
        <div className={styles.section}>
          <h3>Education and Employment</h3>
          <div className={styles.grid}>
            <Info label="LEVEL OF EDUCATION" value={user.educationAndEmployment.level} />
            <Info label="EMPLOYMENT STATUS" value={user.educationAndEmployment.employmentStatus} />
            <Info label="SECTOR OF EMPLOYMENT" value={user.educationAndEmployment.sector} />
            <Info label="DURATION OF EMPLOYMENT" value={user.educationAndEmployment.duration} />
            <Info label="OFFICE EMAIL" value={user.educationAndEmployment.officeEmail} />
            <Info label="MONTHLY INCOME" value={user.educationAndEmployment.monthlyIncome.join(' - ')} />
            <Info label="LOAN REPAYMENT" value={user.educationAndEmployment.loanRepayment} />
          </div>
        </div>

        {/* Socials */}
        <div className={styles.section}>
          <h3>Socials</h3>
          <div className={styles.grid}>
            <Info label="TWITTER" value={user.socials.twitter} />
            <Info label="FACEBOOK" value={user.socials.facebook} />
            <Info label="INSTAGRAM" value={user.socials.instagram} />
          </div>
        </div>

        {/* Guarantors */}
        {user.guarantor.map((g, i) => (
          <div key={i} className={styles.section}>
            <h3>Guarantor</h3>
            <div className={styles.grid}>
              <Info label="FULL NAME" value={g.fullName} />
              <Info label="PHONE NUMBER" value={g.phoneNumber} />
              <Info label="EMAIL ADDRESS" value={g.email} />
              <Info label="RELATIONSHIP" value={g.relationship} />
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.field}>
      <div className={styles.label}>{label}</div>
      <div className={styles.value}>{value}</div>
    </div>
  );
}