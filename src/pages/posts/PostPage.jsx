import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosRequest } from "../../api/axiosDefaults";
import PostCard from "../../components/posts/PostCard";

const PostPage = () => {
    const { id } = useParams();
    const [post, setPost] = useState({ results: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // This Handle Mount will fetch the place data from the API
        // and the posts associated with that place.
        const handleMount = async () => {
            try {
                const [{ data: post }] = await Promise.all([
                    axiosRequest.get(`/posts/${id}/`),
                ]);
                setPost({ results: [post] });
            } catch (error) {
                console.error("An error occurred:", error.response);
            }
            setLoading(false);
        };
        if (loading) {
            handleMount();
        }
    }, [id, loading]);

    return (
        <div>
            {loading ? null : (
                <PostCard {...post.results[0]} setPosts={setPost} postPage />
            )}
        </div>
    );
};

export default PostPage;
