import moment from 'moment'

export const extractFileFormat = (fileName = "") => {
  const fileNameSplitted = fileName.split(".");
  return fileNameSplitted[fileNameSplitted.length - 1].toLowerCase();
};

export const splitUserName = (userName ="") => {
  const userNameSplitted = userName.split(' ');
  const takeFirstChar=userNameSplitted[0][0];
  const takeLastChar=userNameSplitted[1][0]
  const joinChar=takeFirstChar+takeLastChar;

  return joinChar.toUpperCase()

};

export const dateToMoment = (value,format = 'L LT') =>{
  return moment(value).format(format);
};