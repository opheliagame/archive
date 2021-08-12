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
        body: JSON.stringify({model: "ui"})
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

function shuffle(array) {
    var currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
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
        let colorBlocks = new Array(gridIDs.length - edges.length).fill(0)

        const postBlocks = edges.map((edge, index) => {  
            let gridID = "abcdefghijklmnopqrstuvwxyz"[index]
            // while(taken.includes(gridID)) gridID = gridIDs[Math.floor(Math.random()*gridIDs.length)]
            // setTaken(prev => [...prev, gridID])
            const { frontmatter } = edge.node;
            const sizes = [ 200, 150, 300, 250]
            const gridChildStyle = {
                // gridArea: gridID,
                width: sizes[Math.floor(Math.random()*sizes.length)],
                height: sizes[Math.floor(Math.random()*sizes.length)],
                backgroundImage: `url(${frontmatter.img.childImageSharp.fluid.src})`
            } 
           
            console.log(taken)
            return (
                <Link 
                    key={`post${index}`} 
                    to={frontmatter.path} 
                    className="grid-item"
                    style={gridChildStyle}>
                </Link>
            );
        })
        colorBlocks = colorBlocks.map((c, index) => {
            const gridID = "abcdefghijklmnopqrstuvwxyz"[edges.length+index]
            const color = data.palette[Math.floor(Math.random()*data.palette.length)]
            const sizes = [ 100, 200, 150, 300]
            const blockStyle = {
                // gridArea: gridID,
                width: sizes[Math.floor(Math.random()*sizes.length)],
                height: sizes[Math.floor(Math.random()*sizes.length)],
                backgroundColor: `rgb(${color[0]}, ${color[1]}, ${color[2]})`
            }
            console.log(gridIDs.includes(gridID))
            return (
                <div key={`color${index}`} 
                style={blockStyle}
                className="grid-item">  
                </div>
            )   
        })

    let blocks = [...postBlocks]
    blocks.push(...colorBlocks)
    blocks = shuffle(blocks)
    return (
        <Layout>
            <Card>{blocks}</Card>
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