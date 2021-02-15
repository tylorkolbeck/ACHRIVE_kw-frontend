import Nav from '../nav/nav.component'
import Footer from '../Footer/Footer.component'
import BackToTop from '../ScrollToTopButton/ScrollToTopButton.component'

const Layout = ({ children, seo, toggleDarkMode }) => (
  <div
    style={{
      minHeight: '100vh',
      position: 'relative'
    }}
  >
    <Nav toggleDarkMode={toggleDarkMode} />
    <div style={{ minHeight: '100vh' }}>{children}</div>
    <BackToTop />
    <div>
      <Footer />
    </div>
  </div>
)

export default Layout
