import express from "express";
import { getFeedPosts, getUserPosts, likePost ,commentPost} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);
router.get("/:id/comments",verifyToken,commentPost);
// router.get("/:userId/posts",verifyToken,getUserComments);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);

export default router;
