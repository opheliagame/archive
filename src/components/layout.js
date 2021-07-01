/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Helmet from 'react-helmet'
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

    useEffect(() => {
        document.body.style.setProperty('--scroll', 0.0 );
    }, []);

    return (
        <div className="App">
            <Helmet>
                <title>opheliagame</title>
            </Helmet>

            <Header siteTitle={data.site.siteMetadata?.title} />

            <div className='progress'></div>

            {children}

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
