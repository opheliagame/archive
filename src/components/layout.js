/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { useAsync } from "react-async"

import Helmet from 'react-helmet'
import Header from "./header"
import "./layout.scss"
import CSSGrid from '../components/cssgrid';
import { QuadTree, Rectangle, Point } from '../components/quadtree';

const getPalette = async () => 
    await fetch('https://cors-ophelia.herokuapp.com/http://colormind.io/api/', {
        method: "post",
        body: JSON.stringify({model: "default"})
    })
    .then(response => (response.ok ? response : Promise.reject(response)))
    .then(data => data.json())
    .then(json => Promise.resolve(json.result))

const Layout = ({ children }) => {
    const siteData = useStaticQuery(graphql`
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

    let grid;
    const getCSSGridStyle = () => {
        let qtree = new QuadTree(new Rectangle(200, 200, 200, 200), 2)
        for(let i = 0; i < 20; i++) {
            let p = new Point(Math.random()*200*2, Math.random()*200*2)
            qtree.insert(p)
        }

        grid = new CSSGrid(qtree, 200*2, 200*2)
        let gridAreaString = grid.getGridAreaString()
        let result =  {
            display: 'grid',
            gridTemplateAreas: gridAreaString,
            zIndex: -1,
            width: '100vw',
            height: '100vh',
            position: 'absolute',
            top: 0,
            left: 0
        }
        return result
    }

    const gridElementStyle = getCSSGridStyle() 
    const colorBlocks = new Array(grid.nCells).fill(0)
    const { data, error, isLoading } = useAsync({ promiseFn: getPalette })
    
    if (isLoading) return "Loading..."
    if (error) return `Something went wrong: ${error.message}`
    if (data)
    return (
        <>
        <div className="App">
            <Helmet>
                <title>opheliagame</title>
            </Helmet>

            <Header siteTitle={siteData.site.siteMetadata?.title} />

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
        <div style={gridElementStyle}>
            {colorBlocks.map((c, i) => {
                const letters = "abcdefghijklmnopqrstuvwxyz"
                const color = data[Math.floor(Math.random()*data.length)]
                const blockStyle = {
                    gridArea: letters[i],
                    backgroundColor: `rgb(${color[0]}, ${color[1]}, ${color[2]})`
                }
                return (
                    <div key={i} style={blockStyle}></div>
                )  
            })}
        </div>
        </>
    )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
