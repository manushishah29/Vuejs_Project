import axios from 'axios'
import { service } from '@/views/pages/authentication/services/service'

export const login = requestData => axios({

  url: `${service.apiUrl}/auth/signIn`,

  method: 'post',

  data: requestData,

})
export const getAllUsers = (requestData, companyId) => axios({

  url: `${service.apiUrl}/company/users/${companyId}`,

  method: 'get',

  params: {
    companyId: requestData.companyId,
    pageNo: requestData.pageNo,
    sortAs: requestData.sortAs,
    sortBy: requestData.sortBy,
    pageSize: requestData.pageSize,
    searchValue: requestData.searchValue,

  },
  headers: {
    Authorization: localStorage.getItem('token'),
  },

})

export const getAllCompany = requestData => axios({

  url: `${service.apiUrl}/org/all`,
  method: 'get',
  params: {
    companyId: requestData.companyId,
    companyName: requestData.companyName,
  },

  headers: {
    Authorization: localStorage.getItem('token'),

  },

})
export const getAllDocument = requestData => axios({

  url: `${service.apiUrl}/doc-lib/getListing`,
  method: 'get',
  params: {
    id: requestData.id,
    pageNo: requestData.pageNo,
    sortAs: requestData.sortAs,
    sortBy: requestData.sortBy,
    pageSize: requestData.pageSize,
    searchValue: requestData.searchValue,
  },

  headers: {
    Authorization: localStorage.getItem('token'),

  },

})
export const getAllFolder = requestData => axios({

  url: `${service.apiUrl}/doc-lib/folders/all`,
  method: 'get',
  params: {
    // id: requestData.id,
    pageNo: requestData.pageNo,
    // sortAs: requestData.sortAs,
    // sortBy: requestData.sortBy,
    pageSize: requestData.pageSize,
    searchValue: requestData.searchValue,
  },

  headers: {
    Authorization: localStorage.getItem('token'),

  },

})


export const getFileById = requestData => axios({

  url: `${service.apiUrl}/doc-lib/getFile`,
  method: 'get',
  params: requestData,
  headers: {
    Authorization: localStorage.getItem('token'),
  },

})

export const updateFile = requestData => axios({

  url: `${service.apiUrl}/doc-lib/updateFile`,
  method: 'post',
  data: requestData,
  headers: {
    Authorization: localStorage.getItem('token'),
  },

})

export const deleteFile = requestData => axios({

  url: `${service.apiUrl}/doc-lib/deleteFile`,
  method: 'put',
  data: requestData,
  headers: {
    Authorization: localStorage.getItem('token'),
  },

})

export const insertFolder = requestData => axios({

  url: `${service.apiUrl}/doc-lib/insertFolder`,
  method: 'post',
  data:requestData,
  headers: {
    Authorization: localStorage.getItem('token'),
  },

})

export const insertFile = requestData => axios({

  url: `${service.apiUrl}/doc-lib/insertFile`,
  method: 'post',
  data:requestData,
  headers: {
    Authorization: localStorage.getItem('token'),
  },

})
export const getFolderById = requestData => axios({

  url: `${service.apiUrl}/doc-lib/getFolder`,
  method: 'get',
  params: requestData,
  headers: {
    Authorization: localStorage.getItem('token'),
  },

})
export const updateFolder = requestData => axios({

  url: `${service.apiUrl}/doc-lib/updateFolder`,
  method: 'post',
  data: requestData,
  headers: {
    Authorization: localStorage.getItem('token'),
  },

})
export const deleteFolder = requestData => axios({

  url: `${service.apiUrl}/doc-lib/deleteFolder`,
  method: 'put',
  data: requestData,
  headers: {
    Authorization: localStorage.getItem('token'),
  },

})
export const downloadFile = requestData => axios({

  url: `${service.apiUrl}/doc-lib/getFileUrl`,
  method: 'get',
  params: requestData,
  headers: {
    Authorization: localStorage.getItem('token'),
  },

})
export const getShareLink = requestData => axios({

  url: `${service.apiUrl}/doc-lib/getShareLink`,
  method: 'get',
  params: requestData,
  headers: {
    Authorization: localStorage.getItem('token'),
  },

})

export const oneTimeUrlShare = requestData => axios({

  url: `${service.apiUrl}/doc-lib/oneTimeUrlShare`,
  method: 'get',
  params: requestData,
  headers: {
    Authorization: localStorage.getItem('token'),
  },

})

export const readFileContent = (fileId) => axios({

  url: `${service.apiUrl}/doc-lib/readFileContent/${fileId}`,
  method: 'get',
  headers: {
    Authorization: localStorage.getItem('token'),
  },

})

export const sendMessage = requestData => axios({

  url: `${service.apiUrl}/message/send`,
  method: 'post',
  data:requestData,
  headers: {
    Authorization: localStorage.getItem('token'),
  },

})

export const fetchMessage = requestData => axios({

  url: `${service.apiUrl}/message/getAll`,
  method: 'get',
  params:{
    filterBy:requestData.filterBy,
    pageSize:requestData.pageSize,
    pageNo:requestData.pageNo,
  },
  headers: {
    Authorization: localStorage.getItem('token'),
  },

})

export const deleteMessage = (messageId ) => {
  return axios({
    url: `${service.apiUrl}/message/${messageId}`,
    method: 'delete',

    headers: {
      Authorization: localStorage.getItem('token'),
    },
  });
};

export const updateMessage = (reqData,messageId) => {
  return axios({
    url: `${service.apiUrl}/message/${messageId}`,
    method: 'put',
    data:reqData,
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  });
};

