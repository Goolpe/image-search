import { FETCH_PHOTOS, GET_ERRORS } from './types';

const API = 'https://api.flickr.com/services/rest/?api_key=658222f09cc099a37c0ef86fbd8c1ef7&format=json&nojsoncallback=1&method='

export const fetchPhotos = (dataPhoto) => dispatch => {
  fetch( API + dataPhoto.method + dataPhoto.nid)
      .then(response => response.json() )
      .then(data => {

          if(data.photos.total === "0"){
            dispatch({
                type: GET_ERRORS,
                error: 'Oops! There are no matches for "' + dataPhoto.nid +'"'
            });
          }
          else{
            data.photos.photo.map(item =>{
              return fetch(API + 'flickr.photos.getInfo&photo_id=' + item.id + '&secret=' + item.secret)
              .then(response=> response.json())
              .then(data => {
                 dispatch({
                  type: FETCH_PHOTOS,
                  payload: data
                })
              })
            }) 
           
        }
      })
      .catch(err => {
            alert('something broke');
        });

 }