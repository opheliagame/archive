import React, { useState } from 'react';
import { graphql, Link } from 'gatsby';
import axios from 'axios';
import { useAsync } from 'react-async';

import Layout from '../components/layout';
import '../components/card.scss';
import Card from '../components/card';
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


const IndexPage = (markdownData) => {
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
            gridTemplateAreas: gridAreaString
        }
        return result
    }

    const { edges } = markdownData.data.allMarkdownRemark;
    const gridElementStyle = getCSSGridStyle() 
    const colorBlocks = new Array(grid.nCells - edges.length).fill(0)
    const { data, error, isLoading } = useAsync({ promiseFn: getPalette })
    
    if (isLoading) return "Loading..."
    if (error) return `Something went wrong: ${error.message}`
    if (data) 
    return (
        <Layout>
            <Card style={gridElementStyle}>
                {edges.map((edge, index) => {  
                    const letters = "abcdefghijklmnopqrstuvwxyz"
                    const { frontmatter } = edge.node;
                    const gridChildStyle = {
                        gridArea: letters[index],
                        backgroundImage: `url(${frontmatter.img.childImageSharp.fluid.src})`
                    } 
                    return (
                        <Link 
                            key={index} 
                            to={frontmatter.path} 
                            className="card-container"
                            style={gridChildStyle}>
                            <p className="card-item title">{frontmatter.title}</p>
                        </Link>
                    );
                })}
                {colorBlocks.map((c, i) => {
                    const letters = "abcdefghijklmnopqrstuvwxyz"
                    const color = data[Math.floor(Math.random()*data.length)]
                    const blockStyle = {
                        gridArea: letters[edges.length+i],
                        backgroundColor: `rgb(${color[0]}, ${color[1]}, ${color[2]})`
                    }
                    return (
                        <div key={i} style={blockStyle}></div>
                    )   
                })}
            </Card>
        </Layout>
    );
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