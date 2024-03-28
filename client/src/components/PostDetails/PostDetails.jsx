import React, { useEffect } from "react";


import {
  Paper,
  Typography,
  CircularProgress,
  Divider,
} from "@material-ui/core";


import { useDispatch, useSelector } from "react-redux";


import { getPost, getPostsBySearch } from "../../actions/posts";


import moment from "moment";


import { useParams, useHistory } from "react-router-dom";


import useStyles from "./styles";

const PostDetails = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();

  
  useEffect(() => {
    
    dispatch(getPost(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (post) {
      dispatch(
        getPostsBySearch({ search: "none", tags: post?.tags.join(",") })
      );
    }
  }, [post]);

  if (!post) return null;

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  let recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

  if (recommendedPosts?.length > 4) {
    recommendedPosts = recommendedPosts.splice(0, 3);
  }

  const openPost = (_id) => history.push(`/posts/${_id}`);

  return (
    <Paper style={{ 
      padding: "20px", borderRadius: "15px" ,
      backgroundImage:"linear-gradient(to left, #d5bdaf, #ddc8bb, #e5d4c7, #eddfd3, #f5ebe0)"
      
      
      }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2" style={{textAlign:"center"}}>
            {post.title}
          </Typography>
          <Typography style={{textAlign:"center"}}
            gutterBottom
            variant="h6"
            color="textSecondary"
            component="h2"
          >
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
          <Typography style={{textAlign:"center",marginTop:"50px"}} gutterBottom variant="body1" component="p">
            {post.message}
          </Typography>
          <Typography style={{textAlign:"center",marginTop:"350px"}} variant="h6">Created by: {post.name}</Typography>
          <Typography style={{textAlign:"center"}} variant="body1">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>
        <div className={classes.imageSection}>
          <img 
            className={classes.media}
            src={
              post.selectedFile ||
              "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
            alt={post.title}
          />
        </div>
      </div>

    </Paper>
  );
};

export default PostDetails;
