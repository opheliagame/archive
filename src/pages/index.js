import React from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '../components/layout';
import '../components/card.scss';
import Card from '../components/card';

const IndexPage = ({ data }) => {
	const { edges } = data.allMarkdownRemark;

	return (
		<Layout>
            <Card>
                {edges.map((edge, index) => {  
                    const { frontmatter } = edge.node;
                    return (
                        <Link 
                            key={frontmatter.path} 
                            to={frontmatter.path} 
                            className="card-container"
                            style={{
                                backgroundImage: `url(${frontmatter.img.childImageSharp.fluid.src})`,
                            }}
                        >
                            <p className="card-item title">{frontmatter.title}</p>
                            {/* <small className="card-item date">
                                {' '}
                                <em>published on</em> {frontmatter.date}
                            </small> */}
                            {/* <p className="card-item tags">{frontmatter.tags}</p> */}
                            {/* <p className="card-item tags">{frontmatter.img}</p> */}
                            
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