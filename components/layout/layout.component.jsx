import Nav from '../nav/nav.component'

const Layout = ({ children, seo }) => (
  <>
    <Nav />
    {children}
  </>
)

export default Layout
