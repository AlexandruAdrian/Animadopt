// Constants
import { GET_USER, GET_USER_SUCCESS, GET_USER_ERROR } from './constants';
import {
  GET_LOCATIONS,
  GET_LOCATIONS_SUCCESS,
  GET_LOCATIONS_ERROR,
} from './constants';

export function getUser() {
  return {
    type: GET_USER,
  };
}

export function getUserSuccess(user) {
  return {
    type: GET_USER_SUCCESS,
    user,
  };
}

export function getUserError() {
  return {
    type: GET_USER_ERROR,
  };
}

export function getLocations() {
  return {
    type: GET_LOCATIONS,
  };
}

export function getLocationsSuccess(locations) {
  return {
    type: GET_LOCATIONS_SUCCESS,
    locations,
  };
}

export function getLocationsError() {
  return {
    type: GET_LOCATIONS_ERROR,
  };
}
