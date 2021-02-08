import Nav from '../nav/nav.component'

const Layout = ({ children, seo, toggleDarkMode }) => (
  <>
    <Nav toggleDarkMode={toggleDarkMode} />
    {children}
  </>
)

export default Layout
