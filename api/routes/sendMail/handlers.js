const CustomEmail = require('../../email/index');

const create = async (request, h) => {
  const {
    petName,
    postCreator,
    emailCreator,
    sender,
    subject,
    message,
  } = request.payload;
  try {
    await CustomEmail.customEmail(
      petName,
      postCreator,
      emailCreator,
      sender,
      subject,
      message,
    );
    return h.response({ email: 'Email has been sent' }).code(201);
  } catch (error) {
    return h.response({ err: 'Failed to send email' }).code(500);
  }
};

module.exports = {
  create,
};
