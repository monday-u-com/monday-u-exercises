export const getCurrentDate = () =>{
    const date = new Date();
    const dateText = `${date.getDate()} - ${
    date.getMonth() + 1
    } - ${date.getFullYear()}`;
    return dateText;
  }

