import Link from 'next/link'
import './style.css'

export default function BeforeDashboard() {
  return (
    <Link href="/" className="dashboard-link">
      Go to Dashboard
    </Link>
  )
}
