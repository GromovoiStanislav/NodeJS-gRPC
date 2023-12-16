// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var posts_service_pb = require('./posts_service_pb.js');

function serialize_Empty(arg) {
  if (!(arg instanceof posts_service_pb.Empty)) {
    throw new Error('Expected argument of type Empty');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Empty(buffer_arg) {
  return posts_service_pb.Empty.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_PostList(arg) {
  if (!(arg instanceof posts_service_pb.PostList)) {
    throw new Error('Expected argument of type PostList');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_PostList(buffer_arg) {
  return posts_service_pb.PostList.deserializeBinary(new Uint8Array(buffer_arg));
}


var PostServiceService = exports.PostServiceService = {
  getPosts: {
    path: '/PostService/GetPosts',
    requestStream: false,
    responseStream: false,
    requestType: posts_service_pb.Empty,
    responseType: posts_service_pb.PostList,
    requestSerialize: serialize_Empty,
    requestDeserialize: deserialize_Empty,
    responseSerialize: serialize_PostList,
    responseDeserialize: deserialize_PostList,
  },
};

exports.PostServiceClient = grpc.makeGenericClientConstructor(PostServiceService);
