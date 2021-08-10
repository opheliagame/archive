import React, { useState } from 'react';
import { graphql, Link } from 'gatsby';
import axios from 'axios';
import { useAsync } from 'react-async';

import Layout from '../components/layout';
import '../components/card.scss';
import Card from '../components/card';
import CSSGrid from '../components/cssgrid';
import { QuadTree, Rectangle, Point } from '../components/quadtree';

const getPalette = async ({ qtree, setGridIDs }) => {
    return await fetch('https://cors-ophelia.herokuapp.com/http://colormind.io/api/', {
        method: "post",
        body: JSON.stringify({model: "default"})
    })
    .then(response => (response.ok ? response : Promise.reject(response)))
    .then(data => data.json())
    .then(json => json.result)
    .then(palette => { 
        const result = getCSSGridStyle(qtree)
        setGridIDs(result.grid.gridIDs)
        return Promise.resolve({
            palette: palette,
            style: result.style,
            grid: result.grid
        })
        
    })
}

const getCSSGridStyle = (qtree) => {
    console.log(grid)
    // return new Promise((resolve, reject) => {
        console.log('getting style')
        for(let i = 0; i < 20; i++) {
            let p = new Point(Math.random()*200*2, Math.random()*200*2)
            console.log('inserting')
            qtree.insert(p)
        }
    
        let grid = new CSSGrid(qtree, 200*2, 200*2)
        let gridAreaString = grid.getGridAreaString()
        let result =  {
            style: {
                display: 'grid',
                gridTemplateAreas: gridAreaString
            },
            grid: grid
        }
        // Promise.resolve(result)
    // })
    console.log(result)
    return result
}


const IndexPage = (markdownData) => {
    
    const { edges } = markdownData.data.allMarkdownRemark;
    const [ qtree, setQtree ] = useState(new QuadTree(new Rectangle(200, 200, 200, 200), 2))
    
    const [ grid, setGrid ] = useState(new CSSGrid(qtree, 200*2, 200*2))
    // console.log(grid)
    // const style = getCSSGridStyle(qtree, grid)
    const [ gridElementStyle, setGridElementStyle ] = useState([])
    const [ gridIDs, setGridIDs ] = useState([])
    // setGridElementStyle(() => getCSSGridStyle(grid))
    // console.log(style)

    const { data, error, isLoading } = useAsync(getPalette, { qtree: qtree, setGridIDs: setGridIDs })
    const [ taken, setTaken ] = useState([])
    
    
    if (isLoading) return "Loading..."
    if (error) return `Something went wrong: ${error.message}`
    if (data) {
        console.log(gridIDs)
        const colorBlocks = new Array(gridIDs.length - edges.length).fill(0)
    return (
        <Layout>
            
                {edges.map((edge, index) => {  
                    let gridID = "abcdefghijklmnopqrstuvwxyz"[index]
                    // while(taken.includes(gridID)) gridID = gridIDs[Math.floor(Math.random()*gridIDs.length)]
                    // setTaken(prev => [...prev, gridID])
                    const { frontmatter } = edge.node;
                    const gridChildStyle = {
                        // gridArea: gridID,
                        backgroundImage: `url(${frontmatter.img.childImageSharp.fluid.src})`
                    } 
                   
                    console.log(taken)
                    return (
                        <Link 
                            key={index} 
                            to={frontmatter.path} 
                            className="block-link"
                            style={gridChildStyle}>
                        </Link>
                    );
                })}
                {/* {colorBlocks.map((c, index) => {
                    const gridID = "abcdefghijklmnopqrstuvwxyz"[edges.length+index]
                    const color = data.palette[Math.floor(Math.random()*data.palette.length)]
                    const blockStyle = {
                        gridArea: gridID,
                        backgroundColor: `rgb(${color[0]}, ${color[1]}, ${color[2]})`
                    }
                    console.log(gridIDs.includes(gridID))
                    return (
                        <div key={index} style={blockStyle}>

                        
                        </div>
                    )   
                })} */}
           
        </Layout>
    );
            }
    return null
};

export const query = graphql`
	query HomePageQuery {
		allMarkdownRemark(sort: { order: DESC, fields: frontmatter___date }) {
			totalCount
			edges {
				node {
					id
					frontmatter {
						title
						date(formatString: "MMMM DD, YYYY")
						path
						tags
						excerpt
                        img {
                            childImageSharp{
                                fluid(maxWidth: 300) {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
					}
				}
			}
		}
	}
`;

export default IndexPage;