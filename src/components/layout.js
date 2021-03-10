/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.scss"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div className="App">
        <Header siteTitle={data.site.siteMetadata?.title} />
        {children}

        {/* <div className="border-bottom-container">
            <div className="border-bottom"></div>
        </div> */}

        <div className="footer">
            <small>
            <a href="https://www.instagram.com/ophelia.game/">@opheliagame</a>, Built with
            {` `}
            <a href="https://www.gatsbyjs.com">Gatsby</a>
            </small>
        </div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
