import jwt from 'jsonwebtoken';
import { status as grpcStatus } from '@grpc/grpc-js';

const verifyToken = (token) => {
  return jwt.verify(token, process.env.ACCESS_SECRET_KEY);
};

const getIdFromMetadata = (call, callback, isStream = false) => {
  const access_token = call.metadata.get('access_token')[0] ?? '';

  /// Проверка на пустые поля
  if (!access_token) {
    if (isStream) {
      call.emit('error', {
        code: grpc.status.INVALID_ARGUMENT,
        details: 'Access token not found',
      });
    } else {
      const error = new Error('Access token not found');
      error.code = grpcStatus.INVALID_ARGUMENT;
      callback(error);
    }
    return null;
  }

  try {
    return verifyToken(access_token).user_id;
  } catch {
    if (isStream) {
      call.emit('error', {
        code: grpc.status.UNAUTHENTICATED,
        details: 'Unauthenticated',
      });
    } else {
      const error = new Error('Unauthenticated');
      error.code = grpcStatus.UNAUTHENTICATED;
      callback(error);
    }
    return null;
  }
};

export default {
  getIdFromMetadata,
};
