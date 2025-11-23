export const Footer = () => {
  return (
    <footer style={{
      padding: '4rem 2rem',
      textAlign: 'center',
      borderTop: '1px solid #333',
      color: '#666',
      background: '#050505'
    }}>
      <p>&copy; {new Date().getFullYear()} HatersNote. All rights reserved.</p>
    </footer>
  )
}

