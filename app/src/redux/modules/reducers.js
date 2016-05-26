import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
// blog
import layout from './layout';
import articleList from './articleList';
import article from './article';
import singlePage from './singlePage';
import comment from './comment';
// admin
import adminBlogInfo from './admin/blogInfo';
import adminAuth from './admin/auth';
import adminArticleList from './admin/articleList';
import adminArticle from './admin/article';
import adminAdminList from './admin/adminList';
import adminArticleTagList from './admin/articleTagList';
import adminArticleTypeList from './admin/articleTypeList';
import adminUserList from './admin/articleTypeList.js';
import adminCommentList from './admin/commentList';
import adminLinkList from './admin/linkList';
import adminSinglePageList from './admin/singlePageList';
import adminAdmin from './admin/admin';
import adminArticleTag from './admin/articleTag';
import adminArticleType from './admin/articleType';
import adminUser from './admin/user';
import adminComment from './admin/comment';
import adminLink from './admin/link';
import adminSinglePage from './admin/singlePage';

export default combineReducers({
  router: routerStateReducer,
  // blog
  layout,
  articleList,
  article,
  singlePage,
  comment,
  // admin
  adminBlogInfo,
  adminAuth,
  adminArticleList,
  adminArticle,
  adminAdminList,
  adminArticleTagList,
  adminArticleTypeList,
  adminUserList,
  adminCommentList,
  adminLinkList,
  adminSinglePageList,
  adminAdmin,
  adminArticleTag,
  adminArticleType,
  adminUser,
  adminComment,
  adminLink,
  adminSinglePage
});
