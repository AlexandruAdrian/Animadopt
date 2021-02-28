import {
  GET_POST,
  GET_POST_SUCCESS,
  GET_POST_ERROR,
  DELETE_POST,
  DELETE_POST_SUCCESS,
  DELETE_POST_ERROR,
  UPDATE_POST_STATUS,
  MARK_AS_ADOPTED,
  UPDATE_POST,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_ERROR,
} from './constants';
import { toast } from 'react-toastify';

export function getPost(postId) {
  return {
    type: GET_POST,
    postId,
  };
}

export function getPostSuccess(post) {
  return {
    type: GET_POST_SUCCESS,
    post,
  };
}

export function getPostError() {
  toast.error('Ooops! Am intampinat o eroare in preluarea anuntului');
  return {
    type: GET_POST_ERROR,
  };
}

export function deletePost(postId, history) {
  return {
    type: DELETE_POST,
    postId,
    history,
  };
}

export function deletePostSuccess({ message, postId }) {
  toast.success(message);
  return {
    type: DELETE_POST_SUCCESS,
    postId,
  };
}

export function deletePostError() {
  toast.error(
    'Ooops! Am intampinat o eroare in stergerea anuntului, va rugam sa incercati din nou mai tarziu'
  );
  return {
    type: DELETE_POST_ERROR,
  };
}

export function updatePostStatus(postId, status, history) {
  return {
    type: UPDATE_POST_STATUS,
    postId,
    status,
    history,
  };
}

export function markAsAdopted(postId, history) {
  return {
    type: MARK_AS_ADOPTED,
    postId,
    history,
  };
}

export function updatePost(postId, postData, history) {
  return {
    type: UPDATE_POST,
    postId,
    postData,
    history,
  };
}

export function updatePostSuccess(updatedPost, message) {
  toast.success(message);
  return {
    type: UPDATE_POST_SUCCESS,
    updatedPost,
  };
}

export function updatePostError() {
  toast.error(
    'Ooops! Am intampinat o eroare in actualizarea acestui anunt, va rugam sa incercati din nou mai tarziu'
  );
  return {
    type: UPDATE_POST_ERROR,
  };
}
