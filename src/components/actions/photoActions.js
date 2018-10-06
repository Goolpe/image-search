import { FETCH_PHOTOS } from './types';

export const fetchPhotos = (data) => dispatch => {
  fetch('https://api.flickr.com/services/rest/?api_key=658222f09cc099a37c0ef86fbd8c1ef7&format=json&nojsoncallback=1&method=' + data)
      .then(response => response.json() )
      .then(data => {
          if(data.photos.total === "0"){
            this.setState({
              error: 'Oops! There are no matches for "' + this.props.nid + '"',
              loading: false
            })
          }
          else{
            data.photos.photo.map(item =>{
              return fetch('https://api.flickr.com/services/rest/?api_key=658222f09cc099a37c0ef86fbd8c1ef7&format=json&nojsoncallback=1&method=flickr.photos.getInfo&photo_id=' + item.id + '&secret=' + item.secret)
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