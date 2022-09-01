import moment from "moment";
import { Row, Col } from "react-bootstrap";
import FadeUpBox from "../layout/box/fade-up-box/FadeUpBox";
import Post from '../layout/cards/post/Post';

const Blog = ({blogData}) => {

    return (
        <Row>
            {
                blogData.map((blog, index) =>
                    <Col key={index} lg={4} className="mb-5">
                        <FadeUpBox
                            key={index}
                            delay={(2 * index + 1 - (6 * Math.floor(index / 3))) / 10}
                        >
                            <Post
                                key={index}
                                subtitle={blog.subtitle}
                                title={blog.title}
                                image={blog.image}
                                targetLink={blog.targetLink}
                                date={moment(blog.date).format('LL')}
                            />
                        </FadeUpBox>
                    </Col>
                )
            }
        </Row>
    );
}

export default Blog;