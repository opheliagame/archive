import React, { useState, useEffect, useRef } from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/layout';

const Template = ({ data, pageContext }) => {
	const title = data.markdownRemark.frontmatter.title;
	const date = data.markdownRemark.frontmatter.date;
	const html = data.markdownRemark.html;
	const { next, prev } = pageContext;

    const [height, setHeight] = useState(0);
    const ref = useRef(null);
    useEffect(() => {
        setHeight(ref.current.scrollHeight);
    }, []);
    
    const handleScroll = event => {
        let offset = event.target.scrollTop;
        // console.log(offset, height, offset/height);
        document.body.style.setProperty('--scroll', (offset/height)/0.8 );
    }
    
	return (
		<Layout >
            <div className="blog-container" ref={ref} onScroll={handleScroll}>
                <h1 className="title">{title}</h1>
                <div>
                    <em>{date}</em>
                </div>
                <br />
                <div className="blogpost" dangerouslySetInnerHTML={{ __html: html }} />
                <p>
                    {prev && (
                        <Link to={`/${prev.frontmatter.path}`}>
                            {prev.frontmatter.title}{' '}
                            <span role="img" aria-label="point-left">
                                👈{' '}
                            </span>
                            Previous
                        </Link>
                    )}
                </p>
                <p>
                    {next && (
                        <Link to={`/${next.frontmatter.path}`}>
                            Next{' '}
                            <span role="img" aria-label="point-right">
                                👉
                            </span>
                            {next.frontmatter.title}
                        </Link>
                    )}
                </p>
            </div>
		</Layout>
	);
};

export const postQuery = graphql`
	query($pathSlug: String!) {
		markdownRemark(frontmatter: { path: { eq: $pathSlug } }) {
			html
			frontmatter {
				title
				date(formatString: "MMMM, DD, YYYY")
				path
				tags
				excerpt
			}
		}
	}
`;

export default Template;