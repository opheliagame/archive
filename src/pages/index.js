import React from 'react';
import { graphql, Link } from 'gatsby';
import axios from 'axios';

import Layout from '../components/layout';
import '../components/card.scss';
import Card from '../components/card';
import CSSGrid from '../components/cssgrid';
import { QuadTree, Rectangle, Point } from '../components/quadtree';

const IndexPage = ({ data }) => {
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

    const { edges } = data.allMarkdownRemark;
    const gridElementStyle = getCSSGridStyle() 
    const blocks = new Array(grid.nCells - edges.length).fill(0)
    const postIndices = new Array(grid.nCells).fill(0).map(i => Math.floor(Math.random()*edges.length))
    const palette = axios.post('https://cors-ophelia.herokuapp.com/http://colormind.io/api/', {
        model: "default"
    }).then(response => response.data.result)

	return (
		<Layout>
            <Card style={gridElementStyle}>
                {postIndices.map((edgeIndex, index) => {  
                    const letters = "abcdefghijklmnopqrstuvwxyz"
                    const { frontmatter } = edges[edgeIndex].node;
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