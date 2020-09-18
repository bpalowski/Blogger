import axios from 'axios'
import qs from 'qs'

async function getComments(blogId, commentsArr) {
  return await axios.get('/blog/blogComments', {
    params: {
      id: blogId,
      comments: commentsArr
    }, paramsSerializer: (params) => {
      return qs.stringify(params, { indices: false })
    }
  }).then(res => {
    return res
  }).catch(err => {
    console.log(err)
  })
}


export default getComments
