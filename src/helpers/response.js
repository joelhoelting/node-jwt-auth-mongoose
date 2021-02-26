export const generateResObj = (message, body = null, success = true) => {
  return {
    body,
    message: {
      content: message,
      type: success ? 'success' : 'error'
    }
  };
};
